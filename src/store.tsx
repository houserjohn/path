import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (
  state: {
    grid: any[],
    tile_size: number,

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
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    ], 
    tile_size: 5,
  },
  composeWithDevTools()
);

export default store;