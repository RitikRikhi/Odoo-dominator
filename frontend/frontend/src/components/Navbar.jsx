import { useEffect, useState } from "react";


export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
    
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

const Navlink = ({ href, children, onClick, active }) => (
  <a 
    href={href} 
    onClick={onClick} 
    className={`
      ${active ? 'text-gray-300' : 'text-white'} 
      hover:text-gray-300
      px-3 py-2 
      rounded-md 
      text-md 
      font-medium
      inline-flex 
      items-baseline  // This ensures baseline alignment
      gap-1          // Adds small spacing between text and icon
    `}
  >
    <span className="inline-block align-baseline">{children}</span>
    {href !== '#home' && (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-4 h-4 inline-block align-baseline" // Key alignment classes
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
               
                    <div className="flex-shrink-0">
                        <a href="#home">
                            <img src="null" alt="EventHive"/>
                        </a>
                    </div>
                    
              
                    <div className="md:flex md:items-center ">
                        <div className="flex md:space-x-10">
                            <Navlink href='#home' active={activeLink === 'home'} onClick={() => { setActiveLink('home') }}
                              >Home</Navlink>
                            <Navlink  href='#services' active={activeLink === 'discover'} onClick={() => { setActiveLink('discover') }}>Discover
</Navlink>
                            <Navlink href='#myEvents' active={activeLink === 'myEvents'} onClick={() => { setActiveLink('myEvents') }}>My Events</Navlink>
                            <Navlink href='#testimonial' active={activeLink === 'testimonial'} onClick={() => { setActiveLink('testimonial') }}>Testimonials</Navlink>

                            <button className="bg-"> Create Event</button>
                        </div>
                    </div>
                    
                    
               
                    
                </div>
            </div>
        </nav>
    )
}