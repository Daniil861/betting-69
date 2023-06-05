
import { addMoney, getRandom, deleteMoney } from '../files/functions.js';
import { startData } from './startData.js';

export function initStartData() {

	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}
}

function writeScore() {
	if (document.querySelector('.score')) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

initStartData();


//========================================================================================================================================================
// game

const arrow = document.querySelector('.game__clock-box .clock__arrow');

export const configGame = {
	currentNum: 0,
	thresshold: 60,

	degrees: 0,
	step: 1.2,

	startCoord: -44,

	playerSelect: null, // more or less
}

export function startGame() {
	holdButtons();

	configGame.currentNum = getRandom(0, 220);

	rotateArrowToCurrentCoord();

	setTimeout(() => {
		checkWin();
	}, 1000);
	setTimeout(() => {
		resetData();
		removeHoldButtons();
		rotateArrowToStartCoord();
	}, 2000);
}

function holdButtons() {
	document.querySelectorAll('.game__button').forEach(button => button.classList.add('_hold'));
}

function removeHoldButtons() {
	document.querySelectorAll('.game__button').forEach(button => button.classList.remove('_hold'));
}

function rotateArrowToCurrentCoord() {

	translateToDegrees();
	setTimeout(() => {
		arrow.style.transform = `translate(-99%, -46%) rotate(${configGame.degrees}deg)`;
	}, 500);
}

function rotateArrowToStartCoord() {
	arrow.style.transform = `translate(-99%, -46%) rotate(${configGame.startCoord}deg)`;
}

function translateToDegrees() {
	configGame.degrees = configGame.startCoord + configGame.step * configGame.currentNum;
}

function checkWin() {
	if ((configGame.playerSelect === 'less' && configGame.currentNum < configGame.thresshold)) {
		addMoney(400, '.score', 500, 1500);
	} else if ((configGame.playerSelect === 'more' && configGame.currentNum > configGame.thresshold)) {
		addMoney(100, '.score', 500, 1500);
	} else {
		deleteMoney(100, '.score', 'money');
	}
}

function resetData() {
	configGame.currentNum = 0;
	configGame.degrees = 0;
	configGame.playerSelect = null;
}







