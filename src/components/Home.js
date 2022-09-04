import { Link } from "react-router-dom"
import { rootRoute } from "../global"



export function Home(props) {
    const rootState = props.params.rootState
    const rootPagesList = rootState.rootPagesList
    const rootFunctions = props.params.rootFunctions
    const navigate = rootFunctions.navigateFunction
    
    return (
        <div>
            <h4>Home</h4>
            <div className="my-3 bg-white rounded box-shadow">
                {
                    rootPagesList.map(
                        listObj => (
                            <div className="media pt-1" key={listObj.path}>
                                <div className="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
                                    <Link to={ rootRoute + listObj.path} onClick={() => { navigate(listObj.path) }}>
                                        <div className="btn d-flex justify-content-between align-items-center w-100">
                                            <div className="fs-5 text-greydark mt-2 mb-2 pb-1">{listObj.label}</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}