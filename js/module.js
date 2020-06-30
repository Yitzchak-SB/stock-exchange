export function createHtmlElement(
  element,
  className,
  id,
  innerText,
  innerHTML,
  type
) {
  const newElement = document.createElement(element);
  if (className != undefined) {
    newElement.className = className;
  }
  if (innerHTML != undefined) {
    newElement.innerHTML = innerHTML;
  }
  if (id != undefined) {
    newElement.id = id;
  }
  if (type != undefined) {
    newElement.type = type;
  }
  if (innerText != undefined) {
    newElement.innerText = innerText;
  }
  return newElement;
}

export function greenOrRed(element, value) {
  if (value > 0) {
    element.style.color = "green";
  } else {
    element.style.color = "red";
  }
}
