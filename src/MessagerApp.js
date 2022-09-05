import { useState, useEffect } from "react"
import { getContactsList } from "./services/contactService"
import { getMessagesSentList, getMessagesCount as getMessagesCountService, generateOTP, sendMessage } from "./services/messageService"
import { ContactDetails } from "./components/ContactDetails"
import { MessagesSentList } from "./components/MessagesSentList"
import { ContactsList } from "./components/ContactsList"
import { Home } from "./components/Home"
import { ComposeMessage } from "./components/ComposeMessage"
import { Error } from "./components/Error"
import { NavBar } from "./components/NavBar"
import { Routes, Route } from "react-router-dom"
import { rootRoute } from "./global"

import { useSelector, useDispatch } from "react-redux"
import {
  setState as setReduxRootStateObj,
  selectState as selectReduxRootStateObj
} from "./features/stateSlice"



export function MessagerApp() {
  
  const rootPagesList = [
    { path: "/contacts/", label: "Contacts" },
    { path: "/messagesSent/", label: "Messages Sent" }
  ]

  const allNonHomePagesList = [
    { path: "/contacts/", label: "Contacts" },
    { path: "/messagesSent/", label: "Messages Sent" },
    { path: "/contactDetails/", label: "Contact Details" },
    { path: "/composeMessage/", label: "Compose Message" },
    { path: "/error/", label: "Error" }
  ]

  const initialComposeMessageValidationObj = {
    result: true,
    messageValidation:
    {
      message: ""
    }
  }

  // Interval ids for each page
  const initialIntervalIds = {
    messagesSentIntervalIds: []
  }

  const initialRootState = {
    rootPagesList: rootPagesList,
    allNonHomePagesList: allNonHomePagesList,
    error: null,
    renderPage: "",
    contactsList: [],
    messagesSentList: null,
    contact: null,
    composeMessageSubmitted: false,
    messageSent: false,
    OTP: null,
    composeMessageValidationObj: initialComposeMessageValidationObj,
    rootStateLoaded: false,
    intervalIds: initialIntervalIds
  }

  const initialRootFunctions = {
    initializePage: (pathName) => initializePage(pathName),
    navigateFunction: (pathName) => navigateFunction(pathName),
    setErrorFunction: (errorObj) => setErrorFunction(errorObj),
    errorFunction: (errorObj) => errorFunction(errorObj),
    setRenderPageFunction: (pathName) => setRenderPageFunction(pathName),
    getContactsListFunction: () => getContactsListFunction(),
    getMessagesSentListFunction: () => getMessagesSentListFunction(),
    getMessagesCountFunction: (count) => getMessagesCountFunction(count),
    sortByDateDescendingFunction: (a, b) => sortByDateDescendingFunction(a, b),
    getOTPFromMessageFunction: (strObj) => getOTPFromMessageFunction(strObj),
    setContactFunction: (obj) => setContactFunction(obj),
    setComposeMessageSubmittedFunction: (boolObj) =>  setComposeMessageSubmittedFunction(boolObj),
    sendMessageFunction: (messageObj) => sendMessageFunction(messageObj),
    setMessageSentFunction: (messageObj) => setMessageSentFunction(messageObj),
    resetOTPFunction: () => resetOTPFunction(),
    generateOTPFunction: () => generateOTPFunction(),
    formatDateFunction: (obj) => formatDateFunction(obj),
    composeMessageValidationFunction: (obj) =>  composeMessageValidationFunction(obj),
    setComposeMessageValidationObjFunction: (obj) => setComposeMessageValidationObjFunction(obj),
    setRootStateLoadedFunction: (boolObj) => setRootStateLoadedFunction(boolObj),
    setReduxRootStateFunction: (functionObj) => setReduxRootStateFunction(functionObj),
    getReduxRootStateFunction: () => getReduxRootStateFunction(),
    setMessagesSentIntervalIdsFunction: (obj) => setMessagesSentIntervalIdsFunction(obj),
    resetMessagesSentListFunction: () => resetMessagesSentListFunction(),
    resetMessagesSentIntervalIdsTimeoutFunction: () => resetMessagesSentIntervalIdsTimeoutFunction()
  }

  const [state, setState] = useState({
    rootState: initialRootState,
    rootFunctions: initialRootFunctions
  })

  // getting reduxRootState on page back navigate
  window.onpopstate = ()=> {
    let pathName = window.location.pathname
    const pathNameSplits = pathName.split("/")
    pathName = pathNameSplits[pathNameSplits.length - 2]
    pathName = "/" + pathName + "/"
    state.rootFunctions.setRenderPageFunction(pathName)
  }

  //intervals for checking data like messagesSent list updated or not on the server data base.
  useEffect(() => {
    const messagesSentList = state.rootState.messagesSentList
    const intervalIds = state.rootState.intervalIds
    const messagesSentIntervalIds = intervalIds.messagesSentIntervalIds
    const messagesSentIntervalIdsLength = messagesSentIntervalIds.length
    const setMessagesSentIntervalIds = (newObj) => setMessagesSentIntervalIdsFunction(newObj)
    const renderPage = state.rootState.renderPage
    const getMessagesCount = (count) => {
      state.rootFunctions.getMessagesCountFunction(count)
    }
    const interval = 2000
    const startMessagesCountInterval = () => {
      const currentMessagesSentListCount = messagesSentList.length
      const startMessagesCountIntervalId = setInterval(() => {
          getMessagesCount(currentMessagesSentListCount)
          let newMessagesSentIntervalIds = Object.assign([], messagesSentIntervalIds)
          newMessagesSentIntervalIds.push(startMessagesCountIntervalId)
          setMessagesSentIntervalIds(newMessagesSentIntervalIds)
        },
        interval
      )
    }
    if (renderPage === "/messagesSent/" && messagesSentList !== null && messagesSentIntervalIdsLength === 0) {
      startMessagesCountInterval()
    }
    else {
      if (renderPage !== "/messagesSent/" && messagesSentIntervalIdsLength > 0) {
        messagesSentIntervalIds.map((messagesSentIntervalId) => {
            clearInterval(messagesSentIntervalId)
            return messagesSentIntervalId
          }
        )
      }
    }

    // Define other intervals for other pages if needed here only
    
  })

  // Getting reduxRootState on page reload and updating it on every rootState update
  useEffect(
    () => {
      if (state.rootState.rootStateLoaded) {
        state.rootFunctions.setReduxRootStateFunction(state.rootState)
      }
      else {
        state.rootFunctions.getReduxRootStateFunction()
      }
    },
    [state] // Equalent to [state.rootState] because we never updated state.rootFunctions
  )

  const reduxRootState = useSelector(selectReduxRootStateObj)
  const dispatch = useDispatch()
  const setReduxRootState = (currentState) => dispatch(setReduxRootStateObj(currentState))
  const getReduxRootState = () => {
    if (reduxRootState !== null) {
      return reduxRootState
    }
    else {
      return null
    }
  }

  const setReduxRootStateFunction = (stateObj) => {
    setReduxRootState(stateObj)
  }

  const getReduxRootStateFunction = () => {
    let reduxRootState = getReduxRootState()
        
    if (reduxRootState !== null) {
  
      // All JS intervals are destroyed on page reload so state intervalIds too.
      reduxRootState.intervalIds = initialIntervalIds

      setState(previousState => {
        return { 
          ...previousState,
          rootState: reduxRootState
        }
      })
    }
  }
  
  const navigateFunction = (pathName) => {
    state.rootFunctions.setRenderPageFunction(pathName)
  }

  const setMessagesSentIntervalIdsFunction = (newObj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          intervalIds: {
            ...previousState.rootState.intervalIds,
            messagesSentIntervalIds: newObj
          }
        }
      }
    })
  }

  const setRootStateLoadedFunction = (boolObj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          rootStateLoaded: boolObj
        }
      }
    })
  }

  const setRenderPageFunction = (pathName) => {
    const renderPageObj = pathName
    setState(previousState => {
      return { 
        ...previousState, 
        rootState: {
          ...previousState.rootState,
          renderPage: renderPageObj
        }
      }
    })
    state.rootFunctions.initializePage(pathName)
  }

  const getMessagesSentListFunction = () => {
    getMessagesSentList()
    .then(response => {
      if (response.name !== 'TypeError') {
        const messagesSentList = response
        setState(previousState => {
          return { 
            ...previousState,
            rootState: {
              ...previousState.rootState,
              messagesSentList: messagesSentList
            }
          }
        })
      }
      else {
        state.rootFunctions.errorFunction(response)
      }
    })
  }

  const getMessagesCountFunction = (currentMessagesSentListCount) => {
    getMessagesCountService()
    .then(response => {
      if (response.name !== 'TypeError') {
        const actualMessagesCount = response
        if (currentMessagesSentListCount < actualMessagesCount) {
          state.rootFunctions.getMessagesSentListFunction()
        }
      }
      else {
        state.rootFunctions.errorFunction(response)
      }
    })
  }

  const getContactsListFunction = () => {
    getContactsList()
    .then(response => {
      setState(previousState => {
        return {
          ...previousState,
          rootState: {
            ...previousState.rootState,
            contactsList: response
          }
        }
      })
    })
  }

  const setContactFunction = (obj) => {
    setState(previousState => {
      return {
        ...previousState,
        rootState: {
          ...previousState.rootState,
          contact: obj
        }
      }
    })
  }

  const resetOTPFunction = () => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          OTP: null
        }
      }
    })
  }

  const generateOTPFunction = () => {
    generateOTP()
    .then(response => {
      setState(previousState => {
        return { 
          ...previousState,
          rootState: {
            ...previousState.rootState,
            OTP: response
          }
        }
      })
    })
  }

  const sendMessageFunction = (messageObj) => {
    sendMessage(messageObj)
    .then(response => {
      if (response.name !== 'TypeError') {
        if (response !== undefined) {
          if (response.length === 2) {
            if (response[1].message !== undefined) {
              state.rootFunctions.setMessageSentFunction(true)
            }
          }
        }
      }
      else {
        state.rootFunctions.errorFunction(response)  
      }
    })
  }

  const setComposeMessageSubmittedFunction = (boolObj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          composeMessageSubmitted: boolObj
        }
      }
    })
  }

  const setMessageSentFunction = (boolObj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          messageSent: boolObj
        }
      }
    })
  }

  const setErrorFunction = (errorObj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          error: errorObj
        }
      }
    })
  }

  const errorFunction = (errorObj) => {
    state.rootFunctions.setErrorFunction(errorObj)
    state.rootFunctions.navigateFunction("/error/")
  }

  const formatDateFunction = (dateObj) => { // format like: 30-Dec-2000 12:60 AM/PM
    var newDate = new Date(dateObj);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    var sMonth = monthNames[newDate.getMonth()]
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sAMPM = "AM";
    var iHourCheck = parseInt(sHour);
    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
      sHour = "12";
    }
    sHour = padValue(sHour);
    function padValue(value) {
      return (value < 10) ? "0" + value : value;
    }
    return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
  }

  const sortByDateDescendingFunction = (a, b) => {
    var dateA = new Date(a.createDate).getTime()
    var dateB = new Date(b.createDate).getTime()
    return dateA > dateB ? -1 : 1
  }

  const getOTPFromMessageFunction = (strObj) => {
      const OTP = strObj.match(/\d{6}/)[0]
      return OTP
  }

  const composeMessageValidationFunction = (formObj) => {
    let obj = {
      result: true,
      messageValidation: {
        message: ""
      }
    }
    const message = formObj.msg
    if (!((/\d{6}/).test(message))) {
      let valMessage = "Message should contain a 6 digit OTP!"
      obj = {
        result: false,
        messageValidation: {
          message: valMessage
        }
      }
      return obj
    }
    return obj
  }

  const setComposeMessageValidationObjFunction = (obj) => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          composeMessageValidationObj: obj
        }
      }
    })
  }

  const resetMessagesSentListFunction = () => {
    setState(previousState => {
      return { 
        ...previousState,
        rootState: {
          ...previousState.rootState,
          messagesSentList: null
        }
      }
    })
  }

  const resetMessagesSentIntervalIdsTimeoutFunction = () => {
    const timeout = 2010
    setTimeout(() => {
      const initialMessagesSentIntervalIds = []
      state.rootFunctions.setMessagesSentIntervalIdsFunction(initialMessagesSentIntervalIds)
    }, timeout);
  }

  const initializePage = (currentpathName) => {
    const currentPathName = currentpathName
    const isCurrentPath = (pathName) => {
      return currentPathName === pathName
    }
    if (isCurrentPath("/messagesSent/")) {
      state.rootFunctions.getMessagesSentListFunction()
    }
    if (isCurrentPath("/contacts/")) {
      state.rootFunctions.getContactsListFunction()
    }
    if (isCurrentPath("/contactDetails/")) {
    }
    if (isCurrentPath("/composeMessage/")) {
      state.rootFunctions.generateOTPFunction()
      state.rootFunctions.setComposeMessageSubmittedFunction(false)
      state.rootFunctions.setMessageSentFunction(false)
    }
    if (isCurrentPath("/error/")) {
    }
    if (isCurrentPath("")) { //Home page
    }
    if (!isCurrentPath("/composeMessage/") && (state.rootState.OTP !== null)) {
      state.rootFunctions.resetOTPFunction()
    }
    if (!isCurrentPath("/error/")) {
      state.rootFunctions.setErrorFunction(null)
    }
    if (!isCurrentPath("/messagesSent/")) {
      // Resetting messagesSentIntervalIds with Timeout bigger than intervals
      state.rootFunctions.resetMessagesSentIntervalIdsTimeoutFunction()

      // resetting messagesSentList on leaving messagesSentList page or on going to error page on error
      state.rootFunctions.resetMessagesSentListFunction()
    }
    
    state.rootFunctions.setRootStateLoadedFunction(true)
  }

  return (
      <div>
        
        <NavBar params={ state } />
        
        <hr className="mt-0 pt-0" />

        <Routes>
          <Route exact path={ rootRoute + "/*" } element= { state.rootState.renderPage !== "/error/" ? <Home params={state} /> : <></> }/>
          <Route path={ rootRoute + "/messagesSent/" } element={ state.rootState.renderPage === "/messagesSent/" ? <MessagesSentList params={state} /> : <></> } />
          <Route path={ rootRoute + "/contacts/" } element={ state.rootState.renderPage === "/contacts/" ? <ContactsList params={state} /> : <></> } />
          <Route path={ rootRoute + "/contactDetails/" } element={ state.rootState.renderPage === "/contactDetails/" ? <ContactDetails params={state} /> : <></> } />
          <Route path={ rootRoute + "/composeMessage/" } element={ state.rootState.renderPage === "/composeMessage/" ? <ComposeMessage params={state} /> : <></> } />
        </Routes>
      
        { state.rootState.renderPage === "/error/" && state.rootState.error !== null && state.rootState.error !== undefined ? <Error params={state} /> : <></> }
              
      </div>
    )
}