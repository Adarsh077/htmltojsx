const copyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");

  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = 0;
  textArea.style.opacity = 0;
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const isSuccessful = document.execCommand("copy");
    return isSuccessful;
  } catch (err) {
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
};

export { copyTextToClipboard };
