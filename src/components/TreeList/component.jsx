import React, { useRef } from 'react'

import {TreeItem, AddItem} from '@/components'

const TreeList = ({ tree, funcs, item }) => {
  const dragItem = useRef()
  const dragItemNode = useRef()

  const newTree = tree.hasOwnProperty('root') ? [tree] : tree

  return (
    <ul className="drag-n-drop">
      {newTree.map(child => {
        const key = Object.keys(child)[0]

        return <TreeItem
          key={key} item={child} funcs={funcs} dragItem={dragItem}
          dragItemNode={dragItemNode} />
      })}
      <AddItem parent={item} funcs={funcs} />
    </ul>
  )
}

export default TreeList
