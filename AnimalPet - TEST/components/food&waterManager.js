import { displayEmote } from './emotes.js';
import { updateLoveBar } from '../main.js';

let food = parseInt(localStorage.getItem('food')) || 0;
let hungry = parseInt(localStorage.getItem('hungry')) || 0;

let water = parseInt(localStorage.getItem('water')) || 0;
let thirsty = parseInt(localStorage.getItem('thirsty')) || 0;

const foodImage = document.getElementById('foodImage');
const waterImage = document.getElementById('waterImage');

foodImage.src = `assets/images/food/food_${food}.png`;
waterImage.src = `assets/images/water/water_${water}.png`;

consumeFood();

export function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addFood() {
    let coins_earned = parseInt(localStorage.getItem('coinsEarned')) || 0;

    if (food < 2 && coins_earned >= 10) {
        coins_earned -= 10;
        food += 1;
        localStorage.setItem('food', food);
        foodImage.src = `assets/images/food/food_${food}.png`;

        localStorage.setItem('coinsEarned', coins_earned);
        coinCounter.textContent = coins_earned; 
        if (hungry === 1) {
            setTimeout(() => {
                consumeFood();
            }, 1000);
        }
    }
}

export function consumeFood() {
    if (food >= 1) {
        food -= 1;
        hungry = 0;
        displayEmote('eating');

        localStorage.setItem('food', food);
        localStorage.setItem('hungry', hungry);

        foodImage.src = `assets/images/food/food_${food}.png`;
        
        updateLoveBar();

        setTimeout(() => {
            startRandomFoodConsumption();
        }, getRandomInterval(5000, 10000));
    } else {
        localStorage.setItem('hungry', hungry);
        displayEmote('hungry');
        hungry = 1;

        setTimeout(() => {
            startRandomFoodConsumption();
        }, getRandomInterval(5000, 10000));
    }
}

export function startRandomFoodConsumption() {
    consumeFood();
}

export function addWater() {
    if (water < 2) {
        water += 1;

        localStorage.setItem('water', water);
        localStorage.setItem('thirsty', thirsty);
        waterImage.src = `assets/images/water/water_${water}.png`;
    }
}

export function consumeWater() {
    if (water >= 1) {
        water -= 1;
        thirsty = 0;
        localStorage.setItem('water', water);
        localStorage.setItem('thirsty', thirsty);
        waterImage.src = `assets/images/water/water_${water}.png`;
    } else {
        displayEmote('thirsty');
        thirsty = 1;
    }
}

export function startRandomWaterConsumption() {
    setTimeout(() => {
        consumeWater();
        startRandomWaterConsumption();
    }, getRandomInterval(30000, 60000));
}

foodImage.addEventListener('click', () => {
    addFood();
});

waterImage.addEventListener('click', () => {
    addWater();
});
