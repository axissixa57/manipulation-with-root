// export default (replaced, current) => {
//   for (let i = 0; i < replaced.children.length; i++) {
//     const element = replaced.children[i]
//     const [firstKey] = Object.keys(element)

//     if (element[firstKey].label === current.label) {
//       const removed = replaced.children.splice(i, i + 1)
//       replaced.children.push(...removed)
//       break
//     }
//   }

//   return replaced
// }

export default (parent, child) => {
  console.log(parent)
  parent.object.children.forEach((element, i) => {
    const [firstKey] = Object.keys(element)

    if (firstKey === child.property) {
      console.log('yes')
      const removed = parent.object.children.splice(i, i + 1)
      parent.object.children.push(...removed)
    }
  })

  return parent.object
}
