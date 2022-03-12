## 📮 빨간 우체통 마을 찾기

### 🏞️ [제주] 🏝`Jamie`, 🏖`Jwu`

<br/>

### 미션 1

- [x] 화면이 열리면, 기획서와 같은 모습의 마을들이 화면에 자동으로 만들어진다.

- [x] 마을의 위치, 크기, 갯수 등이 랜덤하게 생성된다. 자유배치가 너무 난해하다면, 위치에 제약조건을 두는 방식등도 괜찮다.

- [x] 우체통 갯수와 크기도 랜덤하게 생성된다.

<br/>

### 미션 2

- [x] 버튼을 선택하면 빨간 우체통을 가진 마을을 찾는 작업을 시작한다.

- [x] 빨간색 우체통이 있는 모든 마을을 조사해서 화면에 표시해야 한다.

- [x] 빨간색 우체통을 가진 마을정보를 텍스트로 표현해야 한다

- [x] 우체통은 각각 크기가 다르다, 크기 순으로 정렬해서 정보를 표시한다.

- [x] 빨간색 우체통을 가진 마을은 2초 뒤에 '빨간색 테두리'로 표시된다.

<br/>

### 미션3

- [ ] Express 를 설치하고 서버를 띄워서 현재 프로그램이 동작하도록 해보자.

- [ ] 초기결과를 렌더링 하기 위한 일부 정보를 서버로부터 JSON형태로 받아서 사용한다.

<br/>

### 구현 시 주의사항

- [x] 마을안에 마을은 무한대로 존재할 수 있다. 이를 해결할 수 있는 해법을 사용한다.

- [x] Node를 탐색하기 위한 API를 개발한다.

- [x] array의 sort메서드를 사용하지 않고 정렬 알고리즘을 직접 구현한 후에 그것을 활용해서 정렬한다.

- [x] setTimeout 를 활용해서 지연처리하는데, Promise 패턴을 적용해서 사용한다.

- [x] ES Classes 를 사용해서 개발한다.

<br/>

### PR

- [ ] recursive 함수에 공통적인 부분이 많은 것 같은데, 하나로 만들 수 있을까요?! 🤭🤭  
      => 아직 못했습니다..😎

## 구현 과정

### 마을 랜덤 생성

- 데이터 생성
  - 랜덤값을 생성하는 `getRandomNumber` 함수를 사용해 width, height 등 데이터 값을 랜덤으로 넣어준다.
  - 각 마을 데이터는 `createChildren` 메소드를 호출하며 children을 생성하고, 일정 깊이가 되면 더 이상 children 데이터를 생성하지 않는다.

```javascript
// 데이터 구조

const town = {
  name: "A",
  size: {
    width: 50,
    height: 30,
  },
  mailbox: {
    size: 3,
    isExist: 1,
  },
  style: {...},
  children: [ ... ],
};
```

- 생성한 데이터를 바탕으로 DOM 템플릿을 만들어서 스타일을 넣어준 후 `innerHTML`을 사용해 넣어준다.

- 가장 큰 마을은 grid 안에서 `position: absolute`를 사용해 배치하고, 중첩되는 마을들은 `flex` 속성을 사용하고 `flex` 관련 속성들의 값을 랜덤으로 넣어서 배치했다.

#### flex

- top (가장 큰 마을에만 적용)
- left (가장 큰 마을에만 적용)
- flex-direction (column, row)
- justify-content flex-start flex-end space-around space-between center
- align-items flex-start flex-end center
- place-self : start, end, center

### DOM API 구현

- `getElemetById`, `getElementByClassName`, `getElementsByClassName` 구현
- `recursive` 재귀함수 이용, 자식들의 클래스나 id 값을 비교해나가며 계속 찾아갔다.

### 정렬 구현

- [정렬 알고리즘 속도 비교](https://im-developer.tistory.com/134)
- 위의 사이트에서 정렬 알고리즘을 비교했을 때 제일 빨랐던 정렬이기도 하고 자바스크립트 내장 sort 함수에도 사용중인 `퀵 정렬`을 이용했다.

<br/>

## 궁금한 것

- event/mailboxEventHandler.js 에서 정렬된 데이터를 받기 위해 그 과정을 메서드 체이닝으로 구현했는데,  
  중간에 `퀵 정렬 함수`를 넣기 위해 해당 함수를 리턴하는 것을 `Array.prototype.quicksort` 라는 이름으로 만들었습니다. Array의 프로토타입을 건드리는거라 이런식으로 이어나가는 방법이 맞는지? 메서드 체이닝을 위한 다른 방법이 있는지 궁금합니다.

```js
  Array.prototype.quickSort = function () {
    return quickSort.call(undefined, this);
  };
  // 체이닝
  const sortedTowns = $towns
    .filter((town) =>
      [...town.children[0].children].some((child) =>
        child.classList.contains("mailbox")
    ))
    .map((town) => {
      ...
    })
    .quickSort()
    .map((town) => town.name);
```
