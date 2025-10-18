import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaregiverList from './pages/CaregiverList'
import CaregiverProfile from './pages/CaregiverProfile'
import RegisterCaregiver from './pages/RegisterCaregiver'
import RegisterSenior from './pages/RegisterSenior'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/caregivers" element={<CaregiverList />} />
            <Route path="/caregiver/:id" element={<CaregiverProfile />} />
            <Route path="/register-caregiver" element={<RegisterCaregiver />} />
            <Route path="/register-senior" element={<RegisterSenior />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App