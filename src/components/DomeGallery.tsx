import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import './DomeGallery.css';
import iconStocks from '../assets/icons/stocks.webp';
import iconFunds from '../assets/icons/funds.webp';
import iconBonds from '../assets/icons/bonds.webp';
import iconStructured from '../assets/icons/structured.webp';
import iconCoin from '../assets/icons/coin.webp';
import { useLoopZone } from '../lib/motion';

export interface DomeGalleryProps {
  images?: string[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  overlayBlurColor?: string;
  segments?: number;
  imageBorderRadius?: string;
  grayscale?: boolean;
}

// Decorative tiles: the template's own 3D product icons.
const DEFAULT_IMAGES = [iconStocks, iconCoin, iconFunds, iconBonds, iconStructured];

interface DomeItem {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function buildItems(pool: string[], segments: number): DomeItem[] {
  const xCols = Array.from({ length: segments }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];
  const coords = xCols.flatMap((x, c) => (c % 2 === 0 ? evenYs : oddYs).map((y) => ({ x, y, sizeX: 2, sizeY: 2 })));
  return coords.map((coord, i) => ({ ...coord, src: pool[i % pool.length] }));
}

/**
 * Rotating dome of tiles. Purely decorative: hidden from assistive technology and not interactive. The rotation is a
 * CSS loop (DomeGallery.css): it runs for every visitor, a little slower under reduced motion, pauses off screen and
 * stops with the Pause animations toggle.
 */
export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  overlayBlurColor = '#120F17',
  segments = 35,
  imageBorderRadius = '30px',
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const loops = useLoopZone(rootRef, '100px');
  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const w = Math.max(1, width);
      const h = Math.max(1, height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      let basis: number;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = w / h >= 1.3 ? w : minDim;
      }
      const radius = clamp(Math.min(basis * fit, h * 1.35), minRadius, maxRadius);
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius]);

  const rootStyle = {
    '--segments-x': segments,
    '--segments-y': segments,
    '--overlay-blur-color': overlayBlurColor,
    '--tile-radius': imageBorderRadius,
    '--image-filter': grayscale ? 'grayscale(1)' : 'none',
  } as CSSProperties;

  return (
    <div ref={rootRef} data-loops={loops} className="sphere-root" style={rootStyle} aria-hidden="true">
      <div className="sphere-main">
        <div className="stage">
          <div className="sphere loop">
            {items.map((item, i) => (
              <div
                key={`${item.x},${item.y},${i}`}
                className="item"
                style={
                  {
                    '--offset-x': item.x,
                    '--offset-y': item.y,
                    '--item-size-x': item.sizeX,
                    '--item-size-y': item.sizeY,
                  } as CSSProperties
                }
              >
                <div className="item__image">
                  <img src={item.src} alt="" draggable={false} loading="lazy" decoding="async" width={160} height={160} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
        <div className="edge-fade edge-fade--left" />
        <div className="edge-fade edge-fade--right" />
      </div>
    </div>
  );
}
