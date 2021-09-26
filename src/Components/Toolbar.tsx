import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import store from '../store';

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

const Toolbar = () => {
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
        if (isPositiveWholeNumber(rows) && isPositiveWholeNumber(cols)  ) {
            // update the store
            let new_grid: any[] = []
            for (let r = 0; r < parseInt(rows); r++) {
                new_grid.push([]);
                for (let c = 0; c < parseInt(cols); c++) {
                    new_grid[new_grid.length-1].push({});
                }
            }

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
        <div className="h-8 py-1">
            <div className="w-10/12 m-auto ">
                <div className="inline-block">
                    Grid Size:
                </div>
                <input onChange={(e: any) => rowSizeChange(e)} ref={rowInput} className="inline-block text-right w-6 mx-1 bg-gray-100" defaultValue={grid.length} />
                x
                <input onChange={(e: any) => colSizeChange(e)} ref={colInput} className="inline-block text-right w-6 mx-1 bg-gray-100" defaultValue={grid[0].length}/>
                <button onClick={onGridUpdate} className="bg-gray-100 rounded-full px-1 text-xs font-medium text-gray-600 border shadow inline-block w-auto m-auto hover:bg-gray-200 ">Update</button>
            </div>
        </div>
    );
};

export default Toolbar;