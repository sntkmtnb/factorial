document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("sudoku-board");
    const newGameButton = document.getElementById("new-game");
    const checkSolutionButton = document.getElementById("check-solution");

    let puzzle = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    function generateSudoku() {
        puzzle = shuffle();

        const inputs = board.getElementsByTagName("input");
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const value = index + 1;
                inputs[index].value = value ? value : "";
            }
        }
    }

    function isSolved() {
        const inputs = board.getElementsByTagName("input");
        let values = Array.from(inputs).map((input) => parseInt(input.value, 10));

        let check_row = [0, 0, 0];
        let check_col = [0, 0, 0];

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const value = values[row * 3 + col];

                if (!value) {
                    return false;
                }

                if (puzzle[row][col] === value) {
                    check_row[row] = check_row[row] + 4;
                    check_col[col] = check_col[col] + 4;
                    continue;
                }
                for (let i = 0; i < 3; i++) {
                    if (i !== col && puzzle[row][i] === value) {
                        check_row[row] = check_row[row] + 1;
                    }
                    if (i !== row && puzzle[i][col] === value) {
                        check_col[col] = check_col[col] + 1;
                    }
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            document.getElementById(`check-col-${i+1}-n`).innerHTML = check_row[i] % 4;
            document.getElementById(`check-col-${i+1}-h`).innerHTML = Math.floor(check_row[i] / 4);
            document.getElementById(`check-row-${i+1}-n`).innerHTML = check_col[i] % 4;
            document.getElementById(`check-row-${i+1}-h`).innerHTML = Math.floor(check_col[i] / 4);
        }

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const value = values[row * 3 + col];

                if (!value) {
                    return false;
                }

                if (puzzle[row][col] !== value) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkSolution() {
        if (isSolved()) {
            alert("正解です！");
        } else {
            alert("不正解です。");
        }
    }

    function shuffle() {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = (array.length - 1); 0 < i; i--) {
            // 0〜(i+1)の範囲で値を取得
            let r = Math.floor(Math.random() * (i + 1));
            // 要素の並び替えを実行
            let tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }

        puzzle = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const value = array[row * 3 + col];
                puzzle[row][col] = value;
            }
        }
        return puzzle;
    }

    newGameButton.addEventListener("click", generateSudoku);
    checkSolutionButton.addEventListener("click", checkSolution);

    // 初期盤面生成
    generateSudoku();
});