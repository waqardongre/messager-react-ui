export function Error(props) {
    const rootState = props.params.rootState
    let error = ((rootState.error === null) || (rootState.error === undefined)) ? "null/undefined" : rootState.error
    console.log("Error log: " + error)

    return (
        <div>
            <h4>Error</h4>
            <h5>
                You appear to be offline
            </h5>
            <small className="form-text">You can't use Messager until you're connected to the internet</small>
            <br></br>
            <br></br>
            <br></br>
            <strong className="form-text">
                More details
            </strong>
            <br></br>
            <small className="form-text">Error object: { error.toString() }</small>
        </div>
    )
}