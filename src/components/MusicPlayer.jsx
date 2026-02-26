import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // Note: You'll need to add the actual audio file to public folder
  // For now, this is a placeholder
  const audioSrc = '/music/start-of-something-good.mp3';

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
      
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-4 flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="text-romantic-600 hover:text-romantic-700 transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        
        <button
          onClick={toggleMute}
          className="text-romantic-600 hover:text-romantic-700 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
        
        <span className="text-xs font-sans text-gray-600 hidden sm:block">
          Daughtry - Start of Something Good
        </span>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
