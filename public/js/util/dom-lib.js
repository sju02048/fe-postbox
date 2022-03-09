export const getElementsByClassName = (
  className,
  base = document.children[0]
) => {
  const recursive = (node) => {
    const result = [];

    if (node.classList.contains(className)) {
      result.push(node);
    }

    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      result.push(...recursive(childNode));
    }

    return result;
  };

  return recursive(base);
};

export const getElementByClassName = (
  className,
  base = document.children[0]
) => {
  const recursive = (node) => {
    if (node.classList.contains(className)) {
      return node;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        const result = recursive(childNode);

        if (result) return result;
      }
    }
  };

  return recursive(base);
};

export const getElementById = (idName, base = document.children[0]) => {
  const recursive = (node) => {
    if (node.id === idName) {
      return node;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        const result = recursive(childNode);

        if (result) return result;
      }
    }
  };

  return recursive(base);
};
