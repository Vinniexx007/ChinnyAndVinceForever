import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  // Placeholder date - you can update this later
  const weddingDate = new Date('2025-12-31T00:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = weddingDate - new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center floral-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <img 
              src="/download/logo.png" 
              alt="Wedding Logo" 
              className="h-32 w-auto mx-auto object-contain"
            />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="mb-8"
          >
            <FaHeart className="text-romantic-500 text-6xl mx-auto mb-4" />
          </motion.div>
          
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-romantic-600 mb-4">
            We're Getting Married!
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-gray-600 mb-8">
            Join us as we celebrate our love story
          </p>

          {/* Save the Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl"
          >
            <div className="flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-romantic-500 text-3xl mr-3" />
              <h2 className="font-serif text-3xl font-semibold text-romantic-600">
                Save The Date
              </h2>
            </div>
            
            <p className="font-sans text-lg text-gray-600 mb-6">
              Date to be confirmed
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-gradient-to-br from-romantic-100 to-floral-100 rounded-xl p-4">
                  <div className="font-serif text-4xl font-bold text-romantic-600">
                    {value}
                  </div>
                  <div className="font-sans text-sm text-gray-600 capitalize">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Info Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold text-romantic-600 mb-6">
              Our Special Day
            </h2>
            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              We are thrilled to share this momentous occasion with our family and friends.
              More details about the venue, time, and celebration will be shared soon.
              Stay tuned for updates!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
