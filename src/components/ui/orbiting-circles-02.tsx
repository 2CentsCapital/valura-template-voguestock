"use client";

import ParticleSphereAnimation from "./orbiting-circles-02-utils/particalsphear";

const logoModules = import.meta.glob<{ default: string }>('../../assets/Logos/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const logoAssets = Object.values(logoModules).map(mod => mod.default);

// Shuffle logos once
const shuffledLogos = [...logoAssets].sort(() => 0.5 - Math.random());

// Distribute logos dynamically across 3 orbits
const getOrbitIcons = (startIndex: number, count: number) => {
  const angleStep = 360 / count;
  return Array.from({ length: count }, (_, i) => ({
    src: shuffledLogos[(startIndex + i) % shuffledLogos.length],
    alt: `Logo ${startIndex + i + 1}`,
    angle: Math.round(i * angleStep - 180),
  }));
};

const innerCount = Math.min(6, Math.floor(shuffledLogos.length / 3));
const middleCount = Math.min(8, Math.floor(shuffledLogos.length / 3));
const outerCount = shuffledLogos.length - innerCount - middleCount;

const orbits = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 20,
    icons: getOrbitIcons(0, innerCount),
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 26,
    icons: getOrbitIcons(innerCount, middleCount),
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 32,
    icons: getOrbitIcons(innerCount + middleCount, outerCount),
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative w-full h-[380px] md:h-[560px] overflow-hidden flex justify-center">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-gray-200 ${orbit.size}`}
          >
            {orbit.icons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white border border-gray-200/80 shadow-md flex items-center justify-center p-1.5 -mt-6 md:-mt-7 relative z-10 hover:scale-110 transition-transform duration-200"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={iconData.src}
                    alt={iconData.alt}
                    className="w-full h-full max-w-full max-h-full object-contain pointer-events-none rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
