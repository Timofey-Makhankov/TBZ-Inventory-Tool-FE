import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"

function App() {
  return (
    <>
      <Routes>
        <Route index element={ <Home/> }/>
        <Route path="login" element={ <Login/> }/>
        <Route path="register" element={ <></> } />
        <Route path="*" element={ <></> }/>
      </Routes>
    </>
  )
}
export default App
