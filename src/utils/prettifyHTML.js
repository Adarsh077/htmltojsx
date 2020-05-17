import prettier from "prettier/standalone";
import htmlparser from "prettier/parser-html";

const options = {
  parser: "html",
  plugins: [htmlparser],
  tabWidth: 2,
};

const prettify = (html) => {
  try {
    const formattedHTML = prettier.format(html, options);
    return formattedHTML;
  } catch (e) {
    return { err: e.message };
  }
};

export { prettify };
