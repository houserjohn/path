
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

export { create2D, copy2D }