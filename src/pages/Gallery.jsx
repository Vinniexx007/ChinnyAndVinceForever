import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState(null);

  // Placeholder data - you'll replace with actual images
  const galleries = [
    {
      id: 'story',
      title: 'Our Story So Far',
      description: 'The journey that brought us together',
      images: [
        { id: 1, url: '/Images/Story/71EC4D32-6FA4-4D7D-BC14-0BD3B83E4783.JPG', caption: 'Our Journey' },
        { id: 2, url: '/Images/Story/IMG_7422.jpeg', caption: 'Special Moments' },
        { id: 3, url: '/Images/Story/IMG_1211 2.jpeg', caption: 'Together' },
        { id: 4, url: '/Images/Story/IMG_1385.jpeg', caption: 'Beautiful Times' },
        { id: 5, url: '/Images/Story/IMG_2011.jpeg', caption: 'Our Adventure' },
        { id: 6, url: '/Images/Story/IMG_2245.jpeg', caption: 'Making Memories' },
        { id: 7, url: '/Images/Story/IMG_2316.jpeg', caption: 'Love & Laughter' },
        { id: 8, url: '/Images/Story/IMG_3199.jpeg', caption: 'Side by Side' },
        { id: 9, url: '/Images/Story/IMG_3943.jpeg', caption: 'Happy Moments' },
        { id: 10, url: '/Images/Story/IMG_4272.jpeg', caption: 'Our Story' },
        { id: 11, url: '/Images/Story/IMG_4976.jpeg', caption: 'Together Forever' },
        { id: 12, url: '/Images/Story/IMG_5121.jpeg', caption: 'Sweet Times' },
        { id: 13, url: '/Images/Story/IMG_5145.jpeg', caption: 'Cherished Moments' },
        { id: 14, url: '/Images/Story/IMG_5154.jpeg', caption: 'Love Story' },
        { id: 15, url: '/Images/Story/IMG_5611.jpeg', caption: 'Perfect Day' },
        { id: 16, url: '/Images/Story/IMG_5631.jpeg', caption: 'Us' },
        { id: 17, url: '/Images/Story/IMG_7270.jpeg', caption: 'Beautiful Us' },
        { id: 18, url: '/Images/Story/IMG_9600.jpeg', caption: 'Forever Starts' },
        { id: 19, url: '/Images/Story/IMG_9789.jpeg', caption: 'Our Love' },
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

  const openLightbox = (image, gallery, index) => {
    setSelectedImage(image);
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentGallery(null);
    setCurrentImageIndex(0);
  };

  const goToNext = () => {
    if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(currentGallery.images[nextIndex]);
    }
  };

  const goToPrevious = () => {
    if (currentGallery && currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(currentGallery.images[prevIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex, currentGallery]);

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
                        {gallery.images.map((image, index) => (
                          <motion.div
                            key={image.id}
                            whileHover={{ scale: 1.05 }}
                            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md group"
                            onClick={() => openLightbox(image, gallery, index)}
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-romantic-300 transition-colors z-10"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>

            {/* Previous Button */}
            {currentGallery && currentImageIndex > 0 && (
              <button
                className="absolute left-4 text-white text-4xl hover:text-romantic-300 transition-colors z-10 bg-black/30 rounded-full p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Next Button */}
            {currentGallery && currentImageIndex < currentGallery.images.length - 1 && (
              <button
                className="absolute right-4 text-white text-4xl hover:text-romantic-300 transition-colors z-10 bg-black/30 rounded-full p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <FaChevronRight />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={selectedImage.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption and Counter */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white font-sans text-lg mb-2">{selectedImage.caption}</p>
              {currentGallery && (
                <p className="text-white/70 font-sans text-sm">
                  {currentImageIndex + 1} / {currentGallery.images.length}
                </p>
              )}
            </div>

            {/* Keyboard Hint */}
            <div className="absolute top-4 left-4 text-white/50 font-sans text-xs">
              Use arrow keys or swipe to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
