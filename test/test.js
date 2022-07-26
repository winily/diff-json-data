import diff from '../lib/diff.js'
import { writeFileSync, readFileSync } from 'fs'

function main () {
  const dubbo = readFileSync('./data1.json')
  const http = readFileSync('./data2.json')
  writeFileSync('./result.json', JSON.stringify(diff(JSON.parse(dubbo), JSON.parse(http), 'dubbo', 'http'), null, 2) || "{}")
}

main()