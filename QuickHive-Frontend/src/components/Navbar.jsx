import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const onScroll = () => { 
            setScrolled(window.scrollY >= 50);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const Navlink = ({ href, children, onClick, active }) => (
        <a 
            href={href} 
            onClick={onClick} 
            className={`
                ${scrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-gray-300'} 
                ${active ? (scrolled ? 'text-cyan-600' : 'text-gray-300') : ''}
                px-3 py-2 
                rounded-md 
                text-md 
                font-medium
                inline-flex 
                items-center
                gap-1
                transition-colors duration-200
            `}
        >
            <span>{children}</span>
            {href !== '#home' && (
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-4 h-4"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m19.5 8.25-7.5 7.5-7.5-7.5" 
                    />
                </svg>
            )}
        </a>
    );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white py-2 shadow-lg' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home">
                            <span className={`text-2xl font-bold ${scrolled ? 'text-cyan-700' : 'text-white'} transition-colors duration-200`}>
                                EventHive
                            </span>
                        </a>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="md:flex md:items-center">
                        <div className="flex md:space-x-10 items-center">
                            <Navlink href='#home' active={activeLink === 'home'} onClick={() => setActiveLink('home')}>
                                Home
                            </Navlink>
                            <Navlink href='#discover' active={activeLink === 'discover'} onClick={() => setActiveLink('discover')}>
                                Discover
                            </Navlink>
                            <Navlink href='#myEvents' active={activeLink === 'myEvents'} onClick={() => setActiveLink('myEvents')}>
                                My Events
                            </Navlink>
                            <Navlink href='#testimonial' active={activeLink === 'testimonial'} onClick={() => setActiveLink('testimonial')}>
                                Testimonials
                            </Navlink>

                            <button 
                                className={`
                                    ${scrolled 
                                        ? 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white' 
                                        : 'border-white text-white hover:bg-white hover:text-gray-800'
                                    } 
                                    border-2 px-4 py-2 rounded-xl transition-colors duration-200 font-medium
                                `}
                                onClick={() => navigate('/login')}
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}