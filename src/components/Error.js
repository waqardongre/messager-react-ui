export function Error(props) {
    const rootState = props.params.rootState
    let error = ((rootState.error === null) || (rootState.error === undefined)) ? "null/undefined" : rootState.error
    console.log("Error log: " + error)
    const pageWithError = window.location.pathname
    const rootFunctions = props.params.rootFunctions
    const navigate = (pathName) => {
        rootFunctions.navigateFunction(pathName)
    }

    return (
        <div>
            <h4>Error</h4>
            <h5>
                You appear to be offline
            </h5>
            <small className="form-text">You can't use Messager until you're connected to the internet</small>
            <br></br>
            <br></br>
            <button className="btn btn-primary ps-5 pe-5" onClick={ () => navigate(pageWithError) }> Retry </button>
            <br></br>
            <br></br>
            <br></br>
            <div className="form-text fs-5">
                Engineer's stats:
            </div>
            <small className="form-text">Error object: { error.toString() }</small>
        </div>
    )
}