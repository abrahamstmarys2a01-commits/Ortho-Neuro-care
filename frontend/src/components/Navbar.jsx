import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Treatments', sectionId: 'treatments' },
    { name: 'Gallery', sectionId: 'gallery' },
    { name: 'Reviews', sectionId: 'reviews' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  // Scroll listener for sticky navbar & active section scrollspy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (!isHomePage) return;

      const sections = ['home', 'about', 'treatments', 'gallery', 'reviews', 'booking', 'contact'];
      const scrollPos = window.scrollY + 140; // 140px header clearance

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle click on nav link
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // If page loads with hash (e.g. /#reviews), scroll to it smoothly
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }
      }, 150);
    }
  }, [location]);

  return (
    <header className={`navbar ${(isScrolled || !isHomePage) ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo">
          <img src="/images/logo.png" alt="Logo" className="logo-icon-img" />
          <span className="logo-text">Ortho Neuro Care</span>
        </a>

        <nav className="nav-desktop">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={`#${link.sectionId}`}
                  className={`nav-link ${activeSection === link.sectionId ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            href="#booking"
            onClick={(e) => handleNavClick(e, 'booking')}
            className="btn btn-primary nav-btn"
          >
            Book Appointment
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={`#${link.sectionId}`}
                className={`mobile-nav-link ${activeSection === link.sectionId ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#booking"
              className="btn btn-accent w-full"
              onClick={(e) => handleNavClick(e, 'booking')}
            >
              Book Appointment
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
