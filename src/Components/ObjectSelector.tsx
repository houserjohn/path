// ObjectSelect is for allowing the client to choose between the different items to place on the grid

const ObjectSelector = () => {
    return (
        <div className="inline-block">
            <select>
                <option value="W">Wall</option>
                <option value="P">Path</option>
                <option value="S">Start</option>
                <option value="E">End</option>
            </select>
        </div>
    );
}

export default ObjectSelector;
