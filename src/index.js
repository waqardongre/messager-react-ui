import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { MessagerApp } from "./MessagerApp"
import "./css/bootstrap.min.css"
import { Provider } from "react-redux"
import { store, Persistor } from "./features/store"
import { PersistGate } from "redux-persist/integration/react"


const rootElement = ReactDOM.createRoot(document.getElementById("root"))
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={ null } persistor={ Persistor }>
        <div className="container">
          <BrowserRouter>
            <MessagerApp />
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)