import store from '../store';
import { useSelector } from "react-redux";
import { copy2D } from '../SharedFunctions/SharedFunctions';

// W: wall, P: path, S: start, F: searched, E: End

interface Redux_Store_Interface {
    grid: any[],
    tile_size: number,
}

interface Tile_Props {
    children: string,
    row: number,
    col: number,
    type: string,
}

const Tile = (props: Tile_Props) => {
    const grid: any[] = useSelector((state: Redux_Store_Interface) => state.grid);
    const tile_size: number = useSelector((state: Redux_Store_Interface) => state.tile_size);

    const onTileClick = () => {
        console.log(props.row, props.col);
        const new_grid: any[] = copy2D(grid);
        new_grid[props.row][props.col] = "W";

        store.dispatch({
            type: "path/set_grid",
            payload: new_grid,
        });
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
            default:
                return "bg-purple-900"
        }
    }

    return (
        <div onClick={onTileClick} className={`w-${tile_size.toString()} h-${tile_size.toString()} ${getTypeProperties(props.type)} inline-block border cursor-pointer border-gray`} >
                <div className="flex justify-center items-center opacity-0 " style={{width: "100%", height: "100%"}}>
                    a
                </div>
        </div>
    );
};

export default Tile;