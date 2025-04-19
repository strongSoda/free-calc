import React, { useState, useEffect } from 'react';
import { AlertCircle, Calendar, Code, CheckCircle, Send, ChevronRight, Palette, Smartphone, Laptop, 
  Globe, Trophy, ChevronDown, User, ExternalLink, Rocket, Zap, Award, Clock, Target, Sparkles, 
  FileText, DollarSign, Gift, Menu, X} from 'lucide-react';

// CSS Styles
const styles = {
  '@import': "url('https://fonts.googleapis.com/css2?family=Montez&family=Montserrat:ital,wght@0,500;0,700;0,900;1,500;1,700&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')",
};

const HackathonLandingPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [activeThemeTab, setActiveThemeTab] = useState(0);
  const [accordionState, setAccordionState] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date('April 30, 2025').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({
          days: '0',
          hours: '0',
          minutes: '0',
          seconds: '0'
        });
      } else {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const toggleAccordion = (index) => {
    setAccordionState(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Create a Stripe customer
  const createCustomer = async (email) => {
    try {
      const stripeApiKey = import.meta.env.PUBLIC_STRIPE_SECRET_KEY; // This would be handled securely on backend
      const response = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeApiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
      throw new Error('Failed to create customer');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('Processing registration...');
    setMessageType('info');

    try {
      // Create a customer in Stripe first
      const customer = await createCustomer(email);
      const cusId = customer.id || `cus_${Math.random().toString(36).substring(2, 10)}`;
      const price = 'price_1RFW2WSJy4iMiCE3HYbLNobe';
      const successUrl = 'https://forms.gle/1psaBNADWoxwa6Eq8';
      const cancelUrl = window.location.origin + '/hackathon';

      // Redirect to Stripe checkout
      const checkoutResponse = await fetch(
        `https://spiff.guru/create-checkout-session/${cusId}/${price}/${email}?` +
        `successurl=${encodeURIComponent(successUrl)}&cancelurl=${encodeURIComponent(cancelUrl)}&price=${encodeURIComponent(price)}`
      );
      
      if (!checkoutResponse.ok) {
        throw new Error('Unable to create checkout session. Please try again.');
      }
      
      const session = await checkoutResponse.json();
      if (session?.sessionUrl) {
        window.location.href = session.sessionUrl;
      } else {
        throw new Error('Invalid checkout session. Please try again.');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
      setLoading(false);
    }
  };

  // Challenge themes
  const themes = [
    {
      title: "Interactive Data Dashboard",
      description: "Create a responsive dashboard featuring interactive charts, filterable data tables, and real-time data visualization. Focus on performance and user customization options.",
      level: "Intermediate-Advanced"
    },
    {
      title: "E-commerce Product Customizer",
      description: "Build a product customization interface that allows users to personalize items with real-time preview, multiple customization options, and a smooth checkout flow.",
      level: "Intermediate"
    },
    {
      title: "Collaborative Whiteboard Tool",
      description: "Develop a whiteboard application that enables multiple users to draw, add notes, and organize ideas together. Implement features like drawing tools, sticky notes, and shape creation.",
      level: "Advanced"
    },
    {
      title: "Immersive Media Player",
      description: "Design a modern media player with advanced features like picture-in-picture, custom playlists, subtitles support, and an intuitive interface that works across device sizes.",
      level: "Intermediate-Advanced"
    }
  ];
  
  // About cards
  const aboutCards = [
    {
      icon: <Globe size={42} />,
      title: "Global & Virtual",
      description: "Connect with frontend developers from around the world. Participate from anywhere with an internet connection."
    },
    {
      icon: <Code size={42} />,
      title: "Build Amazing UIs",
      description: "Unleash your creativity and technical skills to develop beautiful, functional, and responsive interfaces."
    },
    {
      icon: <Trophy size={42} />,
      title: "Win Great Prizes",
      description: "Compete for a $2,000 grand prize! Plus, 5 outstanding submissions will each receive $150 Amazon gift cards."
    }
  ];
  
  // Timeline events
  const timelineEvents = [
    {
      date: "April 1, 2025",
      title: "Registration Opens",
      description: "Register early to secure your spot and begin planning your project.",
      icon: <Calendar size={22} />
    },
    {
      date: "April 30, 2025",
      title: "Submission Deadline",
      description: "Submit your project by 11:59 PM UTC. Late submissions will not be accepted.",
      icon: <Clock size={22} />
    },
    {
      date: "May 1-4, 2025",
      title: "Judging Period",
      description: "Our panel of experts will evaluate all submissions based on functionality, design, and responsiveness.",
      icon: <Target size={22} />
    },
    {
      date: "May 5, 2025",
      title: "Winners Announced",
      description: "Winners will be announced on our website and notified via email.",
      icon: <Award size={22} />
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: "Who can participate in the hackathon?",
      answer: "Anyone interested in frontend development can participate! Whether you're a professional developer, student, or hobbyist, as long as you have frontend skills and creativity, you're welcome to join our monthly challenge."
    },
    {
      question: "What prizes can I win?",
      answer: "The grand prize winner will receive $2,000 cash. Additionally, we'll select 5 outstanding submissions to receive $150 Amazon gift cards each. Winners will also be featured on our website and social media channels."
    },
    {
      question: "Can I use UI libraries or frameworks?",
      answer: "Yes, you can use any CSS frameworks, UI libraries, or JavaScript frameworks. The focus is on how you implement and customize them to create a unique and functional interface."
    },
    {
      question: "Do I need to implement a backend?",
      answer: "No, this is a frontend-focused hackathon. You can use mock data or public APIs to simulate backend functionality. We're evaluating your UI/UX skills, not backend implementation."
    },
    {
      question: "How should I submit my project?",
      answer: "You can submit a working URL where judges can interact with your project, and a comprehensive screen recording demonstrating all features."
    },
    {
      question: "Can I use AI tools during development?",
      answer: "Yes, AI tools are allowed for assistance, but you must understand and be able to explain all code in your submission. The final project must be your own work."
    },
    {
      question: "Will I receive feedback on my submission?",
      answer: "Yes, all participants will receive general feedback on their submissions after the results are announced on April 30th."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-raleway overflow-x-hidden">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" id="progress-bar"></div>
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">HACK FRONTEND</a>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#about" className="text-white hover:text-yellow-400 transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all">About</a></li>
              <li><a href="#prizes" className="text-white hover:text-yellow-400 transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all">Prizes</a></li>
              <li><a href="#themes" className="text-white hover:text-yellow-400 transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all">Themes</a></li>
              <li><a href="#timeline" className="text-white hover:text-yellow-400 transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all">Timeline</a></li>
              <li><a href="#faq" className="text-white hover:text-yellow-400 transition-colors relative after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-orange-500 after:bottom-0 after:left-0 hover:after:w-full after:transition-all">FAQ</a></li>
              <li><a href="#register" className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5">Register</a></li>
            </ul>
          </nav>
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-gray-800 shadow-lg shadow-black/50 z-50">
            <nav className="container mx-auto px-6 py-4">
              <ul className="flex flex-col space-y-4">
                <li><a href="#about" onClick={closeMobileMenu} className="block py-2 text-white hover:text-yellow-400 transition-colors">About</a></li>
                <li><a href="#prizes" onClick={closeMobileMenu} className="block py-2 text-white hover:text-yellow-400 transition-colors">Prizes</a></li>
                <li><a href="#themes" onClick={closeMobileMenu} className="block py-2 text-white hover:text-yellow-400 transition-colors">Themes</a></li>
                <li><a href="#timeline" onClick={closeMobileMenu} className="block py-2 text-white hover:text-yellow-400 transition-colors">Timeline</a></li>
                <li><a href="#faq" onClick={closeMobileMenu} className="block py-2 text-white hover:text-yellow-400 transition-colors">FAQ</a></li>
                <li className="pt-2">
                  <a href="#register" onClick={closeMobileMenu} className="block w-full px-4 py-3 text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium">Register Now</a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-24 md:pt-32 bg-radial-at-t from-orange-950/20 via-gray-900 to-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Monthly Frontend Hackathon
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:pr-12">
              Showcase your UI skills and compete for $2,000! Build beautiful, functional, and responsive interfaces.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700">
                <Calendar className="mr-3 text-yellow-400" size={20} />
                <span>Deadline: April 30, 2025</span>
              </div>
              <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700">
                <Award className="mr-3 text-yellow-400" size={20} />
                <span>$2,000 Grand Prize</span>
              </div>
            </div>
            <a href="#register" className="btn btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transform transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Register Now
              <ChevronRight size={22} />
            </a>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Abstract shapes animation */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
              
              {/* Code showcase mockup */}
              <div className="relative flex flex-col bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="flex items-center bg-gray-900 px-4 py-2 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-500">index.js</div>
                </div>
                <div className="p-5 text-left font-mono text-sm overflow-hidden">
                  <p><span className="text-pink-400">import</span> <span className="text-blue-400">React</span> <span className="text-pink-400">from</span> <span className="text-green-400">'react'</span>;</p>
                  <p><span className="text-pink-400">import</span> <span className="text-blue-400">&#123; motion &#125;</span> <span className="text-pink-400">from</span> <span className="text-green-400">'framer-motion'</span>;</p>
                  <p>&nbsp;</p>
                  <p><span className="text-pink-400">const</span> <span className="text-yellow-400">Hero</span> <span className="text-pink-400">=</span> <span className="text-purple-400">()</span> <span className="text-pink-400">=></span> <span className="text-purple-400">&#123;</span></p>
                  <p>&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-purple-400">(</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;motion.div</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">initial</span><span className="text-blue-400">=</span><span className="text-purple-400">&#123;</span> <span className="text-yellow-400">opacity:</span> <span className="text-blue-400">0</span> <span className="text-purple-400">&#125;</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">animate</span><span className="text-blue-400">=</span><span className="text-purple-400">&#123;</span> <span className="text-yellow-400">opacity:</span> <span className="text-blue-400">1</span> <span className="text-purple-400">&#125;</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">className</span><span className="text-blue-400">=</span><span className="text-green-400">"ui-container"</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">></span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">// Your amazing UI code here</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 left-0 w-full h-40 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-radial-at-tl from-gray-800/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">About The Hackathon</h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {aboutCards.map((card, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-1">
                <div className="text-cyan-400 mb-6">{card.icon}</div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Judging Criteria</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex space-x-4">
                <div className="text-yellow-400 flex-shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Functionality</h4>
                  <p className="text-gray-300">Does the UI work as intended across all features and user flows?</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="text-yellow-400 flex-shrink-0">
                  <Palette size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Design Quality</h4>
                  <p className="text-gray-300">Is the UI visually appealing with thoughtful design choices?</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="text-yellow-400 flex-shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Responsiveness</h4>
                  <p className="text-gray-300">Does the UI adapt seamlessly across different screen sizes?</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="text-yellow-400 flex-shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Innovation</h4>
                  <p className="text-gray-300">Does the solution bring creative approaches to the challenge?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 bg-radial-at-br from-yellow-900/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Amazing Prizes</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              {/* Grand Prize */}
              <div className="md:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-yellow-500/30 hover:border-yellow-500/70 transition-all hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full"></div>
                
                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Trophy size={36} className="text-white md:text-base md:w-14 md:h-14" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Grand Prize</h3>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
                    $2,000
                  </div>
                  
                  <p className="text-center text-gray-300 mb-6">
                    The winning submission will receive $2,000 cash and be featured on our website and social media channels.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-gray-900/70 rounded-full px-4 py-2 text-yellow-400 font-medium">
                      <Award size={16} className="mr-2" />
                      <span>1st Place Winner</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Runner Up Prizes */}
              <div className="md:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-cyan-500/30 hover:border-cyan-500/70 transition-all hover:shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full"></div>
                
                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Gift size={36} className="text-white md:text-base md:w-12 md:h-12" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Outstanding Submissions</h3>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent">
                    $150 <span className="text-xl md:text-2xl">x 5</span>
                  </div>
                  
                  <p className="text-center text-gray-300 mb-6">
                    5 outstanding project submissions will each receive a $150 Amazon gift card and recognition on our platform.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-gray-900/70 rounded-full px-4 py-2 text-cyan-400 font-medium">
                      <Sparkles size={16} className="mr-2" />
                      <span>Amazon Gift Cards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="mr-3 text-yellow-400 flex-shrink-0" size={24} />
                <span>Additional Benefits for All Winners</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center space-x-3">
                  <div className="text-yellow-400 flex-shrink-0">
                    <Rocket size={20} />
                  </div>
                  <p className="text-gray-300">Featured on our website</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-yellow-400 flex-shrink-0">
                    <Globe size={20} />
                  </div>
                  <p className="text-gray-300">Social media promotion</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-yellow-400 flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <p className="text-gray-300">Digital achievement badge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="py-20 bg-radial-at-tr from-purple-900/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Challenge Themes</h2>
          <p className="text-lg sm:text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose one of these intermediate to advanced UI challenges for your hackathon submission:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {themes.map((theme, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 transform hover:-translate-y-1 overflow-hidden relative">
                {/* Decorative gradient corner */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full"></div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{theme.title}</h3>
                <p className="text-gray-300 mb-6">{theme.description}</p>
                <div className="flex items-center text-sm font-medium text-pink-400 bg-gray-900/50 self-start rounded-full px-4 py-1.5 border border-pink-500/30">
                  <Code size={14} className="mr-2 flex-shrink-0" />
                  <span>{theme.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section - Mobile optimized */}
      <section id="timeline" className="py-20 bg-radial-at-bl from-blue-900/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">Event Timeline</h2>
          
          {/* Desktop Timeline */}
          <div className="relative max-w-4xl mx-auto hidden md:block">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded"></div>
            
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : ''} mb-16 relative`}>
                <div className="w-1/2"></div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    {event.icon}
                  </div>
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-teal-400 font-medium mb-3">{event.date}</p>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden max-w-md mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-400 to-teal-500"></div>
            
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-12 pb-10">
                <div className="absolute left-0 transform -translate-x-1/2 top-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    {React.cloneElement(event.icon, { size: 16 })}
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
                  <p className="text-teal-400 font-medium text-sm mb-1">{event.date}</p>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-radial-at-br from-yellow-900/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Register Now</h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Join the Challenge</h3>
              <p className="text-gray-300 mb-6">Complete registration with your email and a $20 fee to secure your spot in the monthly frontend hackathon.</p>
              
              <div className="mb-8">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-yellow-400 mt-1.5 flex-shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <p className="text-gray-300">Showcase your frontend skills to a global audience</p>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-yellow-400 mt-1.5 flex-shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <p className="text-gray-300">Compete for $2,000 first prize and $150 gift cards</p>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-yellow-400 mt-1.5 flex-shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <p className="text-gray-300">Receive professional feedback on your work</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-400 mt-1.5 flex-shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <p className="text-gray-300">Win recognition and grow your professional network</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">{countdown.days}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Days</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">{countdown.hours}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Hours</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">{countdown.minutes}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Minutes</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">{countdown.seconds}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Seconds</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Registration Form</h3>
                
                <form onSubmit={handleRegistration}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  
                  {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-start ${
                      messageType === 'error' ? 'bg-red-900/50 text-red-200 border border-red-700' : 
                      messageType === 'info' ? 'bg-blue-900/50 text-blue-200 border border-blue-700' : 
                      'bg-green-900/50 text-green-200 border border-green-700'
                    }`}>
                      <AlertCircle className="mr-3 flex-shrink-0 mt-0.5" size={18} />
                      <span>{message}</span>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transform transition-all hover:-translate-y-1 flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Proceed to Payment ($20)
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Submission Section */}
      <section id="submit" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">How to Submit</h2>
          
          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700">
            <p className="text-lg text-gray-300 mb-8">
              Once you've completed your project, submit your entry through our Google Form. Remember the deadline is 
              <span className="font-bold text-white"> April 30, 2025 at 11:59 PM UTC</span>.
            </p>
            
            <div className="mb-10 bg-gray-900/70 rounded-xl p-5 md:p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FileText className="mr-3 text-cyan-400 flex-shrink-0" size={22} />
                <span>Required Submission Information</span>
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1 flex-shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-300">Your full name and email address</span>
                </li>
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1 flex-shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-300">Project title and selected theme</span>
                </li>
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1 flex-shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-300">Working URL (preferred) or screen recording demonstration</span>
                </li>
                <li className="flex items-start">
                  <div className="text-cyan-400 mr-3 mt-1 flex-shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-gray-300">Brief description of your project and approach (max 300 words)</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <a 
                href="https://forms.google.com/hackathon-submission" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transform transition-all hover:-translate-y-1"
              >
                <Send className="mr-3 flex-shrink-0" size={20} />
                Submit Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-radial-at-bl from-gray-800/20 via-gray-900 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className={`mb-5 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all ${accordionState[index] ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : ''}`}
              >
                <div 
                  className="p-5 md:p-6 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-base md:text-lg font-semibold pr-8 md:pr-10">{faq.question}</h3>
                  <ChevronDown 
                    size={20} 
                    className={`text-purple-400 transition-transform flex-shrink-0 ${accordionState[index] ? 'transform rotate-180' : ''}`} 
                  />
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out overflow-hidden" 
                  style={{ 
                    maxHeight: accordionState[index] ? '500px' : '0',
                    opacity: accordionState[index] ? 1 : 0
                  }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                HACK FRONTEND
              </h3>
              <p className="mb-6 text-gray-400">
                Pushing the boundaries of frontend development one challenge at a time. Join our monthly hackathon to showcase your UI skills and compete for $2,000 in prizes.
              </p>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#prizes" className="text-gray-400 hover:text-white transition-colors">Prizes</a></li>
                <li><a href="#themes" className="text-gray-400 hover:text-white transition-colors">Themes</a></li>
                <li><a href="#timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#submit" className="text-gray-400 hover:text-white transition-colors">Submission</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hackathon@rref-calculator.com" className="text-gray-400 hover:text-white transition-colors">
                    hackathon@rref-calculator.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 HACK FRONTEND Hackathon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HackathonLandingPage;