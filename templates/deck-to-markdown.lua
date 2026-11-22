-- Pandoc filter that turns a Marp deck into plain Markdown, with no HTML in
-- it, for students to download. build.sh runs it like this, with the deck's
-- front matter already cut off:
--
--   pandoc --from gfm-yaml_metadata_block --to gfm-raw_html \
--     --lua-filter templates/deck-to-markdown.lua \
--     --metadata page=https://.../cs230/lectures/08-lists.html
--
-- `page` is the deck's URL on the site. Markdown can show a slide's code but
-- not what its HTML draws, so the filter:
--   - keeps <img> tags (as Markdown images), captions ("Console", "Try it"),
--     and footnotes from the HTML on a slide
--   - swaps everything else the HTML draws (the live demos, the mini blog
--     pages, the numbered boxes) for one link per slide back to that slide
--   - drops <style> blocks, comments (Marp directives, prettier-ignore), and
--     the layout <div>s (.cols, .side-by-side), so columns read top to bottom
--   - drops Marp's size keywords (w:480) from image alt text
--   - points relative image and slide links at the live site, so a
--     downloaded copy still finds them
--   - writes slide breaks as `---`

local page, base

-- Elements whose text is kept. Every other text inside raw HTML is a
-- rendered example.
local keep_classes = { caption = true, footnote = true }

-- Tags that never get a closing tag.
local void = {
  area = true, base = true, br = true, col = true, embed = true, hr = true,
  img = true, input = true, link = true, meta = true, source = true, wbr = true,
}

-- Keywords Marp reads from image alt text: sizes like w:480, and bg for
-- background images.
local function marp_keyword(word)
  return word == 'bg' or word:match('^w:') or word:match('^h:')
    or word:match('^width:') or word:match('^height:')
end

-- Resolve "." and ".." in a URL's path: a/b/../c -> a/c.
local function normalize(url)
  local prefix, path = url:match('^(%a[%w+.-]*://[^/]*)(.*)$')
  if not prefix then
    return url
  end
  local suffix = path:match('[?#].*$') or ''
  path = path:sub(1, #path - #suffix)
  local parts = {}
  for part in path:gmatch('[^/]+') do
    if part == '..' then
      table.remove(parts)
    elseif part ~= '.' then
      table.insert(parts, part)
    end
  end
  local trailing = path:sub(-1) == '/' and '/' or ''
  return prefix .. '/' .. table.concat(parts, '/') .. trailing .. suffix
end

local function absolute(url)
  if url == '' or url:match('^%a[%w+.-]*:') or url:sub(1, 1) == '/' then
    return url
  end
  if url:sub(1, 1) == '#' then
    return page .. url
  end
  return normalize(base .. url)
end

local function fix_image(img)
  local words = {}
  for word in pandoc.utils.stringify(img.caption):gmatch('%S+') do
    if not marp_keyword(word) then
      table.insert(words, word)
    end
  end
  img.caption = { pandoc.Str(table.concat(words, ' ')) }
  img.src = absolute(img.src)
  img.attributes = {}
  return img
end

local function attr(tag, name)
  return tag:match(name .. '%s*=%s*"([^"]*)"') or tag:match(name .. "%s*=%s*'([^']*)'")
end

local function has_class(tag, set)
  for class in (attr(tag, 'class') or ''):gmatch('%S+') do
    if set[class] then
      return true
    end
  end
  return false
end

-- Inline HTML: <img> becomes an image, <br> a line break, and every other
-- tag goes. The text between tags stays, so <span class="demo blue">blue</span>
-- leaves "blue".
local function inline_html(raw)
  local tag = raw.text
  if tag:match('^<img[%s>/]') then
    local src = attr(tag, 'src')
    if src then
      return fix_image(pandoc.Image(attr(tag, 'alt') or '', src))
    end
  end
  if tag:match('^<br[%s>/]') then
    return pandoc.LineBreak()
  end
  return {}
end

-- Blocks parsed from the HTML a slide keeps, minus the wrappers Markdown has
-- no way to write.
local function from_html(text)
  if not text:match('%S') then
    return {}
  end
  return pandoc.read(text, 'html').blocks:walk({
    Div = function(div) return div.content end,
    Span = function(span) return span.content end,
    Figure = function(fig) return fig.content end,
    RawBlock = function() return {} end,
    RawInline = function() return {} end,
    Image = fix_image,
  })
end

function Pandoc(doc)
  page = doc.meta.page and pandoc.utils.stringify(doc.meta.page) or ''
  base = page:gsub('[^/]*$', '')

  local out = pandoc.Blocks({})
  local slide = 1
  local linked = 0 -- last slide that got a link to its live version

  -- An element with class "demo" can hold Markdown between blank lines,
  -- which Pandoc reads as blocks of their own, so skipping one spans blocks.
  local demo_tag, demo_depth = nil, 0

  local function link_slide()
    if linked ~= slide then
      linked = slide
      out:insert(pandoc.Para({
        pandoc.Link('See the live demo on slide ' .. slide, page .. '#' .. slide),
      }))
    end
  end

  -- Walk the tags in one raw HTML block. Keep images, captions, and
  -- footnotes; note whether anything else would have drawn text.
  local function raw_html(text)
    if text:match('^%s*<!%-%-') or text:match('^%s*<style') then
      return
    end
    local kept, drew = {}, false
    local keep_tag, keep_depth = nil, 0
    local pos = 1

    local function between(stop)
      local chunk = text:sub(pos, stop)
      if demo_depth > 0 then
        return
      end
      if keep_depth > 0 then
        table.insert(kept, chunk)
      elseif chunk:match('%S') then
        drew = true
      end
    end

    while true do
      local s, e, close, name, rest = text:find('<(/?)(%a[%w-]*)([^>]*)>', pos)
      if not s then
        between(#text)
        break
      end
      between(s - 1)
      local tag = text:sub(s, e)
      local opens = close == '' and not void[name:lower()] and not rest:match('/%s*$')
      name = name:lower()
      pos = e + 1

      if demo_depth > 0 then
        if name == demo_tag then
          demo_depth = demo_depth + (opens and 1 or (close == '/' and -1 or 0))
        end
      elseif keep_depth > 0 then
        table.insert(kept, tag)
        if name == keep_tag then
          keep_depth = keep_depth + (opens and 1 or (close == '/' and -1 or 0))
        end
      elseif close == '' and has_class(tag, { demo = true }) then
        drew = true
        if opens then
          demo_tag, demo_depth = name, 1
        end
      elseif opens and has_class(tag, keep_classes) then
        table.insert(kept, tag)
        keep_tag, keep_depth = name, 1
      elseif name == 'img' then
        table.insert(kept, tag)
      end
    end

    out:extend(from_html(table.concat(kept)))
    if drew then
      link_slide()
    end
  end

  for _, block in ipairs(doc.blocks) do
    if block.t == 'HorizontalRule' then
      slide = slide + 1
      demo_depth = 0
      out:insert(pandoc.RawBlock('markdown', '---'))
    elseif block.t == 'RawBlock' then
      if block.format == 'html' then
        raw_html(block.text)
      end
    elseif demo_depth == 0 then
      out:insert(block)
    end
  end

  doc.blocks = out:walk({
    RawInline = function(raw)
      if raw.format == 'html' then
        return inline_html(raw)
      end
    end,
    Image = fix_image,
    Link = function(link)
      -- GFM reads the URL in [https://...](https://...) as a link of its
      -- own, which would come out as [<https://...>](https://...).
      link.content = link.content:walk({
        Link = function(inner) return inner.content end,
      })
      link.target = absolute(link.target)
      return link
    end,
  })
  return doc
end
