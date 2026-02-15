import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Welcome from "./pages/Welcome"
import "./app.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  )
}

export default App
