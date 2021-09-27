import store from "../store";


const create2D = (rows: number, cols: number, default_value: string): any[] => {
    let new_grid: any[] = []
    for (let r = 0; r < rows; r++) {
        new_grid.push([]);
        for (let c = 0; c < cols; c++) {
            new_grid[new_grid.length-1].push(default_value);
        }
    }
    return new_grid;
}

const copy2D = (old_grid: any[]): any[] => {
    let new_grid: any[] = []
    for (let r = 0; r < old_grid.length; r++) {
        new_grid.push(old_grid[r].slice())
    }
    return new_grid;
} 

// returns [row, col] from a hashed row,col
const parseRowColHash = (hash: number, numCols: number): number[] => (
    [Math.floor(hash/numCols),hash%numCols]
);

// returns hashed row,col from row, col with numCols
const hashRowCol = (row: number, col: number, numCols: number) : number => (row*numCols+col);

const addWarning = (msg: string) => {
    const old_warnings: string[] = store.getState().warnings;

    let new_warnings = old_warnings.slice();
    new_warnings.push(msg);

    store.dispatch({
        type: "path/set_warnings",
        payload: new_warnings,
    });
}

export { create2D, copy2D, parseRowColHash, hashRowCol, addWarning }