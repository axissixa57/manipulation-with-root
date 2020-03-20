import React from 'react'

import { ButtonStyled } from '@/theme/globalStyle'
import { TreeList } from '@/components/'
import { findNested, replaceNested } from '@/helpers'

const TreeItem = ({
  item,
  funcs,
  dragItem,
  dragItemNode,
  dragging,
  setDragging,
}) => {
  const { toggleOpen, makeParent, setTree } = funcs

  const keys = Object.keys(item)
  const parent = keys[0]
  const isOpen = keys[1]

  const handletDragStart = (e, item) => {
    console.log('Starting to drag', item)

    dragItemNode.current = e.target
    dragItemNode.current.addEventListener('dragend', handleDragEnd)
    dragItem.current = item

    setDragging(true)
  }

  const handleDragEnter = (e, targetItem) => {
    console.log('Entering a drag target', targetItem)

    if (dragItemNode.current !== e.target && dragItemNode.current) {
      console.log('Target is NOT the same as dragged item')

      // const textElementWillBeReplaced = e.target.innerText.match(/[^\[]*/)[0];
      // const textElementCurrent = dragItemNode.current.innerText.match(/[^\[]*/)[0];
      const textElementWillBeReplaced = e.target.innerText
      const textElementCurrent = dragItemNode.current.innerText

      console.log(textElementWillBeReplaced) // кот. надо заменить
      console.log(textElementCurrent) // кот. удерживается для перемещения

      setTree(oldTree => {
        const replaced = findNested(oldTree, textElementWillBeReplaced)
        const current = findNested(oldTree, textElementCurrent)
        // const deleted = omitDeep(oldTree, property);

        console.log('replaced:', replaced.res, replaced.property)
        console.log('current:', current.res, current.property)
        // console.log('textElementWillBeReplaced:', textElementWillBeReplaced);
        // console.log('textElementCurrent:', textElementCurrent);

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
      })
    }
  }

  const handleDragEnd = e => {
    setDragging(false)

    dragItem.current = null
    dragItemNode.current.removeEventListener('dragend', handleDragEnd)
    dragItemNode.current = null
  }

  const getStyles = item => {
    console.log('getStyles: ', item)
    console.log('dragItem: ', dragItem)
    // if (dragItem.current === item) {
    //   return 'current'
    // }
    // return 'dnd-item'

    if (dragItem.current === item && item !== "root") {
      return 'current'
    }
    return 'dnd-item'
  }

  return (
    <li>
      {/* <TreeLine
        draggable
        onDragStart={e => handletDragStart(e, parent)}
        onDragEnter={e => handleDragEnter(e, parent)}
        onClick={() => toggleOpen(item)}
        onDoubleClick={() => makeParent(item)}
      >
        {item[parent].label}
      </TreeLine> */}
      <ButtonStyled
        type="primary"
        draggable
        onDragStart={e => handletDragStart(e, parent)}
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
          item={item[parent]}
          tree={item[parent].children}
          funcs={funcs}
        />
      )}
    </li>
  )
}

export default TreeItem
