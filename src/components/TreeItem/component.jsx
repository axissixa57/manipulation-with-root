import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { CloseSquareOutlined } from '@ant-design/icons'

import { ButtonStyled } from '@/theme/globalStyle'
import { ButtonIconStyled, EditInputStyled } from './styles'
import { TreeList } from '@/components/'
import {
  findBrachOfTreeByKeyName,
  replaceBranchOfTree,
  doesParentHaveChild,
  addChildToEndOfParentArray,
  deleteChildOfTree,
} from '@/helpers'

const TreeItem = ({ item, refs, setTree, dragging, setDragging }) => {
  const { dragItem, dragItemNode, dragItemObject } = refs
  const [parentKey, isOpen] = Object.keys(item)

  const [pressed, setPressed] = useState(false)
  const [inputValue, setInputValue] = useState(item[parentKey].label)

  const handleDragStart = (e, item, obj) => {
    console.log('Starting to drag', item)

    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItem.current = item
    dragItemObject.current = obj

    setDragging(true)
  }

  const handleDragEnter = (e, targetItem) => {
    console.log('Entering a drag target', targetItem)

    if (
      dragItemNode.current !== e.target &&
      e.target.innerText !== 'Root' &&
      dragItemNode.current.innerText !== 'Root'
    ) {
      console.log('Target is NOT the same as dragged item')

      const [textElementWillBeReplaced] = e.target.innerText

      if (textElementWillBeReplaced === '+') {
        setTree(oldTree => {
          const { property } = findBrachOfTreeByKeyName(oldTree, parentKey)

          // if the parent element wants to replace the child element ("+")
          if (!doesParentHaveChild(dragItemObject.current, property)) {
            deleteChildOfTree(oldTree, dragItemObject.current)

            targetItem.children.push(dragItemObject.current)
          }

          return Object.assign({}, oldTree)
        })
      } else {
        setTree(oldTree => {
          const replaceableItem = findBrachOfTreeByKeyName(oldTree, targetItem)
          const currentItem = findBrachOfTreeByKeyName(
            oldTree,
            dragItem.current,
          )

          // if the child element wants to replace the parent element
          if (
            doesParentHaveChild(replaceableItem.object, currentItem.property)
          ) {
            const result = addChildToEndOfParentArray(
              replaceableItem,
              currentItem,
            )

            replaceBranchOfTree(oldTree, replaceableItem.property, result)

            return Object.assign({}, oldTree)
          }

          // if the parent element wants to replace the child element
          if (
            !doesParentHaveChild(currentItem.object, replaceableItem.property)
          ) {
            replaceBranchOfTree(
              oldTree,
              replaceableItem.property,
              currentItem.object,
            )

            replaceBranchOfTree(
              oldTree,
              currentItem.property,
              replaceableItem.object,
            )

            return Object.assign({}, oldTree)
          }

          return Object.assign({}, oldTree)
        })
      }
    }
  }

  const handleDragEnd = e => {
    setDragging(false)

    dragItem.current = null
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null
    dragItemObject.current = null
  }

  const getStyles = item => {
    if (dragItem.current === item && item !== 'root') {
      return 'current'
    }
    return 'dnd-item'
  }

  const onHandleDeleteClick = () => {
    setTree(oldTree => {
      deleteChildOfTree(oldTree, item)

      return Object.assign({}, oldTree)
    })
  }

  const onHandleKeyDownButton = e => {
    if (e.key === 'F2') {
      setPressed(true)
    }
  }

  const onHandleKeyDownInput = (e, item) => {
    if (e.key === 'Enter') {
      setTree(oldTree => {
        item[parentKey].label = inputValue
        return Object.assign({}, oldTree)
      })

      setPressed(false)
    }
  }

  const toggleOpen = (e, item) => {
    item.isOpen = !item.isOpen

    setTree(oldTree => Object.assign({}, oldTree))
  }

  const onHandleChange = e => {
    setInputValue(e.target.value)
  }

  const handleDragStartMemoized = useCallback(
    e => handleDragStart(e, parentKey, item),
    [item],
  )
  const handleDragEnterMemoized = useCallback(
    e => handleDragEnter(e, parentKey),
    [parentKey],
  )
  const toggleOpenMemoized = useCallback(e => toggleOpen(e, item), [item])

  return (
    <li style={{ position: 'relative' }}>
      {item[parentKey].label !== 'Root' && (
        <ButtonIconStyled
          type="link"
          shape="circle"
          icon={<CloseSquareOutlined />}
          onClick={onHandleDeleteClick}
        />
      )}
      <ButtonStyled
        type="primary"
        draggable
        onDragStart={handleDragStartMemoized}
        onDragEnter={handleDragEnterMemoized}
        onClick={toggleOpenMemoized}
        onKeyDown={e => onHandleKeyDownButton(e)}
        id={dragging ? getStyles(parentKey) : 'dnd-item'}
      >
        {pressed ? (
          <EditInputStyled
            size="small"
            value={inputValue}
            onChange={e => onHandleChange(e)}
            onKeyDown={e => onHandleKeyDownInput(e, item)}
          />
        ) : (
          item[parentKey].label
        )}
        {item[parentKey].children && (
          <span>{item[isOpen] ? '[-]' : '[+]'}</span>
        )}
      </ButtonStyled>
      {item[parentKey].children && item[isOpen] && (
        <TreeList
          className={dragging ? 'drag-n-drop current' : 'drag-n-drop'}
          item={item[parentKey]}
          tree={item[parentKey].children}
          setTree={setTree}
          refs={refs}
          handleDragEnter={handleDragEnter}
        />
      )}
    </li>
  )
}

TreeItem.propTypes = {
  refs: PropTypes.shape({
    dragItem: PropTypes.object.isRequired,
    dragItemNode: PropTypes.object.isRequired,
    dragItemObject: PropTypes.object.isRequired,
  }).isRequired,
  item: PropTypes.object,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
  setTree: PropTypes.func.isRequired,
}

export default TreeItem
