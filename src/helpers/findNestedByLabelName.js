export default (tree, labelText) => {
  const result = {}

  const findNested = (tree, labelText) => {
    const [key] = Object.keys(tree)

    if (tree[key].label === labelText) {
      result.property = key
      result.object = tree[key]
    }

    tree[key].children.forEach(branch => findNested(branch, labelText))

    return result
  }

  return findNested(tree, labelText)
}
