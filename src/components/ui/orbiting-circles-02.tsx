import { useRef, type CSSProperties } from 'react';
import ParticleSphereAnimation from './orbiting-circles-02-utils/particalsphear';
import iconStocks from '../../assets/icons/stocks.webp';
import iconFunds from '../../assets/icons/funds.webp';
import iconBonds from '../../assets/icons/bonds.webp';
import iconStructured from '../../assets/icons/structured.webp';
import iconCoin from '../../assets/icons/coin.webp';
import { useInView } from '../../lib/motion';

type OrbitItem = { kind: 'icon'; src: string } | { kind: 'exchange'; label: string };

// Exchange codes are the ones shown on the live landing's hero globe; icons are the template's 3D art.
const ORBITS: { size: string; duration: number; items: OrbitItem[] }[] = [
  {
    size: 'w-110 h-110 md:w-180 md:h-180',
    duration: 20,
    items: [
      { kind: 'exchange', label: 'NYSE' },
      { kind: 'icon', src: iconStocks },
      { kind: 'exchange', label: 'LSE' },
      { kind: 'icon', src: iconCoin },
    ],
  },
  {
    size: 'w-150 h-150 md:w-220 md:h-220',
    duration: 26,
    items: [
      { kind: 'icon', src: iconFunds },
      { kind: 'exchange', label: 'SGX' },
      { kind: 'icon', src: iconBonds },
      { kind: 'exchange', label: 'TSE' },
      { kind: 'icon', src: iconStructured },
    ],
  },
  {
    size: 'w-180 h-180 md:w-265 md:h-265',
    duration: 32,
    items: [
      { kind: 'icon', src: iconCoin },
      { kind: 'icon', src: iconStocks },
      { kind: 'icon', src: iconBonds },
      { kind: 'icon', src: iconFunds },
      { kind: 'icon', src: iconStructured },
      { kind: 'icon', src: iconCoin },
    ],
  },
];

/** Decorative orbit rings around a particle globe. Animations pause off screen and stop for reduced motion. */
export default function OrbitingCirclesGlobeDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, '100px');

  return (
    <div
      ref={rootRef}
      className={`relative flex h-[380px] w-full justify-center overflow-hidden md:h-[560px] ${inView ? '' : 'orbit-paused'}`}
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-75 -translate-x-1/2 translate-y-1/2 md:w-145">
        <ParticleSphereAnimation active={inView} />
      </div>

      {ORBITS.map((orbit, orbitIndex) => {
        const clockwise = orbitIndex % 2 === 0;
        const orbitAnimation = clockwise ? 'orbit-cw' : 'orbit-ccw';
        const counterAnimation = clockwise ? 'counter-cw' : 'counter-ccw';
        const angleStep = 360 / orbit.items.length;

        return (
          <div
            key={orbit.size}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-gray-200 ${orbit.size}`}
          >
            {orbit.items.map((item, itemIndex) => {
              const angle = Math.round(itemIndex * angleStep - 180);
              return (
                <div
                  key={itemIndex}
                  className="orbit-anim absolute top-0 left-1/2 -ml-8 flex h-1/2 origin-bottom flex-col items-center justify-start"
                  style={
                    {
                      '--start-angle': `${angle}deg`,
                      transform: `rotate(${angle}deg)`,
                      animation: `${orbitAnimation} ${orbit.duration}s linear infinite`,
                    } as CSSProperties
                  }
                >
                  <div
                    className="orbit-anim relative z-10 -mt-6 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white p-1.5 shadow-md md:-mt-7 md:h-14 md:w-14"
                    style={
                      {
                        '--counter-offset': `${-angle}deg`,
                        transform: `rotate(${-angle}deg)`,
                        animation: `${counterAnimation} ${orbit.duration}s linear infinite`,
                      } as CSSProperties
                    }
                  >
                    {item.kind === 'icon' ? (
                      <img src={item.src} alt="" width={56} height={56} loading="lazy" decoding="async" className="pointer-events-none h-full w-full rounded-full object-contain" />
                    ) : (
                      <span className="font-sans text-[10px] font-extrabold tracking-wide text-brand-dark md:text-xs">{item.label}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
