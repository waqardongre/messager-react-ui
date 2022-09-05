export function MessagesSentList(props) {
    const rootFunctions = props.params.rootFunctions
    const formatDate = rootFunctions.formatDateFunction
    const sortByDateDescending = rootFunctions.sortByDateDescendingFunction
    const getOTPFromMessage = rootFunctions.getOTPFromMessageFunction
    const rootState = props.params.rootState
    let messagesSentList = rootState.messagesSentList
    if (messagesSentList !== null) {
        messagesSentList = messagesSentList.slice().sort(sortByDateDescending)
    }
    
    const messagesSentListItems = (listObj) => {
        if (listObj !== null) {
            if (listObj.length > 0) {
                return (
                    listObj.map(
                        obj => (
                            <div className="media pt-2" key={obj._id}>
                                <div className="media-body pb-1 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="fs-5 text-greydark m-2">{obj.toFirstName + " " + obj.toLastName}</div>
                                    <div className="m-2 d-flex justify-content-between align-items-center">
                                        <div className="text-greydark mt-2">{" OTP: " + getOTPFromMessage(obj.message)}</div>
                                        <small className="form-text">{"Sent on: " + formatDate(obj.createDate)}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                )
            }
            else {
                return (
                    <div className="media pt-3">
                        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <div className="d-flex justify-content-between align-items-center w-100"></div>
                            <div><span>No messages sent!</span></div>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="media pt-3">
                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <div className="d-flex justify-content-between align-items-center w-100"></div>
                        <div><span>Loading...</span></div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <h4>Messages Sent</h4>
            <div className="my-3 bg-white rounded box-shadow">
                { messagesSentListItems(messagesSentList) }
            </div>
        </div>
    )
}