/**
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
