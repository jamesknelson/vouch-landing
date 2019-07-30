import { createGlobalStyle } from 'styled-components/macro'
import { colors } from './theme'

export default createGlobalStyle`
  * {
    appearance: none;
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: auto;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  html {
    background-color: ${colors.structure.wash};

    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    
    font-size: 16px;
    height: 100%;
    line-height: 1.5rem;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, #root {
    height: 100%;
    min-height: 100%;
    padding-top: 1px;
  }
`
