
import store from '../store';

interface Warning_Props { 
    children: string,
    index: number,
}

const Warning = (props: Warning_Props) => {
    const onOkClicked = () => {
        const old_warnings: string[] = store.getState().warnings;
        
        let new_warnings: string[] = old_warnings.slice()
        new_warnings.splice(props.index, 1)

        store.dispatch({
            type: "path/set_warnings",
            payload: new_warnings,
        });
    }

    return ( 
        <div className="relative w-8/12 border-2 border-red-600 rounded-xl shadow m-auto bg-red-500 p-4 text-white ">
            <div className="font-medium inline-block mr-2">
                Warning:
            </div>
            <div className="inline-block w-10/12">
                {props.children}
            </div>
            <div onClick={onOkClicked} className="absolute rounded-xl right-5 bottom-3 bg-gray-400 hover:shadow inline-block cursor-pointer border border-white hover:bg-gray-600 hover:border-gray-400 hover:text-gray-300 px-2 py-1 font-bold text-white">
                Ok
            </div>
        </div>
    );
}

export default Warning;