import { useState, useRef } from 'react';
import videoDemo from '../assets/Vid/Voguestock vid.webm';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  return (
    <section className="bg-brand-light pt-8 pb-24 border-t border-gray-100" id="video-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-brand-dark leading-tight mb-6">
            See How Global Investing Works
          </h2>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-8">
            Watch how you can open your account, fund it, and start investing internationally in just a few simple steps.
          </p>
          <button
            onClick={handlePlayToggle}
            className="inline-block px-10 py-4 rounded-xl bg-brand-blue font-bold text-white hover:bg-brand-blue/95 hover:shadow-lg hover:shadow-brand-blue/15 transition-all duration-200 cursor-pointer"
          >
            Watch Demo
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 group aspect-video bg-gray-900 flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoDemo}
            className="w-full h-full object-cover cursor-pointer"
            controls
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onClick={handlePlayToggle}
          />
          {!isPlaying && (
            <div 
              onClick={handlePlayToggle}
              className="absolute z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/30 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-md">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
