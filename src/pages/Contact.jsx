import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      await emailjs.send(
        'service_cht0egn',
        'template_1za0rgl',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'eGctppJ7ygVqe-SY'
      );

      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
    }
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
            Contact Us
          </h1>
          <p className="font-sans text-lg text-gray-600">
            Have questions? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="font-serif text-3xl font-bold text-romantic-600 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="What's this about?"
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
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-sans font-semibold py-3 px-6 rounded-lg hover:from-romantic-600 hover:to-romantic-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-sans text-sm"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-sans text-sm">
                  {error}
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-romantic-50 to-pink-50 rounded-3xl shadow-lg p-8">
              <h2 className="font-serif text-3xl font-bold text-romantic-600 mb-6">
                Get in Touch
              </h2>
              <p className="font-sans text-gray-700 mb-8">
                Feel free to reach out to us with any questions about the wedding,
                venue details, or anything else you'd like to know.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-romantic-200 rounded-full p-3 mr-4">
                    <FaEnvelope className="text-romantic-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="font-sans text-gray-600">vogbechie@gmail.com</p>
                    <p className="font-sans text-gray-600">chinweinigbo@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-romantic-200 rounded-full p-3 mr-4">
                    <FaPhone className="text-romantic-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="font-sans text-gray-600">0794 260 2913 (Vince)</p>
                    <p className="font-sans text-gray-600">0743 501 8211 (Chinny)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
