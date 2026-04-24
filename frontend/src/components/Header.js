import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, Activity, Info, X, LogOut, Link2, Crown, BriefcaseBusiness, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const HoverDropdownMenu1 = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li className="dropdown-container1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <a href="/"><BriefcaseBusiness size={18}/> Services</a>
      {isHovered && (
        <ul className="dropdown-menu1">
          <li className="drop-menu"><a className="dmn" href='/telemedicine'>Telemedicine</a></li>
          <li className="drop-menu"><a className="dmn" href='/diagnosis'>AI Diagnosis</a></li>
          <li className="drop-menu"><a className="dmn" href='/medstore'>Medical Store</a></li>
          <li className="drop-menu"><a className="dmn" href='/lab-tests'>Schedule Test</a></li>
        </ul>
      )}
    </li>
  );
};

const HoverDropdownMenu2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li className="dropdown-container1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <a href="/"><Crown size={18}/> Premium Services</a>
      {isHovered && (
        <ul className="dropdown-menu1">
          <li className="drop-menu"><a className="dmn" href='/premium'>Learn More</a></li>
          <li className="drop-menu"><a className="dmn" href='/under-construction'>Detailed Report</a></li>
          <li className="drop-menu"><a className="dmn" href='/under-construction'>Chat with Doctor</a></li>
          <li className="drop-menu"><a className="dmn" href='/diet'>Personalized Health/Diet Plan</a></li>
        </ul>
      )}
    </li>
  );
};

const HoverDropdownMenu3 = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li className="dropdown-container1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <a href="/"><Link2 size={18}/> Quick Links</a>
      {isHovered && (
        <ul className="dropdown-menu1">
          <li className="drop-menu"><a className="dmn" href='/medical-history'>Medical History</a></li>
          <li className="drop-menu"><a className="dmn" href='/appointment-booking'>Direct Appointment Booking</a></li>
          <li className="drop-menu"><a className="dmn" href='/donation-dashboard'>Donations</a></li>
          <li className="drop-menu"><a className="dmn" href='/first-aid'>Basic First Aid</a></li>
          <li className="drop-menu"><a className="dmn" href='/depression-test'>Are You Depressed?</a></li>
          <li className="drop-menu"><a className="dmn" href='/feedback'>Feedback</a></li>
        </ul>
      )}
    </li>
  );
};

const Header = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [dashboardLink, setDashboardLink] = useState('/dashboard');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768 && isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const hospitalToken = localStorage.getItem('hospitalToken');
      const doctorToken = localStorage.getItem('doctorToken');
      const storedUserName = localStorage.getItem('userName');

      if (storedUserName && (token || hospitalToken || doctorToken)) {
        setIsLoggedIn(true);
        setUserName(storedUserName);

        // Determine dashboard link based on role
        const role = localStorage.getItem('role');
        if (doctorToken) setDashboardLink('/doctor-dashboard');
        else if (hospitalToken) setDashboardLink('/hospital-dashboard');
        else if (role === 'admin' || role === 'super_admin') setDashboardLink('/admin-dashboard');
        else setDashboardLink('/dashboard');
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setDashboardLink('/dashboard');
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    ['token','hospitalToken','doctorToken','userName','role','doctorName','doctorSpecialization','doctorHospitalName','doctorHospitalId'].forEach(k => localStorage.removeItem(k));
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <img src="/Medicare_Logo.svg" alt="Medicare Logo"/>
        </div>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          {isMenuOpen && (
            <button className="close-menu" onClick={closeMenu} aria-label="Close menu"><X size={24} /></button>
          )}
          <ul>
            <li><Link to="/" onClick={closeMenu}><Activity size={18} /> Home</Link></li>
            <li><Link to='/aboutus' onClick={closeMenu}><Info size={18} /> About</Link></li>
            <HoverDropdownMenu1/>
            <HoverDropdownMenu2/>
            <HoverDropdownMenu3/>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu"><Menu size={24} /></button>
          {isLoggedIn ? (
            <div className="user-info">
              <Link to={dashboardLink} className="dashboard-link" title="Go to Dashboard">
                <LayoutDashboard size={18} />
                <span className="user-name">{userName}</span>
              </Link>
              <button className="logout-button" onClick={handleLogout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
          )}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;