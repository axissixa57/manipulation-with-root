import styled, { createGlobalStyle } from 'styled-components'
import { Button, Typography } from 'antd'
import antd from 'antd/dist/antd.css'

const { Title } = Typography;

export const GlobalStyle = createGlobalStyle`
    ${antd}

    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }

    li {
      list-style-type: none;
    }
`

export const TreeLine = styled.button`
  font-family: Menlo, Consolas, monospace;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  outline: inherit;
`

export const ButtonStyled = styled(Button)`
  margin-bottom: .3rem;
`

export const TitleStyled = styled(Title)`
  margin: 0 !important;
  padding: 1rem;
`