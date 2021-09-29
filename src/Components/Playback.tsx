import BFS from "../PathFindingAlgorithms/BFS";
import DFS from "../PathFindingAlgorithms/DFS";
import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { addWarning, parseRowColHash, copy2D } from '../SharedFunctions/SharedFunctions';

import store from '../store';

import Button from "./Button";

interface Redux_Store_Interface {
    animation_paused: boolean,
    animation_in_progress: boolean,
    frame: number,
    end_frame: number,
}

const Playback = () => {
    const [thisRecorder, setRecorder] = useState<any[]>([]);    
    const animation_paused: boolean = useSelector((state: Redux_Store_Interface) => state.animation_paused);
    const animation_in_progress: boolean = useSelector((state: Redux_Store_Interface) => state.animation_in_progress);
    const frame: number = useSelector((state: Redux_Store_Interface) => state.frame);
    const end_frame: number = useSelector((state: Redux_Store_Interface) => state.end_frame);
    const max_time_interval_animation = 1000; 

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const play_recording = async (recorder: any[]) => {
        let saved_frame = store.getState().frame;
        let saved_end_frame = store.getState().end_frame;
        while (saved_frame <= saved_end_frame) {
            store.dispatch({
                type: "path/set_grid",
                payload: recorder[saved_frame],
            });
            
            const animationSpeed = store.getState().animation_speed;
            await sleep(animationSpeed)

            const animationPaused: boolean = store.getState().animation_paused;
            if (animationPaused) return; 

            store.dispatch({
                type: "path/set_frame",
                payload: saved_frame+1
            })

            saved_frame = store.getState().frame;
        }
    }

    /* 
    // old method with only a single array for each recorder
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
    */


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
            switch(store.getState().current_algorithm as any) {
                case "BFS":
                    recorder = BFS(grid, startPosition, endPosition);
                    break;
                case "DFS":
                    recorder = DFS(grid, startPosition, endPosition);
                    break;
                default: 
                    return
            }

            setRecorder(recorder);

            store.dispatch({
                type: "path/set_end_frame",
                payload: recorder.length-1,
            });

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
            payload: max_time_interval_animation - e.target.value,
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

    // maybe an invisible adjuster on the top that can be adjusted and will change which frame
    const onTimePlaybackChange = (e: any) => {
        if (store.getState().animation_in_progress) {
            store.dispatch({type: "path/set_frame", payload: e.target.value})
            store.dispatch({type: "path/set_grid", payload: thisRecorder[e.target.value]})
        }
    } 

    

    return (
        <div className="inline-block">
            <div className="inline-block">
                <div className="inline-block">Slow</div>
                <input className="inline-block"
                    type="range"
                    disabled={false}
                    defaultValue={max_time_interval_animation - store.getState().animation_speed}
                    min="0"
                    max={max_time_interval_animation}
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
                    min="0"
                    max={end_frame.toString()}
                    value={frame}
                    onMouseUp={onTimePlaybackChange}
                />
                <div className="inline-block">End</div>
            </div>
        </div>
    );
}

                    //onChange={(e: any) => {store.dispatch({type: "path/set_frame", payload: "value"});}}

export default Playback