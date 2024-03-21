document.addEventListener('DOMContentLoaded', function() {
    let turns = 0;

    const start = () => {
        turns = 1;
    }   

    const nextTurn = () => {
        turns++;
    }

    const resetField = () => {
        cells.forEach(cell => {
            cell.textContent = '';
            turns = 1;
        })
    }

    const cells = document.querySelectorAll('.tic-tac-toe th');
    cells.forEach(cell => {
        cell.addEventListener('click', fillField);
    });

    class Player {
        constructor(symbol) {
            this.symbol = symbol;
            this.fillField = this.fillField.bind(this);
        }
        
        fillField(event) {
            const cell = event.target;
            if (cell.tagName === 'TH' && cell.textContent === '') {
                cell.textContent = this.symbol;
                nextTurn();
                console.log(cells);
                console.log(typeof(cells));
            }
        }
    }

    const xPlayer = new Player('X');
    const oPlayer = new Player('O');

    function fillField(event) {
        if (turns % 2 == 0) {
            oPlayer.fillField(event);
        } else {
            xPlayer.fillField(event);
        }
        checkWinner();
    }

    function checkWinner() {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

            for(let condition of winCondition) {
                const [a, b, c] = condition;
                const cellsArray =  Array.from(cells);
                const symbolA = cellsArray[a].textContent;
                const symbolB = cellsArray[b].textContent;
                const symbolC = cellsArray[c].textContent;

                if (symbolA !== '' && symbolA === symbolB && symbolA === symbolC) {
                    highlightWinnerCells(cellsArray[a], cellsArray[b], cellsArray[c]);
                    announceWinner(symbolA);
                    return;
            }
        }
        if (turns == 10) {
            announceDraw();
        }
    }
    function highlightWinnerCells(cellA, cellB, cellC) {
        cellA.style.color = 'yellow';
        cellB.style.color = 'yellow';
        cellC.style.color = 'yellow';
    }
    function announceWinner(symbol) {
        alert(`Player ${symbol} wins!`);
    }

    function announceDraw() {
        alert('Draw!');
    }

    start();
    const resetButton = document.querySelector('.reset-button')
    resetButton.addEventListener('click', resetField)
    console.log(cells);
});