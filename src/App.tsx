import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import NotFound from "./components/pages/NotFound"

function App() {
  return (
    <>
      <Routes>
      <Route index element={ <Home/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/register" element={ <></> } />
        <Route path="*" element={ <NotFound/> }/>
      </Routes>
    </>
  )
}
export default App
