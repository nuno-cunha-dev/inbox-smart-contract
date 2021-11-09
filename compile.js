import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import solc from 'solc'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inboxPath = resolve(__dirname, 'contracts', 'Inbox.sol')
const source = readFileSync(inboxPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

export default JSON.parse(solc.compile(JSON.stringify(input)))
  .contracts['Inbox.sol']
  .Inbox
