import React from 'react'

import { ButtonStyled, TreeLine } from '@/theme/globalStyle'

const AddItem = ({ parent, funcs }) => {
  return (
    <li>
      {/* <TreeLine onClick={() => funcs.addChild(parent)}>+</TreeLine> */}
      <ButtonStyled onClick={() => funcs.addChild(parent)}>+</ButtonStyled>
    </li>
  )
}

export default AddItem
