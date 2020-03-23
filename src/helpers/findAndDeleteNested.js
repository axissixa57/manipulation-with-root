export default (root, removable) => {
  const arr = [root]
  const [searchKey] = Object.keys(removable)
  let current

  while (arr.length > 0) {
    current = arr.shift()

    if (!Array.isArray(current.children)) {
      const [key] = Object.keys(current)

      current = current[key]
    }

    if (current.children && current.children.length > 0) {
      for (let i = 0; i < current.children.length; i++) {
        const element = current.children[i]
        const [key] = Object.keys(element)

        if (key === searchKey) {
          current.children.splice(i, 1)
          break
        }

        arr.push(current.children[i])
      }
    }
  }

  return root
}
