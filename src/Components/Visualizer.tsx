import { useSelector } from "react-redux";

import Tile from "./Tile";

interface Redux_Store_Interface {
    grid: any[],
    tile_size: number,
}


const Visualizer = () => {
    const grid: any[] = useSelector((state: Redux_Store_Interface) => state.grid);
    const tile_size: number = useSelector((state: Redux_Store_Interface) => state.tile_size);

    return (
        <div className="text-center">
                {
                    grid.map((tiles: any[], row: number) => (
                        <div key={row} className={`h-${tile_size}`}>
                            {
                            tiles.map((tile: any, col: number) => (
                                <Tile key={col}> hello </Tile>
                            ))
                            }
                        </div>
                    ))   
                }
        </div>
    );
};

export default Visualizer;