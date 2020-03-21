import React from 'react'
import PropTypes from 'prop-types'

import { ButtonStyled } from '@/theme/globalStyle'
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
    toggleOpen,
    makeParent,
    setTree,
    dragItemName,
    dragItemNode,
    dragItemObject,
  } = funcs

  const [parent] = Object.keys(item) // const [parent, isOpen]

  const handletDragStart = (e, item, obj) => {
    console.log('Starting to drag', item)

    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItemName.current = item
    dragItemObject.current = obj

    console.log('!dragItemNode.current: ', dragItemNode.current)
    console.log('!dragItemName.current: ', dragItemName.current)
    console.log('!dragItemObject.current: ', dragItemObject.current)

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

      // const textElementWillBeReplaced = e.target.innerText.match(/[^\[]*/)[0];
      // const textElementCurrent = dragItemNode.current.innerText.match(/[^\[]*/)[0];
      const textElementWillBeReplaced = e.target.innerText
      const textElementCurrent = dragItemNode.current.innerText

      console.log(textElementWillBeReplaced) // кот. надо заменить
      console.log(textElementCurrent) // кот. удерживается для перемещения

      if (textElementWillBeReplaced === '+') {
        console.log('dragItemObject.current: ', dragItemObject.current)

        setTree(oldTree => {
          // const copy = Object.assign({}, dragItemObject.current)
          findAndDeleteNested(oldTree, dragItemObject.current)

          targetItem.children.push(dragItemObject.current)

          return Object.assign({}, oldTree)
        })
      } else {
        setTree(oldTree => {
          const replaced = findNested(oldTree, textElementWillBeReplaced)
          const current = findNested(oldTree, textElementCurrent)
          console.log('replaced:', replaced.res, replaced.property)
          console.log('current:', current.res, current.property)
          // console.log('textElementWillBeReplaced:', textElementWillBeReplaced);
          // console.log('textElementCurrent:', textElementCurrent);
          if (hasNested(replaced.res, current.res)) {
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
            // console.log(JSON.stringify(b, null, 4))
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

  funcs = { ...funcs, handleDragEnter }

  return (
    <li>
      <ButtonStyled
        type="primary"
        draggable
        onDragStart={e => handletDragStart(e, parent, item)}
        onDragEnter={e => handleDragEnter(e, parent)}
        onClick={() => toggleOpen(item)}
        onDoubleClick={() => makeParent(item)}
        // className={dragging ? getStyles(parent) : 'dnd-item'}
        id={dragging ? getStyles(parent) : 'dnd-item'}
      >
        {item[parent].label}
        {/* {item[parent].children && <span>{item[isOpen] ? "[-]" : "[+]"}</span>} */}
      </ButtonStyled>
      {item[parent].children && ( // && item[isOpen]
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
    makeParent: PropTypes.func.isRequired,
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
