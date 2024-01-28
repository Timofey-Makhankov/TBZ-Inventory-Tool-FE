import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import NotFound from "./components/pages/NotFound"
import PrivateRoute from "./router/PrivateRoute"
import Register from "./components/pages/Register"

function App() {
  return (
    <>
      <Routes>
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
