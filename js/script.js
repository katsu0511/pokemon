const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillStyle = 'Bisque';
ctx.fillRect(0, 0, 1000, 500);
ctx.beginPath();
ctx.fillStyle = 'DarkGreen';
ctx.fillRect(700, 0, 300, 500);
ctx.strokeStyle = 'black';
ctx.strokeRect(0, 0, 1000, 500);

let positionY = 0;
let positionX = 0;
let canMove = true;
let wildPokemonImg;
let myPokemonImg;
let nameOfWildPokemon;
let wildPokemonObj;
let myPokemonObj;
const player = document.getElementById('player');
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');
const aButton = document.getElementById('aButton');
const bButton = document.getElementById('bButton');
const battle = document.getElementById('battle');
const frame = document.getElementById('frame');
const scenario = document.getElementById('content');
const playerImg = document.getElementById('playerImg');
const myPokemonStatus = document.getElementById('my_pokemon_status');
const staminaBar = document.getElementById('stamina_bar');

up.addEventListener('click', () => {
  moveUp();
});

up.addEventListener('pointerdown', () => {
  const moving = setInterval(moveUp, 100);
  document.addEventListener('pointerup', () => {
    clearInterval(moving)
  }, { once: true })
});

function moveUp() {
  if (canMove) {
    const formerPositionY = positionY;
    if (positionY > 0) {
      positionY -= 20;
    }
    player.style.top = positionY + 'px';
    if (formerPositionY !== positionY) {
      playerMoving();
    }
  }
}

down.addEventListener('click', () => {
  moveDown();
});

down.addEventListener('pointerdown', () => {
  const moving = setInterval(moveDown, 100);
  document.addEventListener('pointerup', () => {
    clearInterval(moving)
  }, { once: true })
});

function moveDown() {
  if (canMove) {
    const formerPositionY = positionY;
    if (positionY < 480) {
      positionY += 20;
    }
    player.style.top = positionY + 'px';
    if (formerPositionY !== positionY) {
      playerMoving();
    }
  }
}

left.addEventListener('click', () => {
  moveLeft();
});

left.addEventListener('pointerdown', () => {
  const moving = setInterval(moveLeft, 100);
  document.addEventListener('pointerup', () => {
    clearInterval(moving)
  }, { once: true })
});

function moveLeft() {
  if (canMove) {
    const formerPositionX = positionX;
    if (positionX > 0) {
      positionX -= 20;
    }
    player.style.left = positionX + 'px';
    if (formerPositionX !== positionX) {
      playerMoving();
    }
  }
}

right.addEventListener('click', () => {
  moveRight();
});

right.addEventListener('pointerdown', () => {
  const moving = setInterval(moveRight, 100);
  document.addEventListener('pointerup', () => {
    clearInterval(moving)
  }, { once: true })
});

function moveRight() {
  if (canMove) {
    const formerPositionX = positionX;
    if (positionX < 980) {
      positionX += 20;
    }
    player.style.left = positionX + 'px';
    if (formerPositionX !== positionX) {
      playerMoving();
    }
  }
}

function playerMoving() {
  if (canMove && positionX >= 700) {
    const number = Math.random();
    if (number < 0.05) {
      canMove = false;
      battleStarts();
    }
  }
}

function battleStarts() {
  battle.classList.add('showBattle');
  scenario.innerHTML = '<p id="content">あっ！やせいの<span id="wild_pokemon_name"></span>がとびだしてきた！<span class="next"></span></p>';
  const number = Math.random();
  const nameDisplay = document.getElementById('name_display');
  const wildPokemonName = document.getElementById('wild_pokemon_name');
  const level = '5Lv.';
  wildPokemonImg = document.createElement('img');
  wildPokemonImg.classList.add('pokemon');
  wildPokemonImg.setAttribute('id', 'wild_pokemon');
  if (number < 0.34) {
    wildPokemonObj = new Poppo();
  } else if (number < 0.68) {
    wildPokemonObj = new Koratta();
  } else if (number < 0.78) {
    wildPokemonObj = new Fushigidane();
  } else if (number < 0.88) {
    wildPokemonObj = new Hitokage();
  } else if (number < 0.98) {
    wildPokemonObj = new Zenigame();
  } else {
    wildPokemonObj = new Myutu();
  }
  wildPokemonImg.src = wildPokemonObj.image;
  wildPokemonImg.alt = wildPokemonObj.alt;
  nameOfWildPokemon = wildPokemonObj.name;
  nameDisplay.textContent = `${nameOfWildPokemon} ${level}`;
  if (wildPokemonName !== null) {
    wildPokemonName.textContent = nameOfWildPokemon;
  }
  frame.appendChild(wildPokemonImg);
  myPokemonObj = new Kabigon();
  myPokemonImg = document.createElement('img');
  myPokemonImg.classList.add('myPokemon');
  myPokemonImg.setAttribute('id', 'myPokemon');
  myPokemonImg.src = myPokemonObj.image;
  myPokemonImg.alt = myPokemonObj.alt;
  battle.appendChild(myPokemonImg);
  setTimeout(setShowMyPokemon, 3000);
}

