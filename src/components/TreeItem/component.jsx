import React from 'react'

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
    dragItem,
    dragItemNode,
    currentObj,
  } = funcs

  const keys = Object.keys(item)
  const parent = keys[0]
  const isOpen = keys[1]

  const handletDragStart = (e, item, obj) => {
    console.log('Starting to drag', item)

    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItem.current = item
    currentObj.current = obj

    setDragging(true)
  }

  const handleDragEnter = (e, targetItem, item) => {
    console.log('Entering a drag target', targetItem)

    // console.log('e.target: ', e.target)
    // console.log('dragItemNode.current: ', dragItemNode.current)

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
        console.log('currentObj.current: ', currentObj.current)

        setTree(oldTree => {
          // const copy = Object.assign({}, currentObj.current)
          const newTree = findAndDeleteNested(oldTree, currentObj.current)

          console.log('newTree: ', JSON.stringify(newTree, null, 4))

          targetItem.children.push(currentObj.current)

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
            const a = replaceNested(
              oldTree,
              textElementWillBeReplaced,
              current.res,
              replaced.property,
            )
            const b = replaceNested(
              oldTree,
              textElementCurrent,
              replaced.res,
              current.property,
            )
            // console.log(JSON.stringify(b, null, 4))
            return Object.assign({}, b)
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
    currentObj.current = null
  }

  const getStyles = item => {
    // console.log('getStyles: ', item)
    // console.log('dragItem: ', dragItem)
    // if (dragItem.current === item) {
    //   return 'current'
    // }
    // return 'dnd-item'

    if (dragItem.current === item && item !== 'root') {
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
          funcs={funcs}
        />
      )}
    </li>
  )
}

export default TreeItem
