import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const { user } = useContext(UserContext);
    const userRole = user?.role || null;
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    // Avatar options
    const avatarOptions = [
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    ];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY >= 50);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
                setShowAvatarSelector(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-2 shadow-xl border-b border-gray-200' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home">
                            <span className={`text-2xl font-bold hover:no-underline ${scrolled ? 'text-gray-900' : 'text-white'} duration-200`}>
                                EventHive
                            </span>
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:items-center">
                        <div className="flex md:space-x-10 items-center">
                            <Navlink href='/' active={activeLink === 'home'} onClick={() => { setActiveLink('home'); navigate('/'); }}>
                                Home
                            </Navlink>
                            <Navlink href='/events' active={activeLink === 'discover'} onClick={() => { setActiveLink('discover'); navigate('/events'); }}>
                                Discover Events
                            </Navlink>
                            <Navlink href='/events' active={activeLink === 'myEvents'} onClick={() => { setActiveLink('myEvents'); navigate('/events'); }}>
                                My Events
                            </Navlink>
                            <Navlink href='#testimonial' active={activeLink === 'testimonial'} onClick={() => setActiveLink('testimonial')}>
                                Testimonials
                            </Navlink>

                            { /* Show Create Event button only if user role is 'host' */ }
                            {userRole === 'host' && (
                              <button
                                className={`
                                    ${scrolled
                                        ? 'border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
                                    }
                                    border-2 px-4 py-2 rounded-xl transition-colors duration-200 font-medium
                                `}
                                onClick={() => navigate('/login')}
                              >
                                Create Event
                              </button>
                            )}
                        </div>
                    </div>

                    {/* Profile Section - Right Side */}
                    <div className="flex items-center space-x-4" ref={dropdownRef}>
                        {/* Login Button - Show when user is not logged in */}
                        {!user && (
                            <button
                                onClick={() => navigate('/login')}
                                className={`
                                    ${scrolled
                                        ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
                                    }
                                    border-2 px-4 py-2 rounded-xl transition-colors duration-200 font-medium
                                `}
                            >
                                Sign In
                            </button>
                        )}

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                    scrolled
                                        ? 'hover:bg-gray-100 text-gray-800'
                                        : 'hover:bg-white/10 text-white'
                                }`}
                                aria-label="User Profile"
                            >
                                <div className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
                                    scrolled ? 'border-gray-300' : 'border-white/70'
                                }`}>
                                    <img
                                        src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className={`text-sm font-medium ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                    {user?.name || 'Guest'}
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        showProfileDropdown ? 'rotate-180' : ''
                                    } ${scrolled ? 'text-gray-600' : 'text-white'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Profile Dropdown Menu */}
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                                    {/* User Info Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img
                                                    src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"}
                                                    alt="Profile"
                                                    className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100"
                                                />
                                                <button
                                                    onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                                                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900">{user?.name || 'Guest User'}</h3>
                                                <p className="text-sm text-gray-600">{user?.email || 'guest@example.com'}</p>
                                                <div className="flex items-center mt-1">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        userRole === 'host'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : userRole === 'attendee'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {userRole || 'Guest'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Avatar Selector */}
                                    {showAvatarSelector && (
                                        <div className="p-4 border-b border-gray-100">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Choose Avatar</h4>
                                            <div className="grid grid-cols-6 gap-2">
                                                {avatarOptions.map((avatar, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            // Here you would update the user's avatar in the backend
                                                            console.log('Selected avatar:', avatar);
                                                            setShowAvatarSelector(false);
                                                        }}
                                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-colors duration-200"
                                                    >
                                                        <img
                                                            src={avatar}
                                                            alt={`Avatar ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setShowProfileDropdown(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>My Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/settings');
                                                setShowProfileDropdown(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Settings</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/my-events');
                                                setShowProfileDropdown(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                                            </svg>
                                            <span>My Events</span>
                                        </button>

                                        <div className="border-t border-gray-100 my-2"></div>

                                        <button
                                            onClick={() => {
                                                // Handle logout
                                                console.log('Logout clicked');
                                                setShowProfileDropdown(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
