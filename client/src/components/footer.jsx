import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#1E90FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CN</span>
              </div>
              <span className="text-2xl font-bold text-white">CareNest</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting seniors with trusted caregivers to provide compassionate,
              reliable care in the comfort of their own homes.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/swathi5854"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.4 6.3 7.9V24h-5V16c0-1.9 0-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.3V24h-5V8z" />
                </svg>
              </a>

              {/* Mail */}
              <a
                href="mailto:machireddyswathi90@gmail.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/swathi_2356_?igsh=bmw3djJmbDlheXYy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.6.5.3.8.7 1.1 1.1.3.4.5 1.1.6 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.6 2.3-.3.5-.7.8-1.1 1.1-.4.3-1.1.5-2.3.6-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.6-.5-.3-.8-.7-1.1-1.1-.3-.4-.5-1.1-.6-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.6-2.3.3-.5.7-.8 1.1-1.1.4-.3 1.1-.5 2.3-.6C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0 5.7 0 4.7.1 3.8.3 2.9.6 2.1 1 1.4 1.7.7 2.4.3 3.2.1 4.1 0 5 0 6 0 7.3 0 8.7 0 9.1 0 12s0 3.3.1 4.7c.1 1.3.3 2.3.5 3.2.3.9.7 1.7 1.4 2.4.7.7 1.5 1.1 2.4 1.4.9.3 1.9.5 3.2.5 1.3.1 1.7.1 4.9.1s3.6 0 4.9-.1c1.3-.1 2.3-.3 3.2-.5.9-.3 1.7-.7 2.4-1.4.7-.7 1.1-1.5 1.4-2.4.3-.9.5-1.9.5-3.2.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9c-.1-1.3-.3-2.3-.5-3.2-.3-.9-.7-1.7-1.4-2.4C21.7 1 20.9.6 20 .3 19.1.1 18.1 0 16.8 0 15.5 0 15.1 0 12 0z" />
                  <path d="M12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 1 0 12 5.8zm0 10.3A4.1 4.1 0 1 1 12 7.7a4.1 4.1 0 0 1 0 8.4zM18.4 4.6a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Machireddyswathi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.63-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.24a11.45 11.45 0 016 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.85 1.24 1.93 1.24 3.25 0 4.63-2.81 5.66-5.49 5.96.43.37.82 1.09.82 2.2v3.26c0 .32.22.7.83.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/caregivers" className="hover:text-primary-500 transition-colors">Find Caregivers</Link></li>
              <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Caregivers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Caregivers</h3>
            <ul className="space-y-2">
              <li><Link to="/register-caregiver" className="hover:text-primary-500 transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-primary-500 transition-colors">Login</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-500 transition-colors">Dashboard</Link></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CareNest. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <p className="mt-2 text-sm">
            Developed by{" "}
            <a
              href="https://github.com/Machireddyswathi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Swathi Machireddy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
