import store from '../store';

const AlgorithmSelector = () => {

    const onAlgorithmSelectionChange = (e: any) => {
        store.dispatch({
            type: "path/set_current_algorithm",
            payload: e.target.value,
        });        
    }

    return (
        <div className="inline-block">
            <select  onChange={onAlgorithmSelectionChange}>
                <option value="BFS">BFS</option>
                <option value="DFS">DFS</option>
                <option value="Dijkstra">Dijkstra's</option>
                <option value="A*">A*</option>
            </select>     
       </div>

    );
}

export default AlgorithmSelector;