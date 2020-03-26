import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ButtonStyled } from '@/theme/globalStyle'

const AddItem = ({ parent, setTree, handleDragEnter }) => {
  const addChild = parent => {
    setTree(oldTree => {
      const newTree = Object.assign({}, oldTree)

      parent.children.push({
        [Date.now()]: {
          label: 'New Item',
          children: [],
        },
      })

      return newTree
    })
  }

  const handleOnClick = useCallback(() => addChild(parent), [parent])
  const handleOnDragEnter = useCallback(e => handleDragEnter(e, parent), [parent])

  return (
    <li>
      <ButtonStyled
        onClick={handleOnClick}
        onDragEnter={handleOnDragEnter}
      >
        +
      </ButtonStyled>
    </li>
  )
}

AddItem.propTypes = {
  parent: PropTypes.object,
  setTree: PropTypes.func.isRequired,
  handleDragEnter: PropTypes.func.isRequired,
}

export default AddItem
