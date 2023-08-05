import React, { useState, useEffect, useCallback } from 'react';
import Node from '../Node';
import './PathFinderGridStyles.scss';
import { mazeGenerationAnimations } from '../../Animations/mazeGenerationAnimations';
import { dijkstra, getNodesInShortestPathOrder } from '../../utils/dijkstra';
import { recursiveDivisionMaze } from '../../utils/maze';
import Navbar from '../Navbar';

export interface IPatFinderGridProps {
}

interface GridItem {
  column: number
  row: number,
  isVisited: boolean,
  isWall: boolean,
  isStart: boolean,
  isFinish: boolean,
  previousNode: null,
  distance: number
}

var START_NODE_ROW: number = 5;
var START_NODE_COL: number = 10;
var FINISH_NODE_ROW: number = 47;
var FINISH_NODE_COL: number = 10;
const MAX_ROW: number = 50;
const MAX_COLUMN: number = 20;

export default function PatFinderGrid(props: IPatFinderGridProps) {
  const [grid, setGrid] = useState<GridItem[][]>([]);
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [isStartNodeDragged, setIsStartNodeDragged] = useState<boolean>(false);
  const [isFinishNodeDragged, setIsFinishNodeDragged] = useState<boolean>(false);

  const initializeGrid = useCallback(() => {
    const newGrid: GridItem[][] = [];
    for (let row = 0; row < MAX_ROW; row++) {
      const currentRow: GridItem[] = [];
      for (let col = 0; col < MAX_COLUMN; col++) {
        currentRow.push(createNode(col, row));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  }, []);

  function resetGrid() {
    const newGrid: GridItem[][] = [];
    for (let row = 0; row < MAX_ROW; row++) {
      const currentRow: GridItem[] = [];
      for (let col = 0; col < MAX_COLUMN; col++) {
        const element = document.getElementById(`node-${row}-${col}`);
        if (element) {
          const isStart = row === START_NODE_ROW && col === START_NODE_COL;
          const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;

          if (isStart) element.className = 'node node-start';
          else if (isFinish) element.className = 'node node-finish';
          else element.className = 'node'
        }

        currentRow.push(createNode(col, row));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  }

  const handleOnDown = (column: number, row: number) => {
    setIsMousePressed(true);
    if (isStartOrFinishNode(column, row)) {
      setIsStartNodeDragged(row === START_NODE_ROW && column === START_NODE_COL);
      setIsFinishNodeDragged(row === FINISH_NODE_ROW && column === FINISH_NODE_COL);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, column);
      setGrid(newGrid);
    }
  };

  const handleOnUp = () => {
    setIsMousePressed(false);
    setIsStartNodeDragged(false);
    setIsFinishNodeDragged(false);
  };
  
  const handleOnEnter = (column: number, row: number) => {
    if (isMousePressed) {
      const newGrid = isStartNodeDragged
        ? moveNode(grid, row, column, true)
        : isFinishNodeDragged
          ? moveNode(grid, row, column, false)
          : getNewGridWithWallToggled(grid, row, column);
      setGrid(newGrid);
    }
  };

  const getNewGridWithWallToggled = (grid: GridItem[][], row: number, col: number): GridItem[][] => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  
  const moveNode = (grid: GridItem[][], newRow: number, newCol: number, isStartNode: boolean): GridItem[][] => {
    const newGrid = grid.slice();
    if (isStartNode) {
      newGrid[START_NODE_ROW][START_NODE_COL].isStart = false;
      START_NODE_ROW = newRow;
      START_NODE_COL = newCol;
      newGrid[newRow][newCol].isStart = true;
    } else {
      newGrid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;
      FINISH_NODE_ROW = newRow;
      FINISH_NODE_COL = newCol;
      newGrid[newRow][newCol].isFinish = true;
    }
    return newGrid;
  };

  function isStartOrFinishNode(column: number, row: number) {
    const isStart = row === START_NODE_ROW && column === START_NODE_COL;
    const isFinish = row === FINISH_NODE_ROW && column === FINISH_NODE_COL;

    if (isStart || isFinish) {
      return true
    }
    return false
  }

  const createNode = (col: number, row: number) => {
    return {
      column: col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  function onSearch() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const generateMaze = async() => {
    const newGrid = grid.slice();    
    let animations: any[] = [];
    await recursiveDivisionMaze(newGrid, 0, MAX_ROW - 1, 0, MAX_COLUMN - 1, "vertical", false, "wall", animations);
    await mazeGenerationAnimations(newGrid, animations, setGrid)
  };

  function animateDijkstra(visitedNodesInOrder: any, nodesInShortestPathOrder: any) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.column}`);
        if (element) {
          element.className = 'node node-visited';
        }
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder: any) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.column}`);

        if (element) {
          element.className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  useEffect(() => {
    initializeGrid()
  }, [initializeGrid])

  return (
    <>
      <Navbar
        handleOnStart={onSearch}
        handleOnClear={resetGrid}
        generateMaze={generateMaze}
      />
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((node, colIndex) => (
              <div key={colIndex} >
                <Node
                  column={node.column}
                  row={node.row}
                  isVisited={node.isVisited}
                  isWall={node.isWall}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  distance={node.distance}
                  handleOnDown={handleOnDown}
                  handleOnUp={handleOnUp}
                  handleOnEnter={handleOnEnter}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
