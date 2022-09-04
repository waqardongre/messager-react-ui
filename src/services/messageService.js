import { apiURL } from "../global"



export async function generateOTP() {
    const OTP = Math.floor(100000 + Math.random() * 900000)
    return OTP
}

export async function getMessagesSentList() {
    let response
    await fetch(apiURL + "/api/getMessages")
    .then(res => {
        response = res.json()
    })
    .catch(error => {
        console.log('There was an error in messageService.js getMessagesSentList()!', error);
        response = error
    })
    return response
}

export async function sendMessage(Message) {
    let response
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Message: Message })
    }
    await fetch(apiURL + "/api/sendMessage", requestOptions)
    .then(res => {
        response = res.json()
    })
    .catch(error => {
        console.log('There was an error in messageService.js sendMessage(Message)!', error);
        response = error
    })
    return response
}

export async function getMessagesCount() {
    let response
    await fetch(apiURL + "/api/getMessagesCount")
    .then(res => {
        response = res.json()
    })
    .catch(error => {
        console.log('There was an error in messageService.js getMessagesCount()!', error);
        response = error
    })
    return response
}