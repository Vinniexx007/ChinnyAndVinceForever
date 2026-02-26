import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Placeholder data - you'll replace with actual images
  const galleries = [
    {
      id: 'story',
      title: 'Our Story So Far',
      description: 'The journey that brought us together',
      images: [
        { id: 1, url: '/images/story/71EC4D32-6FA4-4D7D-BC14-0BD3B83E4783.JPG', caption: 'Our Journey' },
        { id: 2, url: '/images/story/IMG_7398.JPG', caption: 'Special Moments' },
        { id: 3, url: '/images/story/IMG_1211 2.HEIC', caption: 'Together' },
        { id: 4, url: '/images/story/IMG_1385.HEIC', caption: 'Beautiful Times' },
        { id: 5, url: '/images/story/IMG_2011.HEIC', caption: 'Our Adventure' },
        { id: 6, url: '/images/story/IMG_2245.HEIC', caption: 'Making Memories' },
        { id: 7, url: '/images/story/IMG_2316.HEIC', caption: 'Love & Laughter' },
        { id: 8, url: '/images/story/IMG_3199.HEIC', caption: 'Side by Side' },
        { id: 9, url: '/images/story/IMG_3943.HEIC', caption: 'Happy Moments' },
        { id: 10, url: '/images/story/IMG_4272.HEIC', caption: 'Our Story' },
        { id: 11, url: '/images/story/IMG_4976.HEIC', caption: 'Together Forever' },
        { id: 12, url: '/images/story/IMG_5121.HEIC', caption: 'Sweet Times' },
        { id: 13, url: '/images/story/IMG_5145.HEIC', caption: 'Cherished Moments' },
        { id: 14, url: '/images/story/IMG_5154.HEIC', caption: 'Love Story' },
        { id: 15, url: '/images/story/IMG_5611.HEIC', caption: 'Perfect Day' },
        { id: 16, url: '/images/story/IMG_5631.HEIC', caption: 'Us' },
        { id: 17, url: '/images/story/IMG_7270.HEIC', caption: 'Beautiful Us' },
        { id: 18, url: '/images/story/IMG_7422.HEIC', caption: 'Forever Starts' },
        { id: 19, url: '/images/story/IMG_9600.HEIC', caption: 'Our Love' },
        { id: 20, url: '/images/story/IMG_9789.HEIC', caption: 'Meant To Be' },
      ],
    },
    {
      id: 'traditional',
      title: 'Our Traditional Wedding',
      description: 'Celebrating our heritage and culture',
      images: [],
      comingSoon: true,
    },
    {
      id: 'white',
      title: 'Our White Wedding',
      description: 'A day of elegance and romance',
      images: [],
      comingSoon: true,
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-romantic-600 mb-4">
            Photo Gallery
          </h1>
          <p className="font-sans text-lg text-gray-600">
            Moments we'll cherish forever
          </p>
        </motion.div>

        <div className="space-y-6">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(gallery.id)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-romantic-600 mb-1">
                    {gallery.title}
                  </h2>
                  <p className="font-sans text-gray-600">{gallery.description}</p>
                </div>
                <div className="text-romantic-500 text-2xl">
                  {expandedSection === gallery.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>

              {/* Image Grid */}
              <AnimatePresence>
                {expandedSection === gallery.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {gallery.comingSoon ? (
                      <div className="p-12 text-center">
                        <div className="text-6xl mb-4">📸</div>
                        <h3 className="font-serif text-2xl font-semibold text-romantic-600 mb-2">
                          Coming Soon
                        </h3>
                        <p className="font-sans text-gray-600">
                          Photos will be updated after the ceremony. Stay tuned!
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gallery.images.map((image) => (
                          <motion.div
                            key={image.id}
                            whileHover={{ scale: 1.05 }}
                            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md group"
                            onClick={() => setSelectedImage(image)}
                          >
                            <img
                              src={image.url}
                              alt={image.caption}
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                              <p className="text-white font-sans p-4">{image.caption}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-romantic-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white font-sans text-lg">{selectedImage.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
