export async function mazeGenerationAnimations(board:any, wallsToAnimate:any, setGrid:any) {
    const nodes = wallsToAnimate.slice(0);
    const speed = 1; // Change the speed to 5000ms (5 seconds)
  
    function delay(ms:any) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    for (let index = 0; index < nodes.length; index++) {
      const { row, column } = nodes[index];
    
      board[row][column].isWall = true;
      setGrid([...board]); // Create a new reference to trigger the state update
      await delay(speed);
    }
  
    // After all animations complete, clear the wallsToAnimate array
    wallsToAnimate.length = 0;
  }

