import { useForm } from "react-hook-form"



export function ComposeMessage(props) {
    const rootFunctions = props.params.rootFunctions
    const sendMessage = (messageObj) => rootFunctions.sendMessageFunction(messageObj)
    const setComposeMessageSubmitted = rootFunctions.setComposeMessageSubmittedFunction
    const composeMessageValidation = (obj) => rootFunctions.composeMessageValidationFunction(obj)
    const setComposeMessageValidationObj = (obj) => rootFunctions.setComposeMessageValidationObjFunction(obj)

    const rootState = props.params.rootState
    const contact = rootState.contact
    const OTP = rootState.OTP
    const composeMessageSubmitted = rootState.composeMessageSubmitted
    const messageSent = rootState.messageSent
    const composeMessageValidationObj = rootState.composeMessageValidationObj



    const msg = "Hi. Your OTP is: " + OTP
    const toFirstName = contact.firstname
    const toLastName = contact.lastname
    const to = contact.phone

    const { register, handleSubmit } = useForm();
    const onSubmit = messageObj => {
        const ValidationObj = composeMessageValidation(messageObj)
        setComposeMessageValidationObj(ValidationObj)
        if (ValidationObj.result) {
            setComposeMessageSubmitted(true)
            messageObj.toFirstName = toFirstName
            messageObj.toLastName = toLastName
            messageObj.to = to
            sendMessage(messageObj)
        }
    }

    if (OTP != null) {
        return (
            <div>
                <h4>Compose</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mt-2">
                        <div className="row">
                            <div className="col-3">
                                <label aria-describedby="toPhone">To:</label>
                            </div>
                            <div className="col-9">
                                <div id="toPhone" className="text-greydark m-0 p-0">{toFirstName + " " + toLastName}</div>
                                <small id="toPhone" className="form-text text-muted">{to}</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <div className="row">
                            <div className="col-3">
                                <label> {" Message: "} </label>
                            </div>
                            <div className="col-9">
                                <textarea className="form-control" id="msg" {...register("msg")} defaultValue={msg} rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <div className="row">
                            <div className="col-7">
                                <button type="submit" className="btn btn-primary" aria-describedby="messageSubmitBtn" disabled={ composeMessageSubmitted }> { messageSent ? "Message Sent !" : (composeMessageSubmitted? "Sending..." : "Send") } </button>
                                <br></br>
                                <small className="mt-2">
                                    {   
                                        composeMessageValidationObj.result === false 
                                        ? 
                                        <strong id="messageSubmitBtn" className="form-text text-danger">{ composeMessageValidationObj.messageValidation.message }</strong> 
                                        : 
                                        <></>
                                    }
                                    { 
                                        messageSent 
                                        ? 
                                        <strong id="messageSubmitBtn" className="form-text text-success">Your message sent successfully !</strong> 
                                        :
                                        <></> 
                                    }
                                </small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    else {
        return (<></>)
    }
}