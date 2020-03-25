import React, { useState, useRef } from 'react'

import { GlobalStyle, TitleStyled } from '@/theme/globalStyle'
import { TreeList } from '@/components'

const baseTree = require('./data.json')

const App = () => {
  const [tree, setTree] = useState(baseTree)
  const dragItemNode = useRef()
  const dragItemName = useRef()
  const dragItemObject = useRef()

  const refs = {
    dragItemName,
    dragItemNode,
    dragItemObject,
  }

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <TitleStyled>Manipulations with a tree</TitleStyled>
        <TreeList tree={tree} setTree={setTree} refs={refs} />
      </div>
    </>
  )
}

export default App
