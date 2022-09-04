import { Link } from "react-router-dom"
import { rootRoute } from "../global"



export function NavBar(props) {
    const rootFunctions = props.params.rootFunctions
    const navigate = rootFunctions.navigateFunction
    const rootState = props.params.rootState
    const rootPagesList = rootState.rootPagesList
    const allNonHomePagesList = rootState.allNonHomePagesList
    const renderPage = rootState.renderPage

    const getActiveNavBar = (navLink, renderPage) => {
        if (navLink === "/contacts/") {
            if (renderPage === navLink) {
                return true
            }
            else if (renderPage === "/contactDetails/") {
                return true
            }
            else if (renderPage === "/composeMessage/") {
                return true
            }
        }
        else if (navLink === "/messagesSent/") {
            if (renderPage === navLink) {
                return true
            }
        }
        else {
            if (allNonHomePagesList.filter(i => i.path === renderPage).length === 0) {
                return true
            }
            else {
                return false
            }
        }
    }
    
    return (
        <nav className="navbar pt-2">
            <div className="navbar-brand"><h3>Messager</h3></div>
            <div className="pb-1 flex-row me-auto navbar-nav">
                <div className="nav-item p-1">
                    <Link to={ rootRoute + "" } onClick={() => navigate("")}>
                        <div className={"nav-link" + (getActiveNavBar(rootRoute + "", renderPage) ? " active": "")}>Home</div>
                    </Link>
                </div>
                {
                    rootPagesList.map(
                        listObj => (
                            <div className="nav-item p-1" key={listObj.path}>
                                <Link to={ rootRoute + listObj.path } onClick={() => { navigate(listObj.path) }}>
                                    <div className={"nav-link" + (getActiveNavBar(rootRoute + listObj.path, renderPage) ? " active": "")}> {listObj.label}</div>
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </nav>
    )
}