import { Link } from "react-router-dom"
import { rootRoute } from "../global"



export function ContactsList(props) {
    const rootState = props.params.rootState
    const contactsList = rootState.contactsList
    const rootFunctions = props.params.rootFunctions
    const setContact = (obj) => {
        rootFunctions.setContactFunction(obj)
    }
    const navigate = rootFunctions.navigateFunction

    const contactListItems = (listObj) => {
        const items = (
            listObj.map(
                obj => (
                    <div className="media pt-2" key={obj.id}>
                        <div className="media-body d-flex justify-content-between pb-1 pt-1 mb-0 small lh-125 border-bottom border-gray">
                            <div className="fs-5 pt-1">
                                {"" + obj.firstname + " " + obj.lastname}
                            </div>
                            <Link className="pb-2" to={ rootRoute + "/contactDetails/" } onClick={ () => { navigate("/contactDetails/"); setContact(obj) } }>
                                <div className="btn pb-2 pt-2 d-flex justify-content-between align-items-center w-100">
                                    <small className="">View/ Message</small>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            )
        )
        const noItems = (
            <div className="media">
                <div className="media-body small lh-125 border-bottom border-gray">
                    <div className="pt-3 pb-3 d-flex justify-content-between align-items-center w-100">
                        <div className="text-greydark">No saved contacts!</div>
                    </div>
                </div>
            </div>
        )

        const listItems = listObj.length > 0 ? items : noItems
        return listItems
    }

    return (
        <div>
            <h4>Contacts</h4>
            <div className="my-3 bg-white rounded box-shadow">
                {
                    contactListItems(contactsList)
                }
            </div>
        </div>
    )
}