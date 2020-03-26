export default (obj, property) => {
  let result = false
  let current

  const doesParentHaveChild = (obj, property) => {
    current = obj

    const [key] = Object.keys(current)

    key === property && (result = true)

    if (!Array.isArray(current.children)) {
      const [key] = Object.keys(current)
      current = current[key]
    }

    current.children.forEach(branch => doesParentHaveChild(branch, property))

    return result
  }

  return doesParentHaveChild(obj, property)
}
