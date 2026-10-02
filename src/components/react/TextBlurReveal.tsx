import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Adapted from the 21st.dev "Text Blur Reveal" component (@wensity): text that blurs
// and fades in word by word as it scrolls into view, reduced-motion safe. Changes
// for MFH: accepts several lines (the promise quote breaks into three), keeps the
// stagger running across them, and makes the travel distance configurable.

export type TextBlurRevealDirection = 'top' | 'bottom';

export interface TextBlurRevealProps {
  /** One entry per visual line. */
  lines: string[];
  /** Stagger delay between words, in milliseconds. */
  delay?: number;
  /** Delay before the first word, in milliseconds. */
  startDelay?: number;
  className?: string;
  /** Enter direction for the blur travel. */
  direction?: TextBlurRevealDirection;
  /** Travel distance in pixels. */
  distance?: number;
  /** IntersectionObserver threshold (0 to 1). */
  threshold?: number;
  /** Duration of each keyframe step, in seconds. */
  stepDuration?: number;
}

export function TextBlurReveal({
  lines,
  delay = 200,
  startDelay = 0,
  className,
  direction = 'top',
  distance = 50,
  threshold = 0.1,
  stepDuration = 0.35,
}: TextBlurRevealProps) {
  const [inView, setInView] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const ref = React.useRef<HTMLParagraphElement>(null);

  const fromY = direction === 'top' ? -distance : distance;
  const midY = direction === 'top' ? distance / 10 : -distance / 10;
  const totalDuration = Math.max(0.1, stepDuration * 2);
  const text = lines.join(' ');

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  React.useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, reduceMotion]);

  if (reduceMotion) {
    return (
      <p className={className} ref={ref}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    );
  }

  let stagger = 0;

  return (
    <p className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <span key={lineIndex} className="flex flex-wrap" aria-hidden="true">
            {words.map((word, wordIndex) => {
              const index = stagger;
              stagger += 1;
              return (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  className="inline-block"
                  initial={{ filter: 'blur(10px)', opacity: 0, y: fromY }}
                  animate={
                    inView
                      ? {
                          filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                          opacity: [0, 0.5, 1],
                          y: [fromY, midY, 0],
                        }
                      : { filter: 'blur(10px)', opacity: 0, y: fromY }
                  }
                  transition={{
                    duration: totalDuration,
                    times: [0, 0.5, 1],
                    delay: (startDelay + index * delay) / 1000,
                    ease: 'easeOut',
                  }}
                >
                  {word}
                  {wordIndex < words.length - 1 ? ' ' : null}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

export default TextBlurReveal;
