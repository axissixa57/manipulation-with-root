const replaceNested = (tree, searchProperty, replacementObj) => {
  const [firstKey] = Object.keys(tree)

  tree[firstKey].children.forEach(branch => {
    const [branchKey] = Object.keys(branch)

    branchKey === searchProperty
      ? (branch[branchKey] = replacementObj)
      : replaceNested(branch, searchProperty, replacementObj)
  })
}

export default replaceNested
