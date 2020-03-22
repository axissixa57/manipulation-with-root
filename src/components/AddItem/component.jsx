import React from 'react'
import PropTypes from 'prop-types'

import { ButtonStyled } from '@/theme/globalStyle'

const AddItem = ({ parent, funcs }) => {
  return (
    <li>
      <ButtonStyled
        onClick={() => funcs.addChild(parent)}
        onDragEnter={e => funcs.handleDragEnter(e, parent)}
      >
        +
      </ButtonStyled>
    </li>
  )
}

AddItem.propTypes = {
  funcs: PropTypes.shape({
    addChild: PropTypes.func.isRequired,
    handleDragEnter: PropTypes.func.isRequired,
  }).isRequired,
  parent: PropTypes.object,
}

export default AddItem
