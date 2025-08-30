import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const navigate = useNavigate();
    
    useEffect(() => {
        const onScroll = () => { 
            if (window.scrollY >= 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    }, []);

const Navlink = ({ to, children, onClick, active }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className={`
      ${scrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-300'} 
      ${active ? (scrolled ? 'text-gray-600' : 'text-gray-300') : ''}
      px-3 py-2 
      rounded-md 
      text-md 
      font-medium
      inline-flex 
      items-baseline
      gap-1
      transition-colors duration-200
    `}
  >
    <span className="inline-block align-baseline">{children}</span>
  </Link>
);

const handleCreateEventClick = () => {
  navigate('/login');
};

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white py-2 shadow-lg' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
               
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <span className="text-2xl font-bold text-white">EventHive</span>
                        </Link>
                    </div>
                    
                    <div className="md:flex md:items-center ">
                        <div className="flex md:space-x-10">
                            <Navlink to='/' active={activeLink === 'home'} onClick={() => { setActiveLink('home') }}>
                              Home
                            </Navlink>
                            <Navlink to='/' active={activeLink === 'discover'} onClick={() => { setActiveLink('discover') }}>
                              Discover
                            </Navlink>
                            <Navlink to='/' active={activeLink === 'myEvents'} onClick={() => { setActiveLink('myEvents') }}>
                              My Events
                            </Navlink>
                            <Navlink to='/' active={activeLink === 'testimonial'} onClick={() => { setActiveLink('testimonial') }}>
                              Testimonials
                            </Navlink>

                            <button 
                              className="bg-transparent border-white border-2 text-white px-4 py-2 rounded-md hover:bg-opacity-10 hover:bg-white transition-colors"
                              onClick={handleCreateEventClick}
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