function setShowMyPokemon() {
  aButton.addEventListener('click', showMyPokemon);
  bButton.addEventListener('click', showMyPokemon);
}

function showMyPokemon() {
  const myPokemonLevel = '100Lv.';
  const myPokemonName = document.getElementById('my_pokemon_name');
  myPokemonName.textContent = `${myPokemonObj.name} ${myPokemonLevel}`;
  scenario.innerHTML = `<p id="content">ゆけっ！${myPokemonObj.name}！<span class="next"></span></p>`;
  playerImg.style.display = 'none';
  myPokemonStatus.style.display = 'block';
  myPokemonImg.classList.add('showMyPokemon');
  setTimeout(setStartBattle, 0);
}

function setStartBattle() {
  aButton.removeEventListener('click', showMyPokemon);
  aButton.addEventListener('click', startBattle);
  bButton.removeEventListener('click', showMyPokemon);
  bButton.addEventListener('click', startBattle);
}

function backToStartBattle() {
  aButton.removeEventListener('click', attack);
  aButton.addEventListener('click', startBattle);
  setTimeout(removeBackToStartBattle, 0);
}

function removeBackToStartBattle() {
  bButton.removeEventListener('click', backToStartBattle);
  bButton.addEventListener('click', startBattle);
  setTimeout(startBattle, 0);
}

function startBattle() {
  scenario.innerHTML = `<p id="content">${myPokemonObj.name}はどうする？<br>たたかう<span id="select" class="do_battle"></span>にげる</p>`;
  right.addEventListener('click', optionEscape);
  left.addEventListener('click', optionDoBattle);
  setTimeout(setAction, 0);
}

function optionEscape() {
  const select = document.getElementById('select');
  if (select !== null) {
    if (select.classList.contains('do_battle')) {
      select.classList.remove('do_battle');
      select.classList.add('escape');
      select.style.left = '80px';
    }
  }
}

function optionDoBattle() {
  const select = document.getElementById('select');
  if (select !== null) {
    if (select.classList.contains('escape')) {
      select.classList.remove('escape');
      select.classList.add('do_battle');
      select.style.left = '2px';
    }
  }
}

function setAction() {
  aButton.removeEventListener('click', startBattle);
  aButton.addEventListener('click', action);
  bButton.removeEventListener('click', startBattle);
}

function action() {
  const select = document.getElementById('select');
  if (select !== null) {
    if (select.classList.contains('do_battle')) {
      scenario.innerHTML = '<p id="content">ころす<span id="select" class="do_battle"></span></p>';
      setTimeout(setAttack, 0);
    } else if (select.classList.contains('escape')) {
      scenario.innerHTML = '<p id="content">うまくにげきれた！<span class="next"></span></p>';
      setTimeout(setEscapeBattle, 0);
    }
  }
}

function setAttack() {
  right.removeEventListener('click', optionEscape);
  left.removeEventListener('click', optionDoBattle);
  aButton.removeEventListener('click', action);
  aButton.addEventListener('click', attack);
  bButton.addEventListener('click', backToStartBattle);
}

function attack() {
  scenario.innerHTML = `<p id="content">${myPokemonObj.name}のころす！</p>`;
  staminaBar.classList.add('death');
  setTimeout(halfHp, 1500);
  setTimeout(dyingHp, 2500);
  setTimeout(kill, 4000);
}

function halfHp() {
  staminaBar.style.backgroundColor = 'yellow';
  staminaBar.style.transition = 'all 0s linear';
}

function dyingHp() {
  staminaBar.style.backgroundColor = 'red';
}

function kill() {
  const wildPokemon = document.getElementById('wild_pokemon');
  if (wildPokemon !== null) {
    wildPokemon.classList.add('killed');
  }
  scenario.innerHTML = `<p id="content">やせいの${nameOfWildPokemon}はしんだ！<span class="next"></span></p>`;
  setTimeout(setXp, 0);
}

