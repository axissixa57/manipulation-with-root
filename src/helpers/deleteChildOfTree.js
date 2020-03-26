const deleteChildOfTree = (tree, removable) => {
  const [firstKey] = Object.keys(tree)
  const [removableKey] = Object.keys(removable)

  tree[firstKey].children.forEach((branch, i) => {
    const [branchKey] = Object.keys(branch)

    branchKey === removableKey
      ? tree[firstKey].children.splice(i, 1)
      : deleteChildOfTree(branch, removable)
  })
}

export default deleteChildOfTree
