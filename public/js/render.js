import { TownDataGenerator } from "./model/town-data-generator.js";
import {
  getElementByClassName,
  getElementsByClassName,
} from "./util/dom-lib.js";
import { getRandomNumber } from "./util/util.js";

const $info = getElementByClassName("info");

export const renderMapCell = () => {
  const generator = new TownDataGenerator();

  getElementsByClassName("map-cell").forEach((cell) => {
    cell.innerHTML = "";
    if (!getRandomNumber(0, 3)) return;
    const data = generator.createTownData();
    cell.append(TownDataGenerator.createTownNode(data));
  });

  $info.innerHTML = "";
};

export const renderMailboxInfo = (towns, sortedTowns) => {
  $info.innerHTML = `
  <p>${towns.join(", ")} 총 ${towns.length}개의 마을입니다.</p>
  <p>우체통의 크기는 ${sortedTowns.join(", ")} 순 입니다.</p>`;
};
