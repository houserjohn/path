import Toolbar from './Toolbar';
import Visualizer from './Visualizer';
import WarningManager from "./WarningManager";

import { useSelector } from "react-redux";

interface Redux_Store_Interface {
    warnings: string[],
}

//filter: blur(8px); //-webkit-filter: blur(8px);
const Path = () => {
    const warnings: string[] = useSelector((state: Redux_Store_Interface) => state.warnings);


    return (
        <div className=" h-screen">
            <WarningManager/> 
            <div style={{filter: `${warnings.length === 0 ? '' : 'blur(1px)'}` }}>
                <Toolbar/>
                <Visualizer/>
            </div>
        </div>
    );
};

export default Path;