import type { CSSProperties, ElementType, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  containerClassName?: string;
  /** Delay before the reveal starts, in milliseconds. */
  delay?: number;
}

/**
 * Entrance reveal. String children rise word by word; other children reveal as one block.
 * The hidden state and timing live in index.css; src/lib/reveal.ts decides when it plays.
 */
export default function ScrollReveal({ children, as: Component = 'div', containerClassName = '', delay = 0 }: ScrollRevealProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  if (typeof children !== 'string') {
    return (
      <Component data-reveal="" className={containerClassName} style={style}>
        {children}
      </Component>
    );
  }

  let wordIndex = 0;
  return (
    <Component data-reveal="words" className={containerClassName} style={style}>
      {children.split(/(\s+)/).map((part, index) =>
        part.trim() === '' ? (
          part
        ) : (
          <span key={index} className="reveal-word" style={{ '--word-index': wordIndex++ } as CSSProperties}>
            {part}
          </span>
        )
      )}
    </Component>
  );
}
