export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const convertStringToHTML = (string) => {
  const div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
};

export const quickSort = (list) => {
  if (list.length <= 1) return list;

  const pivot = list[Math.floor(list.length / 2)].mailboxSize;
  const left = [],
    equal = [],
    right = [];

  for (const town of list) {
    const size = town.mailboxSize;
    if (size < pivot) right.push(town);
    else if (size > pivot) left.push(town);
    else equal.push(town);
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
};
