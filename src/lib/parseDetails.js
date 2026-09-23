// Splits the "Product details" text pasted in Sanity into a description and spec rows.
// "Label: value" (or "Label<TAB>value" copied from a table) lines become specs; other lines are the description.
// Headings like "Key Specifications." or "Features:" are dropped.
const HEADING = /^(key\s+)?(specifications?|specs|features|details)\b.{0,20}$/i
const SPEC = /^([^:\t]{1,40})[:\t]\s*(.+)$/

export function parseDetails(text = '') {
  const description = []
  const specs = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim().replace(/^[-•*]\s*/, '')
    if (!line || line.endsWith(':') || HEADING.test(line)) continue
    const spec = line.match(SPEC)
    if (spec) specs.push([spec[1].trim(), spec[2].trim().replace(/\.$/, '')])
    else description.push(line)
  }
  return { description: description.join(' '), specs }
}
