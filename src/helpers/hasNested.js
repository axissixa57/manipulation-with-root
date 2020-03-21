export default (replaced, current) =>
  replaced.children.some(val => {
    const [firstKey] = Object.keys(val)

    return val[firstKey].label === current.label
  })
