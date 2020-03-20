export default function replaceNested (obj, searchKey, replaceObj, property) {
    const arr = [obj]
    let current
  
    while (arr.length > 0) {
      current = arr.shift()
  
      const key = Object.keys(current)[0]
  
      if (current[key] && current[key].label === searchKey && key === property) {
        console.log(key)
        console.log(property)
        current[key] = replaceObj
  
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
  
    return obj
  }