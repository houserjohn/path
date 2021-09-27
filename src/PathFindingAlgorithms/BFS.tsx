// Note: we will precompute the answer to each of these path finding problems
// and then we will save the answer to a recorder that will playback the answer.
// This way, we can pause, rewind, and change the speed of the playback easily.

import Queue from "../DataStructures/Queue";

import { parseRowColHash, hashRowCol } from "../SharedFunctions/SharedFunctions";

// Does a breadth first search.
// Returns a recorder (an array with an array inside that contains the before and after tile change):
// ex: [[24, "W", "P"]]
const BFS = (grid: any[], start: number, end: number): any[] => {
    const numCols = grid[0].length;
    const numRows = grid.length;

    let visited: {[key: string] : boolean } = {} 
    let queue = new Queue([start]) 
    let pathFound = false;

    while(!queue.isEmpty()) {
        let node: number = queue.dequeue();
        if (node.toString() in visited) continue;
        visited[node.toString()] = true;
        console.log(node);

        // check if end node
        if (end === node) { pathFound = true; break; }

        // get neighbors
        const [ row, col ] = parseRowColHash(node, numCols);
        const neighbors: number[][] = [[row-1, col],[row,col-1],[row+1,col],[row,col+1]];
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
    
    return [];
}

export default BFS;