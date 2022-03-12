export const getElementsByClassName = (className, base = document.body) => {
  const searchNode = (node) => {
    const result = [];
    if (node.classList.contains(className)) {
      result.push(node);
    }

    for (const child of node.children) {
      result.push(...searchNode(child));
    }

    return result;
  };

  return searchNode(base);
};
const as = getElementsByClassName("map-cell");
console.log(as);

export const getElementByClassName = (className, base = document.body) => {
  let result;
  const searchNode = (node) => {
    if (node.classList.contains(className)) {
      return node;
    }

    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      const result = searchNode(childNode);

      if (result) return result;
    }
  };

  return searchNode(base);
};

const abc = getElementByClassName("map-cell");
console.log(abc);

export const getElementById = (idName, base = document.body) => {
  const searchNode = (node) => {
    if (node.id === idName) {
      return node;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        const result = searchNode(childNode);

        if (result) return result;
      }
    }
  };

  return searchNode(base);
};
