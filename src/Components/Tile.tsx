import { useSelector } from "react-redux";

// W: wall, P: path

interface Redux_Store_Interface {
    grid: any[],
    tile_size: number,
}

interface Tile_Props {
    children: string,
}

const Tile = (props: Tile_Props) => {
    //const grid: any[] = useSelector((state: Redux_Store_Interface) => state.grid);
    const tile_size: number = useSelector((state: Redux_Store_Interface) => state.tile_size);

    return (
        <div className={`w-${tile_size.toString()} h-${tile_size.toString()} bg-gray-100 inline-block border border-gray`} >
                <div className="flex justify-center items-center opacity-0 cursor-default" style={{width: "100%", height: "100%"}}>
                    a
                </div>
        </div>
    );
};

export default Tile;