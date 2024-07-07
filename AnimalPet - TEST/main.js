import {startRandomFoodConsumption, startRandomWaterConsumption} from './components/food&waterManager.js';
import { displayEmote } from './components/emotes.js';

let gameActive = true;


let loveBarProgress = 0; 
let loveBarLevel = 1;

const coinCounter = document.getElementById('coinCounter');
coinCounter.textContent = localStorage.getItem('coinsEarned') || '0';

const loveCountElement = document.getElementById('loveCountElement');
const loveBarImage = document.getElementById('loveBarImage');

const settings_btn = document.getElementById('settings-btn');

export function updateLoveBar(){
    // Update the love bar image based on the value of loveBarProgress
  if (loveBarProgress >= 5) {
    loveBarProgress = 0;
    loveBarLevel = loveBarLevel + 1;
  }
  else {
    loveBarProgress = loveBarProgress + 1;
  }

  loveCountElement.textContent = loveBarLevel;
  loveBarImage.src = `assets/images/loveBar/loveBar_${loveBarProgress}.png`;
}

startRandomFoodConsumption();
startRandomWaterConsumption();


