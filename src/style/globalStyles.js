import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  background: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
}

input,
textarea {
  -webkit-user-select: auto;
}

input,
textarea,
button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}

:focus{
  outline: solid 2px #0f59d9;
  border-radius: 1%;
}

`;

export default GlobalStyles;
