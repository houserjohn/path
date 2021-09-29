import store from '../store';
import { useSelector } from "react-redux";
import { copy2D, parseRowColHash } from '../SharedFunctions/SharedFunctions';

// W: wall, P: path, S: start, F: searched, E: End, A: answer path (solution)

interface Redux_Store_Interface {
    grid: any[],
    tile_size: number,
    object_selected: string,
}

interface Tile_Props {
    children: string,
    row: number,
    col: number,
    type: string,
}

document.body.onmousedown = () => { 
  //console.log("mouse down")
  store.dispatch({
      type: "path/set_mouse_dragging",
      payload: true,
  });
}

document.body.onmouseup = () => { 
  //console.log("mouse up")
  store.dispatch({
    type: "path/set_mouse_dragging",
    payload: false,
  })
}

const Tile = (props: Tile_Props) => {
    const grid: any[] = useSelector((state: Redux_Store_Interface) => state.grid);
    const tile_size: number = useSelector((state: Redux_Store_Interface) => state.tile_size);
    const object_selected: string = useSelector((state: Redux_Store_Interface) => state.object_selected);

    const placeNewTile = () => {
        if (store.getState().animation_in_progress) return; // can't draw while the animation is being played

        const new_grid: any[] = copy2D(grid);
        new_grid[props.row][props.col] = object_selected;

        if (grid[props.row][props.col] === "E") { // if overwriting end point then change end
            store.dispatch({ // update the ending location
                type: "path/set_end_position",
                payload: -1,
            }); 
        } 

        if (grid[props.row][props.col] === "S") { // if overwriting start point then change start
            store.dispatch({ // update the starting location
                type: "path/set_start_position",
                payload: -1,
            }); 
        } 

        switch(object_selected) {
            case "S": 
                const start_pos = store.getState().start_position;
                if (start_pos !== -1) { // check if there was a previous starting location
                    const [row, col] = parseRowColHash(start_pos, grid[0].length);
                    new_grid[row][col] = "P"; // remove previous starting location
                }    
                store.dispatch({ // update the starting location
                    type: "path/set_start_position",
                    payload: (props.row*grid[0].length+props.col),
                });            
                store.dispatch({ // update the grid
                    type: "path/set_grid",
                    payload: new_grid,
                });
                break;
            case "E":
                const end_pos = store.getState().end_position;
                if (end_pos !== -1) { // check if there was a previous starting location
                    const [row, col] = parseRowColHash(end_pos, grid[0].length);
                    new_grid[row][col] = "P"; // remove previous starting location
                }    
                store.dispatch({ // update the end location
                    type: "path/set_end_position",
                    payload: (props.row*grid[0].length+props.col),
                });            
                store.dispatch({ // update the grid
                    type: "path/set_grid",
                    payload: new_grid,
                });
                break;
            default:
                store.dispatch({
                    type: "path/set_grid",
                    payload: new_grid,
                });
        }

  
    }

    const onTileHover = () => { // draw items if mouse is dragging over element
        const mouseDragging = store.getState().mouse_dragging;
        if (mouseDragging) {
            placeNewTile();
        }
    }

    const onTileClick = () => {
        //console.log(props.row, props.col);
        //console.log(props.row*grid[0].length + props.col )
        placeNewTile();
      
    }

    const getTypeProperties = (type: string): string => {
        switch(type) {
            case "W":
                return "bg-gray-400"
            case "P":
                return "bg-gray-100"
            case "S":
                return "bg-green-400"
            case "F":
                return "bg-yellow-400"
            case "E":
                return "bg-red-400"
            case "A":
                return "bg-blue-400"
            default:
                return "bg-purple-900"
        }
    }

    return (
        <div onMouseDown={onTileClick} onMouseEnter={onTileHover} className={`w-${tile_size.toString()} h-${tile_size.toString()} inline-block z-10 border cursor-pointer border-gray`} >
            <div className={` ${getTypeProperties(props.type)} w-full h-full z-20 `} >
            </div>
        </div>
    );
};

export default Tile;