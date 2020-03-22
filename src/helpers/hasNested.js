export default (obj, property) => {
  const arr = [obj]
  let current
  let result = false

  while (arr.length > 0) {
    current = arr.shift()

    const [key] = Object.keys(current)

    if (current[key] && key === property) {
      result = true
      break
    }

    if (!Array.isArray(current.children)) {
      const [key] = Object.keys(current)

      current = current[key]
    }

    if (current && current.children.length > 0) {
      for (let i = 0; i < current.children.length; i++) {
        arr.push(current.children[i])
      }
    }
  }

  return result
}
