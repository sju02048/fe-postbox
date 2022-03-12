import { mailboxEventHandler } from "./event/mailboxEvent.js";
import { refreshEventHandler } from "./event/refreshEvent.js";
import { renderMapCell } from "./render.js";
import { getElementByClassName } from "./util/dom-lib.js";

const init = () => {
  renderMapCell();
  const $mailboxBtn = getElementByClassName("mailbox-btn");
  $mailboxBtn.addEventListener("click", mailboxEventHandler);

  const $refreshBtn = getElementByClassName("refresh-btn");
  $refreshBtn.addEventListener("click", refreshEventHandler);
};

init();
