import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TreeItem, AddItem } from '@/components'

const TreeList = ({ tree, funcs, item }) => {
  const [dragging, setDragging] = useState(false)

  const newTree = Object.prototype.hasOwnProperty.call(tree, 'root')
    ? [tree]
    : tree

  return (
    <ul className="drag-n-drop">
      {newTree.map(child => {
        const [key] = Object.keys(child)

        return (
          <TreeItem
            key={key}
            item={child}
            funcs={funcs}
            dragging={dragging}
            setDragging={setDragging} />
        )
      })}
      {newTree[0]?.root?.label === 'Root' ? null : (
        <AddItem parent={item} funcs={funcs} />
      )}
    </ul>
  )
}

TreeList.defaultProps = {
  item: undefined,
}

TreeList.propTypes = {
  tree: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape({
      root: PropTypes.shape({
        label: PropTypes.string.isRequired,
        children: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  ]),
  funcs: PropTypes.object.isRequired,
  item: PropTypes.object,
}

export default TreeList
