import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./root/index";
import "./index.css";
import store from "./redux/store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Provider store={store}>
        <Root />
      </Provider>
    </Router>
  </>
);
