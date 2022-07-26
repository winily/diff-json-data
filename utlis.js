import { equal, notEqual } from 'assert'
import { access } from 'fs/promises'
import { constants, existsSync } from 'fs'
import { join } from 'path'

import {
  PATH_KEY, OUT_KEY, KEYS_KEY,
  PATH_ERROR_MESSAGE,
  PATH_ROOT_PATTERN,
  JSON_PATTERN,
  FILE_FORMAT,
  DEFAULT_OUT, DEFAULT_KEYS
} from './config.js'


export const getKeys = (args = []) => {
  const pathIndex = args.findIndex(item => item == KEYS_KEY)
  if (pathIndex != -1) {
    const key1 = args[pathIndex + 1]
    const key2 = args[pathIndex + 2]
    notEqual(key1, undefined, "key must be followed by two string keys!")
    notEqual(key2, undefined, "key must be followed by two string keys!")
    return [key1, key2]
  }
  return DEFAULT_KEYS
}

export const getOutPath = (args = []) => {
  const pathIndex = args.findIndex(item => item == OUT_KEY)
  if (pathIndex != -1) {
    let outPath = args[pathIndex + 1]
    notEqual(outPath, undefined, "out must be followed by the correct file path!")
    equal(JSON_PATTERN.test(outPath), true, "The output file format must be json!")
    outPath = PATH_ROOT_PATTERN.test(outPath) ? outPath : join(process.cwd(), outPath)
    return outPath
  }
  return join(process.cwd(), DEFAULT_OUT)
}

export const getPaths = async (args = []) => {
  const pathIndex = args.findIndex(item => item == PATH_KEY)
  notEqual(pathIndex, -1, "json path must be passed in!")

  let path1 = args[pathIndex + 1]
  let path2 = args[pathIndex + 2]
  notEqual(path1, undefined, PATH_ERROR_MESSAGE)
  notEqual(path2, undefined, PATH_ERROR_MESSAGE)

  equal(path1.lastIndexOf(FILE_FORMAT), path1.length - FILE_FORMAT.length, PATH_ERROR_MESSAGE)
  equal(path2.lastIndexOf(FILE_FORMAT), path2.length - FILE_FORMAT.length, PATH_ERROR_MESSAGE)

  const basePath = process.cwd();

  path1 = PATH_ROOT_PATTERN.test(path1) ? path1 : join(basePath, path1)
  path2 = PATH_ROOT_PATTERN.test(path2) ? path2 : join(basePath, path2)

  await access(path1, constants.R_OK)
  await access(path2, constants.R_OK)
  return [path1, path2]
}