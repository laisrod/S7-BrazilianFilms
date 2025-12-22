import Navbar from './components/Navbar/Navbar'
import AuthListener from './components/AuthListener/AuthListener'
import AppRoutes from './routes/Routes'
import './App.css'

function App() {
  return (
    <div className="App">
      <AuthListener />
      <Navbar />
      <AppRoutes />
    </div>
  )
}

export default App