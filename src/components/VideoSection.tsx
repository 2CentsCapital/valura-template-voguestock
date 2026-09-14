import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import demoWebm from '../assets/media/demo.webm';
import demoMp4 from '../assets/media/demo.mp4';
import demoPoster from '../assets/media/demo-poster.webp';
import { ILLUSTRATIVE_CAPTION } from '../config';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <section className="border-t border-gray-100 bg-brand-light pt-16 pb-20 sm:pt-20 sm:pb-24" id="demo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center font-sans sm:mb-16">
          <h2 className="mb-6 font-display text-4xl leading-tight font-medium text-brand-dark sm:text-5xl">
            See How Global Investing Works
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Watch how you can browse the marketplace, buy a US stock in fractions and follow your holdings in the
            Voguestock app powered by Valura.Ai.
          </p>
          <button
            type="button"
            onClick={togglePlayback}
            aria-controls="demo-video"
            className="inline-block cursor-pointer rounded-xl bg-brand-orange px-10 py-4 font-bold text-brand-dark transition-all duration-200 hover:bg-brand-orange-soft hover:shadow-lg hover:shadow-brand-orange/20"
          >
            {isPlaying ? 'Pause Demo' : 'Watch Demo'}
          </button>
        </div>

        <figure className="mx-auto max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-gray-200/60 bg-brand-night shadow-2xl">
            <video
              id="demo-video"
              ref={videoRef}
              className="h-full w-full object-cover"
              controls
              muted
              playsInline
              preload="none"
              poster={demoPoster}
              width={1280}
              height={720}
              aria-label="Demo of the Voguestock app powered by Valura.Ai, no audio"
              onPlay={() => {
                setIsPlaying(true);
                setHasStarted(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={demoWebm} type="video/webm" />
              <source src={demoMp4} type="video/mp4" />
            </video>
            {!isPlaying && !hasStarted && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label="Play demo video"
                className="group absolute inset-0 m-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/25 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-110"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-dark shadow-md">
                  <Play aria-hidden="true" className="ml-1 h-8 w-8 fill-current" />
                </span>
              </button>
            )}
          </div>
          <figcaption className="mt-4 text-center font-sans text-sm text-gray-600">{ILLUSTRATIVE_CAPTION}</figcaption>
        </figure>
      </div>
    </section>
  );
}
