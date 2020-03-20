import styled, { createGlobalStyle } from 'styled-components'
import { Button, Typography } from 'antd'
import antd from 'antd/dist/antd.css'

const { Title } = Typography

export const GlobalStyle = createGlobalStyle`
    ${antd}

    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }

    li {
      list-style-type: none;
    }

    #current {
      text-shadow: none;
      background-color: white;
      color: white;
      border: none;
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
  margin-bottom: 0.3rem;

  /* .ant-btn .current {
    background-color: red;
  } */
`

export const TitleStyled = styled(Title)`
  margin: 0 !important;
  padding: 1rem;
`
