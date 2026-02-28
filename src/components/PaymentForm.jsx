import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

const PaymentForm = ({ onCancel, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!isAnonymous && !donorName.trim()) {
      setError('Please enter your name or select anonymous');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Save donation to server
      const donationResponse = await fetch('http://localhost:3001/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorName: donorName.trim(),
          amount: parseFloat(amount),
          isAnonymous,
        }),
      });

      if (!donationResponse.ok) {
        throw new Error('Failed to save donation');
      }

      // Here you would call your backend to create a payment intent
      // const response = await fetch('/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     amount: parseFloat(amount) * 100,
      //     donorName: isAnonymous ? 'Anonymous' : donorName 
      //   }),
      // });
      // const { clientSecret } = await response.json();

      // For now, we'll just simulate success
      setTimeout(() => {
        setSuccess(true);
        setProcessing(false);
        if (onSuccess) onSuccess(); // Refresh donations list
        setTimeout(() => {
          onCancel();
        }, 2000);
      }, 1500);

    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">💝</div>
        <h3 className="font-serif text-2xl font-bold text-floral-600 mb-2">
          Thank You!
        </h3>
        <p className="font-sans text-gray-600">
          Your generous gift means the world to us
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
          Your Name {!isAnonymous && '*'}
        </label>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          disabled={isAnonymous}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-floral-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          placeholder={isAnonymous ? "Anonymous" : "Your name"}
          required={!isAnonymous}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 text-floral-600 border-gray-300 rounded focus:ring-floral-500"
        />
        <label htmlFor="anonymous" className="ml-2 font-sans text-sm text-gray-700">
          I wish to remain anonymous
        </label>
      </div>

      <div>
        <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
          Gift Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-floral-500 focus:border-transparent"
          placeholder="50.00"
          required
        />
        <p className="mt-1 text-xs text-gray-500 font-sans">
          Amount will be charged in your card's default currency
        </p>
      </div>

      <div>
        <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-sans text-sm">
          {error}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 font-sans font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-gradient-to-r from-floral-500 to-floral-600 text-white font-sans font-semibold py-3 px-6 rounded-lg hover:from-floral-600 hover:to-floral-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Send Gift'}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center font-sans">
        Note: This is a demo. Replace with actual Stripe integration.
      </p>
    </form>
  );
};

export default PaymentForm;
