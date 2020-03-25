import React from 'react'
import PropTypes from 'prop-types'
import { CloseSquareOutlined } from '@ant-design/icons'

import { ButtonStyled } from '@/theme/globalStyle'
import { ButtonIconStyled } from './styles'
import { TreeList } from '@/components/'
import {
  findNestedByLabelName,
  replaceNested,
  hasNested,
  hasAndReplaceNested,
  deleteNested,
} from '@/helpers'

const TreeItem = ({ item, refs, setTree, dragging, setDragging }) => {
  const {
    dragItemName,
    dragItemNode,
    dragItemObject,
  } = refs

  const [parent, isOpen] = Object.keys(item)

  const handletDragStart = (e, item, obj) => {
    console.log('Starting to drag', item)

    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItemName.current = item
    dragItemObject.current = obj

    setDragging(true)
  }

  const handleDragEnter = (e, targetItem, item) => {
    console.log('Entering a drag target', targetItem)

    if (
      dragItemNode.current !== e.target &&
      dragItemNode.current &&
      e.target.innerText !== 'Root' &&
      dragItemNode.current.innerText !== 'Root'
    ) {
      console.log('Target is NOT the same as dragged item')

      const [textElementWillBeReplaced] = e.target.innerText.match(/[^[]*/)

      const [textElementCurrent] = dragItemNode.current.innerText.match(/[^[]*/)

      if (textElementWillBeReplaced === '+') {
        setTree(oldTree => {
          const { property: keyTargetItem } = findNestedByLabelName(
            oldTree,
            targetItem.label,
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
          const replaced = findNestedByLabelName(
            oldTree,
            textElementWillBeReplaced,
          )
          const current = findNestedByLabelName(oldTree, textElementCurrent)

          console.log('replaced: ', replaced)
          console.log('current: ', current)

          if (hasNested(replaced.object, current.property)) {
            const result = hasAndReplaceNested(replaced, current)
            replaceNested(oldTree, replaced.property, result)
            return Object.assign({}, oldTree)
          } else {
            if (!hasNested(current.object, replaced.property)) {
              replaceNested(oldTree, replaced.property, current.object)

              replaceNested(oldTree, current.property, replaced.object)
            }

            return Object.assign({}, oldTree)
          }
        })
      }
    }
  }

  const handleDragEnd = e => {
    setDragging(false)

    dragItemName.current = null
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null
    dragItemObject.current = null
  }

  const getStyles = item => {
    if (dragItemName.current === item && item !== 'root') {
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
      {item[parent].label !== 'Root' && (
        <ButtonIconStyled
          type="link"
          shape="circle"
          icon={<CloseSquareOutlined />}
          onClick={onHandleDeleteClick} />
      )}
      <ButtonStyled
        type="primary"
        draggable
        onDragStart={e => handletDragStart(e, parent, item)}
        onDragEnter={e => handleDragEnter(e, parent)}
        onClick={() => toggleOpen(item)}
        id={dragging ? getStyles(parent) : 'dnd-item'}
      >
        {item[parent].label}
        {item[parent].children && <span>{item[isOpen] ? '[-]' : '[+]'}</span>}
      </ButtonStyled>
      {item[parent].children && item[isOpen] && (
        <TreeList
          className={dragging ? 'drag-n-drop current' : 'drag-n-drop'}
          item={item[parent]}
          tree={item[parent].children}
          setTree={setTree}
          refs={refs}
          handleDragEnter={handleDragEnter} />
      )}
    </li>
  )
}

TreeItem.propTypes = {
  refs: PropTypes.shape({
    dragItemName: PropTypes.object.isRequired,
    dragItemNode: PropTypes.object.isRequired,
    dragItemObject: PropTypes.object.isRequired,
  }).isRequired,
  item: PropTypes.object,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
  setTree: PropTypes.func.isRequired,
}

export default TreeItem
