import {Route,Routes} from "react-router-dom";

import { SideBar } from "./components/sideBar/SideBar"


function App() {

  return (
    <div className="app">
      <SideBar />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} /> 
        <Route path="/items" element={<h1>Items</h1>} /> 
        <Route path="/sales" element={<h1>Sales</h1>} /> 
        <Route path="/report" element={<h1>Report</h1>} /> 
      </Routes>
    </div>
  )
}

export default App
