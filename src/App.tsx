import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import NotFound from "./components/pages/NotFound"
import PrivateRoute from "./router/PrivateRoute"
import Register from "./components/pages/Register"
import CreateItem from "./components/pages/CreateItem"
import { routes } from "./router/routes"

function App() {
  return (
    <>
      <Routes>
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.createItem} element={
          <PrivateRoute>
            <CreateItem/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
