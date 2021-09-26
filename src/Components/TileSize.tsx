// TileSize allows the client to adjust the tile size of the grid
import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import store from '../store';
import Button from './Button';

import { addWarning } from "../SharedFunctions/SharedFunctions";

// function is from https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
// only positive whole numbers are allowed
function isNumeric(value: string) {
    return /^\d+$/.test(value);
}

function isPositiveWholeNumber(value: string) {
    return isNumeric(value) && value !== "0"
}

interface Redux_Store_Interface {
    tile_size: number
} 

const TileSize = () => {
    const tile_size: number = useSelector((state: Redux_Store_Interface) => state.tile_size);
    const [tileSize, setTileSize] = useState(tile_size.toString());    
    const tileSizeInput = useRef<any>(null);
    
    const tileSizeChange = (e: any) => {
        const input = e.target.value;
        setTileSize(input);
    }

    const onTileSizeUpdate = () => {
        if (isPositiveWholeNumber(tileSize) && parseInt(tileSize) < 100) {
            // update the store
            
            store.dispatch({
                type: "path/set_tile_size",
                payload: tileSize,
            });
        } else { 
            // return the rows and cols inputs back to their store values
            tileSizeInput.current!.value = tile_size.toString();
            
            addWarning("Tile size must be smaller than 100. No negative numbers and non-numbers.")
        }
    }


    return (
        <div className="inline-block">
            Tile Size:
            <input onChange={(e: any) => tileSizeChange(e)} ref={tileSizeInput} className="inline-block text-right w-6 mx-1 bg-gray-100" defaultValue={tile_size} />
            <Button mods={"bg-gray-100"} onClick={onTileSizeUpdate}>Update</Button>
        </div>
    );
}

export default TileSize;