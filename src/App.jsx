import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserDashboard from './components/dashboard/UserDashboard'
// import Profile from './pages/Profile'
import ProtectedRoute from './components/auth/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard/>
                  </ProtectedRoute>
                } 
              />
             
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App