export default (replaced, current) => {
  for (let i = 0; i < replaced.children.length; i++) {
    const element = replaced.children[i]
    const [firstKey] = Object.keys(element)

    if (element[firstKey].label === current.label) {
      const removed = replaced.children.splice(i, i + 1)
      replaced.children.push(...removed)
      break
    }
  }

  return replaced
}