function setXp() {
  aButton.removeEventListener('click', attack);
  bButton.removeEventListener('click', backToStartBattle);
  aButton.addEventListener('click', xp);
  bButton.addEventListener('click', xp);
}

function xp() {
  scenario.innerHTML = `<p id="content">${myPokemonObj.name}は${wildPokemonObj.xp}けいけんちもらった！<span class="next"></span></p>`;
  setTimeout(setAfterBattle, 0);
}

function setAfterBattle() {
  aButton.removeEventListener('click', xp);
  bButton.removeEventListener('click', xp);
  aButton.addEventListener('click', finishBattle);
  bButton.addEventListener('click', finishBattle);
}

function finishBattle() {
  battle.classList.remove('showBattle');
  canMove = true;
  setTimeout(afterBattle, 0);
}

function afterBattle() {
  aButton.removeEventListener('click', finishBattle);
  bButton.removeEventListener('click', finishBattle);
  setTimeout(reset, 300);
}

function setEscapeBattle() {
  right.removeEventListener('click', optionEscape);
  left.removeEventListener('click', optionDoBattle);
  aButton.removeEventListener('click', action);
  aButton.addEventListener('click', escapeBattle);
  bButton.addEventListener('click', escapeBattle);
}

function escapeBattle() {
  battle.classList.remove('showBattle');
  canMove = true;
  setTimeout(afterEscapeBattle, 0);
}

function afterEscapeBattle() {
  aButton.removeEventListener('click', escapeBattle);
  bButton.removeEventListener('click', escapeBattle);
  setTimeout(reset, 300);
}

function reset() {
  scenario.innerHTML = '<p id="content">あっ！やせいの<span id="wild_pokemon_name"></span>がとびだしてきた！<span class="next"></span></p>';
  const wildPokemon = document.getElementById('wild_pokemon');
  if (wildPokemon !== null) {
    wildPokemon.remove();
  }
  if (staminaBar.classList.contains('death')) {
    staminaBar.classList.remove('death');
  }
  playerImg.style.display = 'block';
  myPokemonStatus.style.display = 'none';
  staminaBar.style.backgroundColor = 'rgb(95, 255, 47)';
  myPokemonImg.classList.remove('showMyPokemon');
  myPokemonImg.remove();
  myPokemonImg = '';
  wildPokemonObj = '';
  myPokemonObj = '';
  wildPokemonImg = '';
  setTimeout(resetTransition, 100);
}

function resetTransition() {
  staminaBar.style.transition = 'all 3s linear';
}

class Pokemon {
  name;
  type;
  image;
  alt;
  xp;
}

class Poppo extends Pokemon {
  constructor() {
    super();
    this.name = 'ポッポ';
    this.type = 'ひこう';
    this.image = './img/poppo.png';
    this.alt = 'poppo';
    this.xp = 24;
  }
}

class Koratta extends Pokemon {
  constructor() {
    super();
    this.name = 'コラッタ';
    this.type = 'ノーマル';
    this.image = './img/koratta.png';
    this.alt = 'koratta';
    this.xp = 22;
  }
}

class Fushigidane extends Pokemon {
  constructor() {
    super();
    this.name = 'フシギダネ';
    this.type = 'くさ';
    this.image = './img/fushigidane.png';
    this.alt = 'fushigidane';
    this.xp = 36;
  }
}

class Hitokage extends Pokemon {
  constructor() {
    super();
    this.name = 'ヒトカゲ';
    this.type = 'ほのお';
    this.image = './img/hitokage.png';
    this.alt = 'hitokage';
    this.xp = 34;
  }
}

class Zenigame extends Pokemon {
  constructor() {
    super();
    this.name = 'ゼニガメ';
    this.type = 'みず';
    this.image = './img/zenigame.png';
    this.alt = 'zenigame';
    this.xp = 38;
  }
}

class Myutu extends Pokemon {
  constructor() {
    super();
    this.name = 'ミュウツー';
    this.type = 'エスパー';
    this.image = './img/myutu.png';
    this.alt = 'myutu';
    this.xp = 384;
  }
}

class Kabigon extends Pokemon {
  constructor() {
    super();
    this.name = 'カビゴン';
    this.type = 'ノーマル';
    this.image = './img/kabigon.png';
    this.alt = 'kabigon';
    this.xp = 1693;
  }
}
