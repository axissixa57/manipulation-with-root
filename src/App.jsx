import React, { useState, useRef } from 'react'

import { GlobalStyle, TitleStyled } from '@/theme/globalStyle'
import { TreeList } from '@/components'

const baseTree = require('./data.json')

const App = () => {
  const [tree, setTree] = useState(baseTree)
  const dragItemNode = useRef()
  const dragItemName = useRef()
  const dragItemObject = useRef()

  const toggleOpen = item => {
    item.isOpen = !item.isOpen

    const newTree = Object.assign({}, tree)

    setTree(newTree)
  }

  const addChild = parent => {
    const newTree = Object.assign({}, tree)

    parent.children.push({
      [Date.now()]: {
        label: `New Item${Date.now()}`,
        children: [],
      },
    })

    setTree(newTree)
  }

  const funcs = {
    toggleOpen,
    addChild,
    setTree,
    dragItemName,
    dragItemNode,
    dragItemObject,
  }

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <TitleStyled>Manipulations with a tree</TitleStyled>
        <TreeList tree={tree} funcs={funcs} />
      </div>
    </>
  )
}

export default App
