export default (parent, child) => {
  parent.object.children.forEach((element, i) => {
    const [firstKey] = Object.keys(element)

    if (firstKey === child.property) {
      const removed = parent.object.children.splice(i, i + 1)
      parent.object.children.push(...removed)
    }
  })

  return parent.object
}
