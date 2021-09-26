import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (
  state: {
    grid: any[],
    tile_size: number,
    object_selected: string,
    start_position: number,
    end_position: number,
    mouse_dragging: boolean,
    warnings: string[]
  },
  action: { type: string; payload: any }
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case "path/set_grid": {
      // sets the grid 
    return {
        ...state,
        grid: action.payload,
      };
    }

    case "path/set_tile_size": {
      // updates the size of tiles
      return {
        ...state,
        tile_size: action.payload,
      };
    }

    case "path/set_object_selected": {
      // update the object selected (for placing)
      return {
        ...state,
        object_selected: action.payload,
      }
    }

    case "path/set_start_position": {
      // set the start position of the algorithm
      return {
        ...state,
        start_position: action.payload,
      }
    }

    case "path/set_end_position": {
      // set the end position of the algorithm
      return {
        ...state,
        end_position: action.payload,
      }
    }

    case "path/set_mouse_dragging": {
      // set whether or not the mouse is currently dragging
      return {
        ...state,
        mouse_dragging: action.payload,
      }
    }

    case "path/set_warnings": {
      // set the warnings that are shown to the user
      return {
        ...state,
        warnings: action.payload
      }
    }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};

const store = createStore(
  reducer as any,
  {
    grid: [
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
        ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
    ], 
    tile_size: 10,
    object_selected: "W",
    start_position: -1,
    end_position: -1,
    mouse_dragging: false,
    warnings: [],
  },
  composeWithDevTools()
);

export default store;