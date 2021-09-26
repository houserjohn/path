// ObjectSelect is for allowing the client to choose between the different items to place on the grid
import store from '../store';


const ObjectSelector = () => {

    const onObjectSelectionChange = (e: any) => {
        const value: string = e.target.value;

        store.dispatch({
            type: "path/set_object_selected",
            payload: value,
        });
    }

    return (
        <div className="inline-block">
            <select  onChange={onObjectSelectionChange}>
                <option value="W">Wall</option>
                <option value="P">Path</option>
                <option value="S">Start</option>
                <option value="E">End</option>
            </select>
        </div>
    );
}

export default ObjectSelector;
