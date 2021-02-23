import { getInputDirection } from "./input.js";

export var SNAKE_SPEED = 2;
const snakeBody = [{ x: 10, y: 11 }];
let newSegments = 0;

export function update() {
	// for (let i = 1; i < snakeBody.length - 1; i++) {
	// 	snakeBody[i] = { ...snakeBody[i + 1] };
	// }
	addSegments();
	const inputDirection = getInputDirection();
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] };
	}
	snakeBody[0].x += inputDirection.x;
	snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
	snakeBody.forEach((segment, idx) => {
		const snakeElement = document.createElement("div");
		// snakeElement.innerHTML = "<span>" + idx + "</span>";
		snakeElement.style.gridRowStart = segment.y;
		snakeElement.style.gridColumnStart = segment.x;
		snakeElement.classList.add("snake");
		gameBoard.appendChild(snakeElement);
	});
}

export function expandSnake(amount) {
	newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
	return snakeBody.some((segment, idx) => {
		if (ignoreHead && idx === 0) return false;
		return segment.x === position.x && segment.y === position.y;
	});
}

export function getSnakeHead() {
	return snakeBody[0];
}

export function snakeIntersection() {
	return onSnake(snakeBody[0], { ignoreHead: true });
}

function addSegments() {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
	}
	newSegments = 0;
}

export function getSnakeBodylength() {
	return snakeBody.length;
}

export function changeSnakeSpeed(speed) {
	SNAKE_SPEED += speed;
}
