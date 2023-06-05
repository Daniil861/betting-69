
import { deleteMoney, noMoney, checkRemoveAddClass } from './functions.js';
import { startData } from './startData.js';
import { initStartData, configGame, startGame } from './script.js';
import { configSlot } from './slot.js';


// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {
	initStartData();

	const targetElement = e.target;

	const wrapper = document.querySelector('.wrapper');

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');

	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	if (targetElement.closest('[data-btn="privacy"]')) {
		location.href = 'index.html';
	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');

		if (configSlot.isAutMode) {
			clearInterval(configSlot.autospin);
			configSlot.isAutMode = false;

			document.querySelector('.controls-slot__button-box').classList.remove('_hold');
		}
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_slot');
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');
	}
	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_game');
	}

	//========================================================================================================================================================
	// game
	if (targetElement.closest('[data-game-btn]')) {
		configGame.playerSelect = targetElement.closest('[data-game-btn]').dataset.gameBtn;
		startGame();
	}

})


