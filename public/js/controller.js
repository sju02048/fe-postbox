import {
  getElementByClassName,
  getElementsByClassName,
} from "./util/dom-lib.js";
import { delay } from "./util/util.js";

// -[x] 타운 클래스를 가진 모든 노드 가져오기
// -[x] 배열에서 우체통을 가진 노드 찾기
// -[x] 우체통을 가진 노드에 스타일 입히기
// -[x] 우체통을 가진 마을의 이름 가져오기
// -[x] 우체통 크기 내림차순 정렬
// -[x] 우체통 정보 렌더링하기

const renderMailboxInfo = (towns, sortedTowns) => {
  const $info = getElementByClassName("info");
  $info.innerHTML = `
  <p>${towns.join(", ")} 총 ${towns.length}개의 마을입니다.</p>
  <p>우체통의 크기는 ${sortedTowns.join(", ")} 순 입니다.</p>`;
};

const mailboxEventHandler = () => {
  let towns = [],
    sortedTowns = [];
  const $towns = getElementsByClassName("town");

  $towns
    .filter((town) =>
      [...town.children].some((child) => child.classList.contains("mailbox"))
    )
    .map((town) => {
      delay(2000).then(() => town.classList.add("has-mailbox"));
      towns.push(getElementByClassName("town-title", town).innerText);
      return town;
    })
    .sort(
      (townA, townB) =>
        Number(getElementByClassName("mailbox", townB).dataset.size) -
        Number(getElementByClassName("mailbox", townA).dataset.size)
    )
    .forEach((town) =>
      sortedTowns.push(getElementByClassName("town-title", town).innerText)
    );

  renderMailboxInfo(towns, sortedTowns);
};

const $mailboxBtn = getElementByClassName("mailbox-btn");
$mailboxBtn.addEventListener("click", mailboxEventHandler);
