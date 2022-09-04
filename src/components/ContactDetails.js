import { Link } from "react-router-dom"
import { rootRoute } from "../global"



export function ContactDetails(props) {
    const rootState = props.params.rootState
    const contact = rootState.contact
    const rootFunctions = props.params.rootFunctions
    const navigate = obj => rootFunctions.navigateFunction(obj)

    return (
        <div>
            <h4>Contact Details</h4>
            <div className="media pt-3">
                <div className="media-body pb-3 mb-0 small lh-125">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <div className="text-greydark">{"" + contact.firstname + " " + contact.lastname}</div>
                            <span className="d-block form-text">{" Phone: " + contact.phone}</span>
                        </div>
                        <Link to={ rootRoute + "/composeMessage/" } onClick={() => { navigate("/composeMessage/") }}>
                            <div className="btn btn-primary">Send Message</div>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}