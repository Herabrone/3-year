import { FaHeart, FaVolumeUp } from 'react-icons/fa';
import './SplashScreen.css';

const SplashScreen = ({ onStart, title, subtitle, dateRange, isLoading }) => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <FaHeart className="splash-heart" />
        <h1 className="splash-title">{title}</h1>
        <p className="splash-date">{dateRange}</p>
        <p className="splash-subtitle">{subtitle}</p>
        
        <button 
          className="splash-button"
          onClick={onStart}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Experience'}
        </button>
        
        <p className="splash-audio-note">
          <FaVolumeUp /> Enable sound for the full experience
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
