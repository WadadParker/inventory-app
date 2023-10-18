import {Route,Routes} from "react-router-dom";

import { SideBar } from "./components/sideBar/SideBar"
import { Home } from "./pages/home/Home";
import { Items } from "./pages/items/Items";
import { Report } from "./pages/report/Report";
import { Sales } from "./pages/sales/Sales";

function App() {

  return (
    <div className="app">
      <SideBar />

      <Routes>
        <Route path="/" element={<Items />} /> 
        <Route path="/sales" element={<Sales />} /> 
        <Route path="/report" element={<Report />} /> 
      </Routes>
    </div>
  )
}

export default App
