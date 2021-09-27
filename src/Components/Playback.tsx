import BFS from "../PathFindingAlgorithms/BFS";
import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { addWarning, parseRowColHash, copy2D } from '../SharedFunctions/SharedFunctions';

import store from '../store';

import Button from "./Button";

interface Redux_Store_Interface {
    animation_paused: boolean,
    animation_in_progress: boolean,
}

const Playback = () => {
    const [frame, setFrame] = useState(1);    
    const [thisRecorder, setRecorder] = useState<any[]>([]);    
    const animation_paused: boolean = useSelector((state: Redux_Store_Interface) => state.animation_paused);
    const animation_in_progress: boolean = useSelector((state: Redux_Store_Interface) => state.animation_in_progress);

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const play_recording = async (recorder: any[]) => {
        for (let i = frame; i < recorder.length; i++, setFrame(i)) {
            let new_grid = copy2D(store.getState().grid);
            const [ node, beforeType, afterType ] = recorder[i];
            const [ row, col ] = parseRowColHash(node, new_grid[0].length);

            new_grid[row][col] = afterType;

            store.dispatch({
                type: "path/set_grid",
                payload: new_grid,
            });
            
            const animationPaused: boolean = store.getState().animation_paused;
            if (animationPaused) return; 

            const animationSpeed = store.getState().animation_speed;
            await sleep(animationSpeed)
        }
    }

    const onActionClicked = () => {
        if (!animation_in_progress) { // should be "Start"
            let startPosition: number = store.getState().start_position;       
            let endPosition: number = store.getState().end_position;
            let grid: any[] = store.getState().grid;

            if (startPosition === -1) { addWarning("You need to add a starting position."); return; }
            if (endPosition === -1) { addWarning("You need to add a ending position."); return; }

            store.dispatch({
                type: "path/set_animation_paused",
                payload: false,
            });
            
            store.dispatch({
                type: "path/set_animation_in_progress",
                payload: true,
            });

            let recorder: any[];
            switch(store.getState().current_algorithm) {
                case "BFS":
                    recorder = BFS(grid, startPosition, endPosition);
            }

            setRecorder(recorder);

            if (recorder.length === 0) { addWarning("No path possible between start and end."); return; }

            play_recording(recorder);
        } else if (animation_in_progress && !animation_paused) { // should be pause 
            store.dispatch({
                type: "path/set_animation_paused",
                payload: true,
            });
        } else { // should be resume
            store.dispatch({
                type: "path/set_animation_paused",
                payload: false,
            });
            play_recording(thisRecorder);
        }
    }

    const onAnimationSpeedChange = (e: any) => {
        store.dispatch({
            type: "path/set_animation_speed",
            payload: 5000 - e.target.value,
        });
    }

    // retrieves the correct text for the action button
    const getActionText = () => {
        if (!animation_in_progress) { // start
            return "Start"
        } else if (animation_in_progress && !animation_paused) { // pause
            return "Pause"
        } else { // resume 
            return "Resume"
        }
    }

    // retrieves the correct mods for the action button 
    const getActionMods = () => {
        if (!animation_in_progress) { // start
            return "bg-green-600 text-white rounded-full font-medium px-2 hover:bg-green-700 hover:text-gray-200 border"
        } else if (animation_in_progress && !animation_paused) { // pause
            return "bg-red-600 text-white rounded-full font-medium px-2 hover:bg-red-700 hover:text-gray-200 border"
        } else { // resume 
            return "bg-green-600 text-white rounded-full font-medium px-2 hover:bg-green-700 hover:text-gray-200 border"
        }
    }

    return (
        <div className="inline-block">
            <div className="inline-block">
                <div className="inline-block">Slow</div>
                <input className="inline-block"
                    type="range"
                    disabled={false}
                    defaultValue={5000 - store.getState().animation_speed}
                    min="0"
                    max="5000"
                    onMouseUp={onAnimationSpeedChange}
                />
                <div className="inline-block">Fast</div>
            </div>
            <Button onClick={onActionClicked} mods={getActionMods()}>
                {getActionText()}
            </Button>
            <div className="inline-block">
                <div className="inline-block">Beginning</div>
                <input className="inline-block"
                    type="range"
                    disabled={false}
                    defaultValue={frame}
                    min="0"
                    max="5000"
                    onMouseUp={onAnimationSpeedChange}
                />
                <div className="inline-block">End</div>
            </div>
        </div>
    );
}

export default Playback