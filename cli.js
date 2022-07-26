#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises'
import { program } from 'commander'
import { getPaths, getOutPath, getKeys } from './utlis.js'
import diff from './lib/diff.js'

program.version("1.0.0", '-v, --version', 'diffjs latest version of!');
program
  .option('-c, --compare', 'Compare two json data.')
  .description(`E.g: diffjs -c path ./data1.json ./data2.json
  diffjs -c path ./data1.json ./data2.json key value1 value2`)
  .action(async (_, { args }) => {
    const [path1, path2] = await getPaths(args)
    const outPath = getOutPath(args)

    const [key1, key2] = await getKeys(args)

    const data1 = await readFile(path1)
    const data2 = await readFile(path2)

    const result = diff(JSON.parse(data1.toString()), JSON.parse(data2.toString()), key1, key2)

    writeFile(outPath, JSON.stringify(result, null, 2) || "{}")
  })

// 处理命令行输入的参数
program.parse(process.argv);

