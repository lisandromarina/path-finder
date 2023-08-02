interface GridItem {
    column: number;
    row: number;
    distance: number;
    isWall: boolean;
    isStart: boolean;
    isFinish: boolean;
    previousNode: GridItem | null;
    isVisited: boolean;
}

export function dijkstra(grid: GridItem[][], startNode: GridItem, finishNode: GridItem) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid).filter(Boolean); // Filter out any undefined elements
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode?.isWall) continue; // Use optional chaining to handle possible undefined value
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode?.distance === Infinity) return visitedNodesInOrder; // Use optional chaining to handle possible undefined value
      closestNode!.isVisited = true; // Use non-null assertion to assure TypeScript that closestNode is not undefined
      visitedNodesInOrder.push(closestNode!); // Use non-null assertion to assure TypeScript that closestNode is not undefined
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode!, grid); // Use non-null assertion to assure TypeScript that closestNode is not undefined
    }
  }

function sortNodesByDistance(unvisitedNodes: GridItem[]) {
    unvisitedNodes.sort((nodeA: any, nodeB: any) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: GridItem, grid: GridItem[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node: GridItem, grid: GridItem[][]): GridItem[] {
    const neighbors: GridItem[] = [];
    const { row, column } = node;
    if (row > 0) neighbors.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
    if (column > 0) neighbors.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
    return neighbors.filter((neighbor: GridItem) => !neighbor.isVisited);
  }

function getAllNodes(grid: GridItem[][]) {
    const nodes: GridItem[] = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: GridItem) {
    const nodesInShortestPathOrder = [];
    let currentNode:GridItem | null = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }