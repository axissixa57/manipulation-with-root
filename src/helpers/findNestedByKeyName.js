export default (tree, keyName) => {
  const result = {}

  const findNested = (tree, keyName) => {
    const [key] = Object.keys(tree)

    if (key === keyName) {
      result.property = key
      result.object = tree[key]
    }

    tree[key].children.forEach(branch => findNested(branch, keyName))

    return result
  }

  return findNested(tree, keyName)
}
