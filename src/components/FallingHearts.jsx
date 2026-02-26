import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const FallingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 10 + Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: 0,
          duration: 8 + Math.random() * 4,
          size: 10 + Math.random() * 15,
          opacity: 0.3 + Math.random() * 0.4,
        },
      ].slice(-20)); // Keep only last 20 hearts
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            y: -50, 
            x: `${heart.left}vw`,
            opacity: 0,
            rotate: 0,
          }}
          animate={{ 
            y: '110vh',
            x: `${heart.left + (Math.random() - 0.5) * 20}vw`,
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
          className="absolute"
          style={{
            fontSize: `${heart.size}px`,
          }}
        >
          <FaHeart className="text-romantic-500" />
        </motion.div>
      ))}
    </div>
  );
};

export default FallingHearts;
