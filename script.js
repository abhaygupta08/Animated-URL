const cdnLink = document.querySelector(".cdnLink");
cdnLink.onclick = () => {
    copyToClipboard(cdnLink.innerHTML);
    const cdnLinkText = cdnLink.innerHTML;
    cdnLink.innerHTML = "Copied !";
    cdnLink.disabled = true;
    setTimeout(() => {
        cdnLink.disabled = false;
        cdnLink.innerHTML = cdnLinkText
    }, 500);

};
const anchors = document.querySelectorAll("a");
anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        customNavigate(
            anchor.href.replace(window.location.origin, ""),
            anchor.target
        );
    });
});

// Initial data
const JS_CODE = (
    `/**
* Author: Abhay Gupta
* Source Code: https://github.com/abhaygupta08/Animated-URL
* 
* It navigates to the given href by deleting the current path and then appending the given href
* @param [href] - The URL to navigate to.
* @param [target=_self] - The target attribute specifies where to open the linked document.
* @returns undefined.
*/
function customNavigate(href = "", target = "_self") {
const TYPING_SPEED = 100;
if (target === "_blank") {
window.open(href, "_blank");
return;
}
// remove event start
console.log("Navigating back");
const curentLocation = window.location.href;
const pathToDelete = curentLocation.replace(window.location.origin, "");
let tempS = "";
for (let i = pathToDelete.length - 1; i >= 0; i--) {
tempS = pathToDelete.substring(0, i);
const newURL = tempS;
setTimeout(() => {
  history.replaceState(null, null, newURL);
  if (i === 0) {
    console.log("Navigated back");
  }
}, TYPING_SPEED * (pathToDelete.length - i));
}

// append
setTimeout(() => {
console.log("Navigating to " + href);
let s = "";
for (let i = 0; i < href.length; i++) {
  if (i == 0 && href[i] == "/") {
    if (href.length == 1) {
      window.location.href = href;
    }
    continue;
  }
  s += href[i];
  const newURL = s;
  setTimeout(() => {
    window.history.replaceState({}, null, "/" + newURL);
    if (i == href.length - 1) {
      // event ended
      console.log("Navigated to " + href);
      window.location.href = href;
    }
  }, TYPING_SPEED * i);
}
}, TYPING_SPEED * (pathToDelete.length + 1));
}
`);

// Elements
const editorCode = document.getElementById("editorCode");
const editorCopyButton = document.getElementById('editorCopyClipboard');


// Monaco loader
require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" }
});

window.MonacoEnvironment = {
    getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
    self.MonacoEnvironment = {
      baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor/min/'
    };
    importScripts('https://cdn.jsdelivr.net/npm/monaco-editor/min/vs/base/worker/workerMain.js');`)}`;
    }
};

// Monaco init
require(["vs/editor/editor.main"], function () {
    createEditor(editorCode);
});
function createEditor(editorContainer) {
    let editor = monaco.editor.create(editorContainer, {
        value: JS_CODE,
        language: "javascript",
        minimap: { enabled: true },
        automaticLayout: true,
        contextmenu: false,
        fontSize: 12,
        scrollbar: {
            useShadows: false,
            vertical: "visible",
            horizontal: "visible",
            horizontalScrollbarSize: 12,
            verticalScrollbarSize: 12
        }
    });




    editorCopyButton.onclick = () => {
        copyToClipboard(editor.getValue());
        const editorCopyButtonText = editorCopyButton.innerHTML;
        editorCopyButton.innerHTML = "Copied!";
        editorCopyButton.disabled = true;
        setTimeout(() => {
            editorCopyButton.disabled = false;
            editorCopyButton.innerHTML = editorCopyButtonText
        }, 500);
    }
}

function copyToClipboard(str) {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

