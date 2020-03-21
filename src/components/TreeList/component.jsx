import React, { useRef, useState } from 'react'

import { TreeItem, AddItem } from '@/components'

const TreeList = ({ tree, funcs, item }) => {
  const [dragging, setDragging] = useState(false)

  const newTree = tree.hasOwnProperty('root') ? [tree] : tree

  return (
    <ul className="drag-n-drop">
      {newTree.map(child => {
        const key = Object.keys(child)[0]

        return (
          <TreeItem
            key={key}
            item={child}
            funcs={funcs}
            dragging={dragging}
            setDragging={setDragging}
          />
        )
      })}
      {newTree[0] &&
      newTree[0].root &&
      newTree[0].root.label === 'Root' ? null : (
        <AddItem parent={item} funcs={funcs} />
      )}
    </ul>
  )
}

export default TreeList
