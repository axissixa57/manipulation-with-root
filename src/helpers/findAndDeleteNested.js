export default (root, removable) => {
  console.log('root:', root)
  console.log('removable:', removable)
  const arr = [root]
  const [searchKey] = Object.keys(removable) // parent1.1
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

        // console.log('element:', element)
        // console.log('key:', key)
        // console.log('searchKey:', searchKey)

        if (key === searchKey) {
          console.log('found')
          console.log(current.children)
          const removed = current.children.splice(i, i + 1)
          break
        }

        arr.push(current.children[i])
      }
    }
  }

  return root
}
