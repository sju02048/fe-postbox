import {
  getElementByClassName,
  getElementsByClassName,
} from "../util/dom-lib.js";
import { delay, quickSort } from "../util/util.js";
import { renderMailboxInfo } from "../render.js";

export const mailboxEventHandler = () => {
  let towns = [];
  const $towns = getElementsByClassName("town");

  Array.prototype.quickSort = function () {
    return quickSort.call(undefined, this);
  };

  const sortedTowns = $towns
    .filter((town) =>
      [...town.children[0].children].some((child) =>
        child.classList.contains("mailbox")
      )
    )
    .map((town) => {
      delay(1000).then(() => {
        town.classList.add("has-mailbox");
      });
      towns.push(getElementByClassName("town-title", town).innerText);
      return {
        name: getElementByClassName("town-title", town).innerText,
        mailboxSize: Number(
          getElementByClassName("mailbox", town).dataset.size
        ),
      };
    })
    .quickSort()
    .map((town) => town.name);

  renderMailboxInfo(towns, sortedTowns);
};
