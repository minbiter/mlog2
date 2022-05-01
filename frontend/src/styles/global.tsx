import { Global, css } from "@emotion/react";

export const defaultStyle = css`
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  html {
    font-family: "Noto Sans KR", sans-serif;
    color: #454545;
    line-height: 1.2;
    word-wrap: break-word;
    letter-spacing: -0.3px;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  div,
  span,
  article,
  section,
  header,
  footer,
  aside,
  p,
  ul,
  li,
  fieldset,
  legend,
  label,
  a,
  nav,
  input,
  form {
    box-sizing: border-box;
    /* content-box */
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  img {
    max-width: 100%;
    height: auto;
    border: 0;
  }
  a {
    display: inline-block;
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  main {
    margin-top: 60px;
    // max-width: 1440px;
  }
`;

const GlobalStyle = () => {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
