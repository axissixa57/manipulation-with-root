import React from 'react'
import PropTypes from 'prop-types'
import { CloseSquareOutlined } from '@ant-design/icons'

import { ButtonStyled } from '@/theme/globalStyle'
import { ButtonIconStyled } from './styles'
import { TreeList } from '@/components/'
import {
  findNested,
  replaceNested,
  hasNested,
  hasAndReplaceNested,
  findAndDeleteNested,
} from '@/helpers'

const TreeItem = ({ item, funcs, dragging, setDragging }) => {
  const {
    setTree,
    toggleOpen,
    dragItemName,
    dragItemNode,
    dragItemObject,
  } = funcs

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

      // кот. надо заменить
      const [textElementWillBeReplaced] = e.target.innerText.match(/[^[]*/)
      // кот. удерживается для перемещения
      const [textElementCurrent] = dragItemNode.current.innerText.match(/[^[]*/)

      if (textElementWillBeReplaced === '+') {
        setTree(oldTree => {
          findAndDeleteNested(oldTree, dragItemObject.current)

          targetItem.children.push(dragItemObject.current)

          return Object.assign({}, oldTree)
        })
      } else {
        setTree(oldTree => {
          const replaced = findNested(oldTree, textElementWillBeReplaced)
          const current = findNested(oldTree, textElementCurrent)

          if (hasNested(replaced.res, current.property)) {
            const result = hasAndReplaceNested(replaced.res, current.res)
            const newTree = replaceNested(
              oldTree,
              textElementWillBeReplaced,
              result,
              replaced.property,
            )
            return Object.assign({}, newTree)
          } else {
            replaceNested(
              oldTree,
              textElementWillBeReplaced,
              current.res,
              replaced.property,
            )

            const newTree = replaceNested(
              oldTree,
              textElementCurrent,
              replaced.res,
              current.property,
            )

            return Object.assign({}, newTree)
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
      findAndDeleteNested(oldTree, item)
      return Object.assign({}, oldTree)
    })
  }

  funcs = { ...funcs, handleDragEnter }

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
          funcs={funcs} />
      )}
    </li>
  )
}

TreeItem.propTypes = {
  funcs: PropTypes.shape({
    toggleOpen: PropTypes.func.isRequired,
    setTree: PropTypes.func.isRequired,
    dragItemName: PropTypes.object.isRequired,
    dragItemNode: PropTypes.object.isRequired,
    dragItemObject: PropTypes.object.isRequired,
  }).isRequired,
  item: PropTypes.object,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
}

export default TreeItem
