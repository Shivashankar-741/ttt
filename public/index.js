"use strict";
const playerX = [];
const playerO = [];
let currentPlayerX = true;
const getCurrentPlayerElement = () => {
    if (currentPlayerX)
        return '<span class="item_symbol item_symbol_x">X</span>';
    return '<span class="item_symbol item_symbol_o">O</span>';
};
const checkWhoWon = (playerX) => {
    // there can be only two ways when substracts, value should be 1 or 3
    let indices = [...playerX]; // [5, 6, 4]
    indices = indices.sort((a, b) => a - b); //[4,5,6]
    let range = indices[1] - indices[0];
    if ([1, 3].includes(range)) {
        let playerWins = true;
        for (let i = 1; i < indices.length; i++) {
            if (indices[i] - range !== indices[i - 1]) {
                playerWins = false;
                break;
            }
        }
        if (playerWins) {
            setTimeout(() => {
                alert(`${!currentPlayerX ? "X" : "O"} wins, Game Over`);
                window.location.reload();
            }, 500);
            return;
        }
    }
};
const isGameOver = (playerX, playerO) => {
    if (currentPlayerX && playerX.length >= 3) {
        //when playerX wins
        checkWhoWon(playerX);
    }
    if (!currentPlayerX && playerO.length >= 3) {
        // when playerO wins
        checkWhoWon(playerO);
    }
    if (playerX.length + playerO.length === 9) {
        setTimeout(() => {
            alert("Game Over");
            window.location.reload();
        }, 1000);
        return;
    }
    currentPlayerX = !currentPlayerX;
};
document.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    //if user clicked on grid box or already occupied boxes
    if ((target === null || target === void 0 ? void 0 : target.className.startsWith("grid_item")) || (target === null || target === void 0 ? void 0 : target.className) === "item_symbol") {
        // if user clicked on already occupied boxes
        if ((target === null || target === void 0 ? void 0 : target.className) === "item_symbol" || !!((_a = target === null || target === void 0 ? void 0 : target.children) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const getGridCName = target.className.split(" ")[1];
        const getIndexOfGridItem = parseInt(getGridCName[getGridCName.length - 1]);
        const getGridItem = document.querySelector(`.grid_item_${getIndexOfGridItem}`);
        getGridItem === null || getGridItem === void 0 ? void 0 : getGridItem.insertAdjacentHTML("beforeend", getCurrentPlayerElement());
        if (currentPlayerX)
            playerX.push(getIndexOfGridItem);
        else
            playerO.push(getIndexOfGridItem);
        isGameOver(playerX, playerO);
    }
});
