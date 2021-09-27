import store from '../store';

import Button from "./Button";

const Playback = () => {

    const onStartClicked = () => {
        
    }

    return (
        <div className="inline-block">
            <Button mods="bg-green-600 text-white rounded-full font-medium px-2 hover:bg-green-700 hover:text-gray-200 border">
                Start
            </Button>
            <Button mods="disabled bg-red-600 text-white rounded-full font-medium px-2 hover:bg-red-700 hover:text-gray-200 border">
                Stop
            </Button>
        </div>
    );
}

export default Playback