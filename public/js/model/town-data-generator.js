import { convertStringToHTML, getRandomNumber } from "../util/util.js";
import { FLEX, MAX, MIN } from "../constants.js";
import { Town } from "./town.js";
import { getElementByClassName } from "../util/dom-lib.js";

export class TownDataGenerator {
  constructor() {
    this.ASCII = 65;
  }

  createTownData(depth = 1) {
    const townWidth = getRandomNumber(
      MIN.WIDTH + (depth >= 3 ? depth * 10 : 0),
      MAX.WIDTH
    );
    const townHeight = getRandomNumber(
      MIN.HEIGHT + (depth === 3 ? 30 : 0),
      MAX.HEIGHT - (depth === 3 ? 20 : 0)
    );
    const data = {
      name: String.fromCharCode(this.ASCII++),
      size: {
        width: `${townWidth}%`,
        height: `${townHeight}%`,
      },
      mailbox: {
        size: getRandomNumber(MIN.MAILBOX_SIZE, MAX.MAILBOX_SIZE),
        isExist: getRandomNumber(MIN.MAILBOX_EXIST, MAX.MAILBOX_EXIST),
      },
      style: {
        flexDirection:
          FLEX["FLEX-DIRECTION"][
            getRandomNumber(0, Object.keys(FLEX["FLEX-DIRECTION"]).length - 1)
          ],
        justifyContent:
          FLEX["JUSTIFY-CONTENT"][
            getRandomNumber(0, Object.keys(FLEX["JUSTIFY-CONTENT"]).length - 1)
          ],
        alignItems:
          FLEX["ALIGN-ITEMS"][
            getRandomNumber(0, Object.keys(FLEX["ALIGN-ITEMS"]).length - 1)
          ],
        placeSelf: `${
          FLEX["PLACE-SELF"][
            getRandomNumber(0, Object.keys(FLEX["PLACE-SELF"]).length - 1)
          ]
        } ${
          FLEX["PLACE-SELF"][
            getRandomNumber(0, Object.keys(FLEX["PLACE-SELF"]).length - 1)
          ]
        }`,
      },
      children: this.createChildren(depth),
    };

    if (depth === 1)
      Object.assign(data.style, {
        left: `${getRandomNumber(MIN.POSITION, MAX.WIDTH - townWidth)}%`,
        top: `${getRandomNumber(MIN.POSITION, MAX.HEIGHT - townHeight)}%`,
      });
    return data;
  }

  createChildren(depth) {
    if (++depth >= 4) return [];

    let childrenCount =
      depth === 3 ? 1 : getRandomNumber(MIN.CHILDREN, MAX.CHILDREN);

    let children = Array.from({ length: childrenCount }).map(() =>
      this.createTownData(depth)
    );

    return children;
  }

  static createTownNode(data) {
    const town = convertStringToHTML(new Town(data).template());
    const mailbox = getElementByClassName("mailbox", town);

    Town.setStyle(town, Object.assign(data.style, data.size));

    mailbox &&
      Town.setStyle(mailbox, {
        fontSize: `${data.mailbox.size * 5}px`,
      });

    for (let i = 0; i < data.children.length; i++) {
      const child = TownDataGenerator.createTownNode(data.children[i]);
      town.append(child);
    }

    return town;
  }
}
