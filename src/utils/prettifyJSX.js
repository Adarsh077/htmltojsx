import prettier from "prettier/standalone";
import babelparser from "prettier/parser-babel";

const prettierOptions = {
  parser: "babel",
  plugins: [babelparser],
  tabWidth: 2,
};

const prettifyJSX = (jsx) => {
  try {
    const formattedJSX = prettier.format(jsx, prettierOptions);
    return formattedJSX;
  } catch (e) {
    return e.message;
  }
};

export { prettifyJSX };
