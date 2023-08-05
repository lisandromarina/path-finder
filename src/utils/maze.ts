export function recursiveDivisionMaze(
    grid: any,
    rowStart: any,
    rowEnd: any,
    colStart: any,
    colEnd: any,
    orientation: any,
    surroundingWalls: any,
    type: any,
    animations: any
) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }
    if (!surroundingWalls) {
        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                if (row === 0 || col === 0 || row === rowEnd || col === colEnd) {
                    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                        if (type === "wall") {
                            animations.push(grid[row][col])
                        }
                    }
                }
            }
        }
        surroundingWalls = true;
    }
    if (orientation === "horizontal") {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                if (row === currentRow && col !== colRandom && col >= colStart - 1 && col <= colEnd + 1) {
                    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                        if (type === "wall") {
                            //grid[row][col].isWall = true;
                            animations.push(grid[row][col])
                        }
                    }
                }
            }
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, type, animations);
        } else {
            recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls, type, animations);
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, type, animations);
        } else {
            recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, type, animations);
        }
    } else {
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        surroundingWalls = true;

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                if (col === currentCol && row !== rowRandom && row >= rowStart - 1 && row <= rowEnd + 1) {
                    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                        if (type === "wall") {
                            animations.push(grid[row][col])
                        }
                    }
                }
            }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls, type, animations);
        } else {
            recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, type, animations);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, type, animations);
        } else {
            recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, type, animations);
        }
    }
};

