'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Clock, Phone, MapPin, ArrowRight, ChefHat, Truck, Star, Instagram, Facebook, Twitter } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const specialsData = [
    {
      name: "Grilled Mountain Salmon",
      price: "$28",
      description: "Fresh salmon with herbs, served with roasted vegetables",
      image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80"
    },
    {
      name: "Eagle's Signature Steak",
      price: "$35",
      description: "Premium cut with garlic butter and truffle mash",
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80"
    },
    {
      name: "Summit Seafood Platter",
      price: "$45",
      description: "Daily catch selection with premium sides",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <h1 className={`text-3xl font-extrabold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
                Eagle's Nest
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className={`${isScrolled ? 'text-slate-600' : 'text-white'} hover:text-amber-500 transition-colors duration-300`}>Home</a>
              <a href="/dishes" className={`${isScrolled ? 'text-slate-600' : 'text-white'} hover:text-amber-500 transition-colors duration-300`}>Menu</a>
              <a href="#specials" className={`${isScrolled ? 'text-slate-600' : 'text-white'} hover:text-amber-500 transition-colors duration-300`}>Specials</a>
              <a href="#delivery" className={`${isScrolled ? 'text-slate-600' : 'text-white'} hover:text-amber-500 transition-colors duration-300`}>Delivery</a>
              <button className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105">
                Reserve Table
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${isScrolled ? 'text-slate-800' : 'text-white'} hover:text-amber-500 transition-colors duration-300`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <a href="#home" className="block px-3 py-2 text-slate-600 hover:text-amber-500 transition-colors duration-300">Home</a>
              <a href="#menu" className="block px-3 py-2 text-slate-600 hover:text-amber-500 transition-colors duration-300">Menu</a>
              <a href="#specials" className="block px-3 py-2 text-slate-600 hover:text-amber-500 transition-colors duration-300">Specials</a>
              <a href="#delivery" className="block px-3 py-2 text-slate-600 hover:text-amber-500 transition-colors duration-300">Delivery</a>
              <button className="w-full text-left px-3 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300">
                Reserve Table
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Where Luxury Meets
            <span className="text-amber-500"> Culinary Excellence</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Experience fine dining at its peak with breathtaking city views
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
              Explore Menu
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Make Reservation
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 group">
              <div className="bg-amber-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChefHat size={32} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Master Chefs</h3>
              <p className="text-slate-600 leading-relaxed">Our award-winning culinary team crafts extraordinary dishes with passion and precision</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 group">
              <div className="bg-amber-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Scenic Location</h3>
              <p className="text-slate-600 leading-relaxed">Dine with panoramic city views from our sophisticated top-floor venue</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 group">
              <div className="bg-amber-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star size={32} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Premium Experience</h3>
              <p className="text-slate-600 leading-relaxed">Immerse yourself in an atmosphere of elegance and exceptional service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specials Section */}
      <div id="specials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Today's Specials</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Indulge in our chef's carefully curated selection of exceptional dishes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialsData.map((special, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-slate-800">{special.name}</h3>
                    <span className="text-amber-500 font-bold text-xl">{special.price}</span>
                  </div>
                  <p className="text-slate-600 mb-6">{special.description}</p>
                  <button className="w-full bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                    Order Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Section */}
      <div id="delivery" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Bringing the <span className="text-amber-500">Eagle's Nest</span> Experience Home
              </h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Enjoy our exceptional cuisine in the comfort of your home. Fast, reliable delivery within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                  Order Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="border-2 border-white/20 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  View Menu
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80"
                alt="Delivery"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Eagle's Nest</h3>
              <p className="text-gray-400 mb-6">Elevating your dining experience to new heights</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Hours</h4>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Clock size={20} className="mr-3" />
                  <span>Mon-Fri: 11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock size={20} className="mr-3" />
                  <span>Sat-Sun: 10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400 hover:text-amber-500 transition-colors duration-300">
                  <Phone size={20} className="mr-3" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-amber-500 transition-colors duration-300">
                  <MapPin size={20} className="mr-3" />
                  <span>123 Skyview Drive, Cityville</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to receive updates about special events and exclusive offers.</p>
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Eagle's Nest. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-110 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default LandingPage;