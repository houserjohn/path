// Note: we will precompute the answer to each of these path finding problems
// and then we will save the answer to a recorder that will playback the answer.
// This way, we can pause, rewind, and change the speed of the playback easily.

import Queue from "../DataStructures/Queue";

import { parseRowColHash, hashRowCol, copy2D } from "../SharedFunctions/SharedFunctions";

// Does a breadth first search.
// Returns a recorder (an array with an array inside that contains the before and after tile change):
// ex: [[24, "W", "P"]]
const BFS = (grid: any[], start: number, end: number): any[] => {
    const numCols = grid[0].length;
    const numRows = grid.length;

    let new_grid = copy2D(grid); // new_grid for keeping track of values changed for the recorder
    let visited: {[key: string] : boolean } = {} 
    let queue = new Queue([start]) 
    let path: any[] = [];
    let recorder: any[] = [];
    let pathFound = false;

    while(!queue.isEmpty()) {
        let node: number = queue.dequeue();
        
        // check if end node
        if (end === node) { pathFound = true; break; }
        
        // check if already visited
        if (node.toString() in visited) continue;

        // mark visited
        visited[node.toString()] = true;
        
        // record the visit
        const [ row, col ] = parseRowColHash(node, numCols);
        //console.log(`${node}: row ${row} col ${col}`);
        recorder.push([node, new_grid[row][col], "F"])
        new_grid[row][col] = "F";

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
                    queue.enqueue(hashRowCol(newRow, newCol, numCols))
                    break;
                default:
                    continue;                
            }
        }
    }
    
    return recorder; // (pathFound ? path : []);
}

export default BFS;