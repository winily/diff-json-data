const diff = (value1, value2, key1 = 'value1', key2 = 'value2', strict = false) => {
  if (!strict && value1 === "" || value1 === null) value1 = undefined
  if (!strict && value2 === "" || value2 === null) value2 = undefined

  if (value1 === value2) return null

  if (typeof value1 !== typeof value2)
    return { diff: `inconsistent data types! ${key1}[${typeof value1}], ${key2}[${typeof value2}]`, [key1]: value1, [key2]: value2 }

  if (!(value1 === null && value2 === null || value1 !== null && value2 !== null))
    return { diff: `inconsistent data types! ${key1}[${typeof value1}], ${key2}[${typeof value2}]`, [key1]: value1, [key2]: value2 }

  if (Boolean(Array.isArray(value1) ^ Array.isArray(value2)))
    return { diff: `inconsistent data types! ${key1}[${Array.isArray(value1) && "Array" || typeof value1}], ${key2}[${Array.isArray(value2) && "Array" || typeof value2}]`, [key1]: value1, [key2]: value2 }


  if (Boolean(Array.isArray(value1) & Array.isArray(value2))
    && value1.length !== value2.length)
    return { diff: `Array length is inconsistent! value1.length[${value1.length}], value2.length[${value2.length}]`, [key1]: value1, [key2]: value2 }

  if (Array.isArray(value1)) {
    value1 = value1.sort()
    value2 = value2.sort()
    const result = {}
    for (let index = 0; index < value1.length; index++) {
      const element1 = value1[index];
      const element2 = value2[index];
      const item = diff(element1, element2, key1, key2)
      if (item) result[index] = item
    }
    return Object.keys(result).length && result || null
  }

  if (typeof value1 === 'object') {
    const keys1 = value1 ? Object.keys(value1).sort() : []
    const keys2 = value2 ? Object.keys(value2).sort() : []
    const keysDiff1 = keys1.filter(key => !keys2.includes(key))
    const keysDiff2 = keys2.filter(key => !keys1.includes(key))

    const result = {}

    if (keysDiff1.length || keysDiff2.length) result.keysDiff = { [key1]: keysDiff1, [key2]: keysDiff2 }
    for (const key of keys1.concat(keysDiff2)) {

      // if (key.lastIndexOf("Time") != -1) return null

      const element1 = value1[key];
      const element2 = value2[key];
      const item = diff(element1, element2, key1, key2)
      if (item) result[key] = item
    }
    return Object.keys(result).length && result || null
  }

  if (value1 !== value2) return { diff: "inconsistent value!", [key1]: value1, [key2]: value2 }

  return null
}

export default diff