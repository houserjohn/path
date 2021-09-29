
import Stack from "../DataStructures/Stack";

import { parseRowColHash, hashRowCol, copy2D } from "../SharedFunctions/SharedFunctions";

const DFS = (grid: any[], start: number, end: number): any[] => {
    const numCols = grid[0].length;
    const numRows = grid.length;

    let new_grid = copy2D(grid); // new_grid for keeping track of values changed for the recorder (old recorder)
    let visited: {[key: string] : boolean } = {} 
    let stack = new Stack([start]);
    let path = new Stack([]);
    let recorder: any[] = [];
    let pathFound = false;

    while(!stack.isEmpty()) {
        let node: number = stack.pop();
        
        // check if end node
        if (end === node) { pathFound = true; break; }
        
        // check if already visited
        if (node.toString() in visited) continue;

        // mark visited
        visited[node.toString()] = true;
        
        // record the visit
        const [ row, col ] = parseRowColHash(node, numCols);
        //console.log(`${node}: row ${row} col ${col}`);
        //recorder.push([node, new_grid[row][col], "F"]) // maybe use this in order to determine which animation to be played
        if (new_grid[row][col] !== "S") new_grid[row][col] = "F";
        recorder.push(copy2D(new_grid));

        // get neighbors
        const neighbors: number[][] = [[row-1, col],[row,col+1],[row+1,col],[row,col-1]];
        // check if valid neighbor to explore next
        for (let i = 0; i < neighbors.length; i++) { 
            const [newRow, newCol] = neighbors[i];
            if (newRow < 0 || newRow >= numRows) continue;
            if (newCol < 0 || newCol >= numCols) continue;
            switch(grid[newRow][newCol]) {
                case "S":
                case "E":
                case "P":
                    stack.push(hashRowCol(newRow, newCol, numCols))
                    break;
                default:
                    continue;                
            }
        }
    }

    /*
    for (let i = 0; i < stack.length(); i++) {
        // record the path in the recorder
        const [ row, col ] = parseRowColHash(stack[i] as number, numCols);
        //console.log(`${node}: row ${row} col ${col}`);
        //recorder.push([node, new_grid[row][col], "F"]) // maybe use this in order to determine which animation to be played
        if (new_grid[row][col] !== "S") new_grid[row][col] = "F";
        recorder.push(copy2D(new_grid));
    }
    */
    
    return recorder; // (pathFound ? path : []);
}

export default DFS;