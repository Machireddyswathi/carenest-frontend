import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CN</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">CareNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/caregivers" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Find Caregivers
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              Login
            </Link>
            <Link to="/register-caregiver" className="btn-primary">
              Become a Caregiver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              Home
            </Link>
            <Link to="/caregivers" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              Find Caregivers
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              Contact
            </Link>
            <Link to="/login" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              Login
            </Link>
            <Link to="/register-caregiver" className="block btn-primary text-center">
              Become a Caregiver
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header