/**
 * Turn `**words**` in a plain string into accent-colored spans.
 */
const ACCENT_MARK = /\*\*([^*]+)\*\*/g

export function accentText(text, spanClassName = 'text-accent') {
  if (text == null || typeof text !== 'string') return text

  const nodes = []
  let last = 0
  let match
  let key = 0
  ACCENT_MARK.lastIndex = 0

  while ((match = ACCENT_MARK.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    nodes.push(
      <span key={`accent-${key++}`} className={spanClassName}>
        {match[1]}
      </span>
    )
    last = match.index + match[0].length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes.length ? nodes : text
}
