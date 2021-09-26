// GridSize component responsible for allowing client to adjust grid size

import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import store from '../store';
import Button from './Button';
import { create2D } from '../SharedFunctions/SharedFunctions';

interface Redux_Store_Interface {
    grid: any[]
}

// function is from https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
// only positive whole numbers are allowed
function isNumeric(value: string) {
    return /^\d+$/.test(value);
}

function isPositiveWholeNumber(value: string) {
    return isNumeric(value) && value !== "0"
}

const GridSize = () => {
    const grid: any[] = useSelector((state: Redux_Store_Interface) => state.grid);
    const [rows, setRows] = useState(grid.length.toString());    
    const [cols, setCols] = useState(grid[0].length.toString());    
    const rowInput = useRef<any>(null);
    const colInput = useRef<any>(null);
    

    const rowSizeChange = (e: any) => {
        const input = e.target.value;
        setRows(input);
    }

    const colSizeChange = (e: any) => {
        const input = e.target.value;
        setCols(input);
    }

    const onGridUpdate = () => {
        if (isPositiveWholeNumber(rows) && isPositiveWholeNumber(cols) && parseInt(rows)<100 && parseInt(cols)<100  ) {
            // update the store 
            let new_grid: any[] = create2D(parseInt(rows), parseInt(cols), "P")

            store.dispatch({
                type: "path/set_grid",
                payload: new_grid,
            });
        } else { 
            // return the rows and cols inputs back to their store values
            rowInput.current!.value = grid.length.toString();
            colInput.current!.value = grid[0].length.toString();
        }
    }
    
    return (
        <div className="inline-block">
            <div className="inline-block">
                Grid Size:
            </div>
            <input onChange={(e: any) => rowSizeChange(e)} ref={rowInput} className="inline-block text-right w-6 mx-1 bg-gray-100" defaultValue={grid.length} />
            x
            <input onChange={(e: any) => colSizeChange(e)} ref={colInput} className="inline-block text-right w-6 mx-1 bg-gray-100" defaultValue={grid[0].length}/>
            <Button mods={"bg-gray-100"} onClick={onGridUpdate}>Update</Button>
        </div>
    );
}

export default GridSize;