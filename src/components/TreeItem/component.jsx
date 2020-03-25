import React from 'react'
import PropTypes from 'prop-types'
import { CloseSquareOutlined } from '@ant-design/icons'

import { ButtonStyled } from '@/theme/globalStyle'
import { ButtonIconStyled } from './styles'
import { TreeList } from '@/components/'
import {
  findNestedByKeyName,
  replaceNested,
  hasNested,
  hasAndReplaceNested,
  deleteNested,
} from '@/helpers'

const TreeItem = ({ item, refs, setTree, dragging, setDragging }) => {
  const {
    dragItem,
    dragItemNode,
    dragItemObject,
  } = refs

  const [parentKey, isOpen] = Object.keys(item)

  const handletDragStart = (e, item, obj) => {
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
          const { property: keyTargetItem } = findNestedByKeyName(
            oldTree,
            parentKey,
          )

          if (hasNested(dragItemObject.current, keyTargetItem)) {
            return Object.assign({}, oldTree)
          } else {
            deleteNested(oldTree, dragItemObject.current)
            targetItem.children.push(dragItemObject.current)

            return Object.assign({}, oldTree)
          }
        })
      } else {
        setTree(oldTree => {
          console.log('targetItem: ', targetItem) // replaceable 
          console.log('dragItem.current: ', dragItem.current) // current

          const replaceableItem = findNestedByKeyName(
            oldTree,
            targetItem,
          )

          const currentItem = findNestedByKeyName(oldTree, dragItem.current)

          console.log('replaceableItem: ', replaceableItem)
          console.log('currentItem: ', currentItem)

          if (hasNested(replaceableItem.object, currentItem.property)) {
            const result = hasAndReplaceNested(replaceableItem, currentItem)
            replaceNested(oldTree, replaceableItem.property, result)
            return Object.assign({}, oldTree)
          } else {
            if (!hasNested(currentItem.object, replaceableItem.property)) {
              replaceNested(oldTree, replaceableItem.property, currentItem.object)
              replaceNested(oldTree, currentItem.property, replaceableItem.object)
            }

            return Object.assign({}, oldTree)
          }
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
      deleteNested(oldTree, item)
      return Object.assign({}, oldTree)
    })
  }

  const toggleOpen = item => {
    item.isOpen = !item.isOpen
    setTree(oldTree => Object.assign({}, oldTree))
  }

  return (
    <li style={{ position: 'relative' }}>
      {item[parentKey].label !== 'Root' && (
        <ButtonIconStyled
          type="link"
          shape="circle"
          icon={<CloseSquareOutlined />}
          onClick={onHandleDeleteClick} />
      )}
      <ButtonStyled
        type="primary"
        draggable
        onDragStart={e => handletDragStart(e, parentKey, item)}
        onDragEnter={e => handleDragEnter(e, parentKey)}
        onClick={() => toggleOpen(item)}
        id={dragging ? getStyles(parentKey) : 'dnd-item'}
      >
        {item[parentKey].label}
        {item[parentKey].children && <span>{item[isOpen] ? '[-]' : '[+]'}</span>}
      </ButtonStyled>
      {item[parentKey].children && item[isOpen] && (
        <TreeList
          className={dragging ? 'drag-n-drop current' : 'drag-n-drop'}
          item={item[parentKey]}
          tree={item[parentKey].children}
          setTree={setTree}
          refs={refs}
          handleDragEnter={handleDragEnter} />
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
