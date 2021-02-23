import {
	update as updateSnake,
	draw as drawSnake,
	getSnakeHead,
	snakeIntersection,
	SNAKE_SPEED,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outSideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
	if (gameOver) {
		if (confirm("You lost, Please Press ok to restart.")) {
			window.location = "/";
		}
		return;
	}
	window.requestAnimationFrame(main);
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
	lastRenderTime = currentTime;
	// console.log("Render");
	// console.log(secondsSinceLastRender);

	update();
	draw();
}

window.requestAnimationFrame(main);

function draw() {
	gameBoard.innerHTML = "";
	drawSnake(gameBoard);
	drawFood(gameBoard);
}

function update() {
	updateSnake();
	updateFood();
	checkDeath();
}

function checkDeath() {
	gameOver = outSideGrid(getSnakeHead()) || snakeIntersection();
}
