// Toolbar that allows the client to control playback, algorithms, grid size, etc.

import GridSize from './GridSize';
import TileSize from './TileSize';
import ObjectSelector from './ObjectSelector';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from "./Playback";

const Toolbar = () => {
    

    return (
        <div className="h-8 py-1">
            <div className="w-10/12 m-auto ">
                <GridSize/>
                <TileSize/>
                <ObjectSelector/>
                <AlgorithmSelector/>                
                <Playback/>
            </div>
        </div>
    );
};

export default Toolbar;