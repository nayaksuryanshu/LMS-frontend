import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Chatbot from './pages/Chatbot'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserDashboard from './components/dashboard/UserDashboard'
import CourseDetail from './pages/CourseDetail'
import MyCourses from './pages/MyCourses'
import CourseCatalog from './pages/CourseCatalog'
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
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/chatbot" element={<Chatbot/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/courses" element={<CourseCatalog/>} />
              <Route path="/courses/:id" element={<CourseDetail/>} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard/>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-courses" 
                element={
                  <ProtectedRoute>
                    <MyCourses/>
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