import { useSelector } from "react-redux";


import Warning from "./Warning";

interface Redux_Store_Interface {
    warnings: string[],
}

const WarningManager = () => {
    const warnings: string[] = useSelector((state: Redux_Store_Interface) => state.warnings);
    
    return (
        <div className={`absolute h-full ${warnings.length === 0 ? "hidden" : ""}  w-full align-bottom z-10`}>
            <div className="absolute bottom-0 pb-4 w-full flex flex-col-reverse gap-1">
                {
                    warnings.map((warning: string, index: number) => {
                        return (<Warning key={index} index={index}>{warning}</Warning>);
                    })
                }
            </div>
        </div>
    ); 
}

export default WarningManager;