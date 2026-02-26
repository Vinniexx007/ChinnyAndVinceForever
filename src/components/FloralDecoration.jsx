import { motion } from 'framer-motion';

const FloralDecoration = () => {
  return (
    <>
      {/* Top Left Floral */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#f9a8d4" opacity="0.3" />
          <circle cx="80" cy="40" r="25" fill="#e9d5ff" opacity="0.3" />
          <circle cx="70" cy="70" r="20" fill="#fce7f3" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Bottom Right Floral */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed bottom-0 right-0 w-64 h-64 pointer-events-none z-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="150" cy="150" r="30" fill="#c084fc" opacity="0.3" />
          <circle cx="120" cy="160" r="25" fill="#f9a8d4" opacity="0.3" />
          <circle cx="130" cy="130" r="20" fill="#e9d5ff" opacity="0.3" />
        </svg>
      </motion.div>
    </>
  );
};

export default FloralDecoration;
