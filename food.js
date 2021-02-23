import {
	onSnake,
	expandSnake,
	getSnakeBodylength,
	getSnakeHead,
	SNAKE_SPEED,
	changeSnakeSpeed,
} from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANDSION_RATE = 1;
const speedChangeRate = 1;
let speedChangeValue = 2;

export function update() {
	if (onSnake(food)) {
		expandSnake(EXPANDSION_RATE);
		food = getRandomFoodPosition();

		if (getSnakeBodylength() % speedChangeValue === 0) {
			changeSnakeSpeed(speedChangeRate);
			console.log("change Snake speed: ", SNAKE_SPEED);
		}
	}
}

export function draw(gameBoard) {
	const foodElement = document.createElement("div");
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add("food");
	gameBoard.appendChild(foodElement);
}

export function getRandomFoodPosition() {
	let newFoodPosition;
	while (newFoodPosition == null || onSnake(newFoodPosition)) {
		newFoodPosition = randomGridPosition();
	}
	return newFoodPosition;
}
