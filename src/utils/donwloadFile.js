const donwloadFile = (text) => {
  localStorage.setItem("hideBadge", "true");
  const fileName = localStorage.getItem("componentName") || "htmltojsx.ml.jsx";
  var file = new Blob([text], { type: "text/javascript" });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, fileName);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

export { donwloadFile };
