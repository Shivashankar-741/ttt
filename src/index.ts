const playerX: number[] = [];
const playerO: number[] = [];

let currentPlayerX = true;

const getCurrentPlayerElement = () => {
	if (currentPlayerX) return '<span class="item_symbol item_symbol_x">X</span>';
	else return '<span class="item_symbol item_symbol_o">O</span>';
};

const showGameStatus = (msg: string) => {
	setTimeout(() => {
		alert(msg);
		window.location.reload();
	}, 250);
	return;
};

const checkWhoWon = (chosenIndices: number[], player: string) => {
	chosenIndices = chosenIndices.sort((a, b) => a - b);

	const successiveIndices = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	];

	for (let i = 0; i < successiveIndices.length; i++) {
		for (let j = 0; j < successiveIndices[j].length; j++) {
			if (chosenIndices.includes(successiveIndices[i][j]) && j === 2) showGameStatus(`${player} wins the game`);
			else if (!chosenIndices.includes(successiveIndices[i][j])) break;
		}
	}
};

const isGameOver = (playerX: number[], playerO: number[]) => {
	//when playerX wins
	if (currentPlayerX && playerX.length >= 3) checkWhoWon(playerX, "X");

	// when playerO wins
	if (!currentPlayerX && playerO.length >= 3) checkWhoWon(playerO, "O");

	if (playerX.length + playerO.length === 9) showGameStatus("Game Over");

	currentPlayerX = !currentPlayerX;
};

document.addEventListener("click", (e) => {
	const target = e.target as HTMLAreaElement;

	//if user clicked on grid box or already occupied boxes
	if (target?.className.startsWith("grid_item") || target?.className === "item_symbol") {
		// if user clicked on already occupied boxes
		if (target?.className === "item_symbol" || !!target?.children?.length) return;

		const getGridCName = target.className.split(" ")[1];
		const getIndexOfGridItem = parseInt(getGridCName[getGridCName.length - 1]);

		const getGridItem = document.querySelector(`.grid_item_${getIndexOfGridItem}`);
		getGridItem?.insertAdjacentHTML("beforeend", getCurrentPlayerElement());

		if (currentPlayerX) playerX.push(getIndexOfGridItem);
		else playerO.push(getIndexOfGridItem);

		isGameOver(playerX, playerO);
	}
});
