export default function findNested (obj, searchKey) {
    const arr = [obj]
    let res = null
    let current
    let property
  
    while (arr.length > 0) {
      current = arr.shift()
  
      const key = Object.keys(current)
  
      if (current[key] && current[key].label === searchKey) {
        res = current[key]
        property = key[0]
        break
      }
  
      if (!Array.isArray(current.children)) {
        const key = Object.keys(current)
  
        current = current[key]
      }
  
      if (current && current.children.length > 0) {
        for (let i = 0; i < current.children.length; i++) {
          arr.push(current.children[i])
        }
      }
    }
  
    return { res, property, obj }
  }