import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-romantic-600 mb-4">
            About Us
          </h1>
          <div className="flex justify-center">
            <FaHeart className="text-romantic-400 text-3xl" />
          </div>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-romantic-600 mb-6 text-center">
            Our Love Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Chinny and Vince's story is proof that what's meant for you will always find its way back—sometimes just fashionably late.
            </p>
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Our paths first crossed years ago in Ibadan, during Chinny's first year in medical school. We were completely unaware that destiny had quietly pencilled us in for a later chapter. No conversations, no sparks (yet), no clue. Life simply smiled and said, "Not now… wait for it."
            </p>
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Fast forward to the Covid era—lockdowns, uncertainty, and a mutual friend who unknowingly played Cupid. One phone call was all it took. From that very first conversation, the chemistry was instant, undeniable, and honestly a little surprising (in the best way). Despite the long distance, something just clicked.
            </p>
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Since that day, we've spoken every single day—laughing, dreaming, planning, supporting, and falling more in love along the way. What started as a reconnection quickly became a realization: this wasn't new… it was always meant to be.
            </p>
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              So yes, destiny may delay, but it never denies. And now, here we are—celebrating a love story that was written long before we even knew it.
            </p>
            <p className="font-sans text-gray-700 leading-relaxed font-semibold text-romantic-600">
              Forever starts here.
            </p>
            <p className="font-sans text-gray-600 italic text-center mt-6">
              #ChinnyAndVinceForever ✨💍
            </p>
          </div>
        </motion.div>

        {/* The Couple */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-romantic-50 to-pink-50 rounded-3xl shadow-lg p-8 text-center"
          >
            <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-romantic-200 to-romantic-300 flex items-center justify-center">
              <span className="text-6xl">👰</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-romantic-600 mb-3">
              The Bride
            </h3>
            <p className="font-sans text-lg text-gray-700 mb-4">
              Chinny
            </p>
            <p className="font-sans text-gray-600">
              A dedicated medical professional with a heart of gold and a smile that lights up every room.
            </p>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-floral-50 to-purple-50 rounded-3xl shadow-lg p-8 text-center"
          >
            <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-floral-200 to-floral-300 flex items-center justify-center">
              <span className="text-6xl">🤵</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-floral-600 mb-3">
              The Groom
            </h3>
            <p className="font-sans text-lg text-gray-700 mb-4">
              Vince
            </p>
            <p className="font-sans text-gray-600">
              A man of vision and purpose, whose love and dedication knows no bounds.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
