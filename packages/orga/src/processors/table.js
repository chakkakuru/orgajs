import Node from '../node'
import { parse as inlineParse } from '../inline'

function process(token, section) {

  var self = this

  const parseTable = () => {
    const table = new Node(`table`)
    while (self.hasNext()) {
      const token = self.peek()
      if ( !token.name.startsWith(`table.`) ) break
      self.consume()
      if (token.name === `table.separator`) {
        table.push(new Node(`tableSeparator`))
        continue
      }
      if ( token.name != `table.row` ) break
      const cells = token.data.cells.map(c => new Node(`tableCell`, inlineParse(c)))
      const row = new Node(`tableRow`, cells)
      table.push(row)
    }
    return table
  }

  const table = this.unagi(parseTable())
  section.push(table)

  return this.parseSection(section)
}

module.exports = process