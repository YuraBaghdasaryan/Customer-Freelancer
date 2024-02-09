import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./component/Menu";
import { MyRouter } from "./router/MyRouter";

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
