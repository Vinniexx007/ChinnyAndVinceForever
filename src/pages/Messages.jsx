import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGift } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51T57FUHxCkOI8puXr89Rr0DQow5LIpfPIZZL95qvdUyxlRSoqZmAWSruFrJhWkTfyphaNFM76OBXbFeLxHXHFX9600AQAPyiOU');

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
    phone: '',
  });
  const [showPayment, setShowPayment] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('weddingMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      alert('Please fill in your name and message');
      return;
    }

    const newMessage = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('weddingMessages', JSON.stringify(updatedMessages));

    setFormData({ name: '', message: '', email: '', phone: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-romantic-600 mb-4">
            Goodwill Messages
          </h1>
          <p className="font-sans text-lg text-gray-600">
            Share your love and blessings with us
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="font-serif text-3xl font-bold text-romantic-600 mb-6 flex items-center">
              <FaHeart className="mr-3" />
              Leave a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="Share your wishes and blessings..."
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-sans font-semibold py-3 px-6 rounded-lg hover:from-romantic-600 hover:to-romantic-700 transition-all shadow-lg"
              >
                Send Message
              </button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center font-sans"
                >
                  Thank you for your message! ❤️
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Support Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-floral-50 to-purple-50 rounded-3xl shadow-xl p-8"
          >
            <h2 className="font-serif text-3xl font-bold text-floral-600 mb-6 flex items-center">
              <FaGift className="mr-3" />
              Support Us
            </h2>
            
            <p className="font-sans text-gray-700 mb-6">
              Your presence is the greatest gift, but if you wish to bless us with a monetary gift,
              we would be deeply grateful.
            </p>

            {!showPayment ? (
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-gradient-to-r from-floral-500 to-floral-600 text-white font-sans font-semibold py-3 px-6 rounded-lg hover:from-floral-600 hover:to-floral-700 transition-all shadow-lg"
              >
                Make a Gift
              </button>
            ) : (
              <Elements stripe={stripePromise}>
                <PaymentForm onCancel={() => setShowPayment(false)} />
              </Elements>
            )}

            <div className="mt-8 p-4 bg-white/50 rounded-lg">
              <p className="font-sans text-sm text-gray-600 text-center">
                All transactions are secure and encrypted
              </p>
            </div>
          </motion.div>
        </div>

        {/* Display Messages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-serif text-3xl font-bold text-romantic-600 mb-8 text-center">
            Messages from Our Loved Ones
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {messages.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="font-sans text-gray-500">
                  No messages yet. Be the first to share your blessings!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-romantic-400"
                >
                  <div className="flex items-start mb-3">
                    <FaHeart className="text-romantic-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans font-semibold text-gray-800">{msg.name}</h3>
                      <p className="font-sans text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-gray-700 leading-relaxed">{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;
