import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Adapted from the 21st.dev "Hover Expand" component (@educalvolpz): an accordion
// image gallery where the hovered, focused, or tapped panel grows and the others
// narrow. Changes for MFH: brand tokens and type, a row on desktop that stacks into
// a column on phones and tablets, labels that stay upright (three panels are wide
// enough), and
// descriptions kept in the markup for every panel so the copy is in the static HTML.
// The grow animation is a CSS transition, so no animation library is needed.

export interface HoverExpandItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  alt?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  /** Panel that starts expanded. */
  defaultIndex?: number;
  expandedFlex?: number;
  collapsedFlex?: number;
  className?: string;
}

export default function HoverExpand({
  items,
  defaultIndex = 0,
  expandedFlex = 3,
  collapsedFlex = 1,
  className,
}: HoverExpandProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverDevice(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsHoverDevice(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    if (!forward && !backward) return;

    event.preventDefault();
    const next = forward ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
    setActiveIndex(next);
    panelRefs.current[next]?.focus();
  };

  return (
    <div className={cn('flex h-[620px] w-full flex-col gap-2.5 lg:h-[460px] lg:flex-row lg:gap-3', className)}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={item.id}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              if (!isHoverDevice) setActiveIndex(index);
            }}
            onFocus={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onMouseEnter={() => {
              if (isHoverDevice) setActiveIndex(index);
            }}
            style={{ flexGrow: isActive ? expandedFlex : collapsedFlex, flexBasis: 0 }}
            className="relative m-0 block min-h-0 min-w-0 cursor-pointer appearance-none overflow-hidden rounded-2xl border-0 bg-navy p-0 text-left font-[inherit] shadow-[0_18px_50px_-24px_rgba(0,53,92,0.55)] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-gold-soft motion-reduce:transition-none"
          >
            <img
              src={item.image}
              alt={item.alt ?? item.title}
              width={1000}
              height={667}
              loading="lazy"
              draggable={false}
              className={cn(
                'absolute inset-0 h-full w-full max-w-none object-cover transition-[transform,filter] duration-700 ease-out motion-reduce:transition-none',
                isActive ? 'scale-100 brightness-100' : 'scale-105 brightness-[0.72]',
              )}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[rgba(0,21,38,0.92)] via-[rgba(0,33,58,0.25)] to-transparent"
            />
            <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 lg:p-6">
              <span
                aria-hidden="true"
                className={cn(
                  'mb-3 block h-1 rounded-sm bg-gold transition-[width] duration-500 ease-out motion-reduce:transition-none',
                  isActive ? 'w-14' : 'w-6',
                )}
              />
              <span className="block font-display text-[clamp(1.15rem,1.7vw,1.55rem)] font-black uppercase leading-none tracking-tight text-white">
                {item.title}
              </span>
              {item.description ? (
                <span
                  className={cn(
                    'block max-w-[46ch] overflow-hidden text-[1rem] leading-snug text-[#d8e6f3] transition-[max-height,opacity,margin] duration-500 ease-out motion-reduce:transition-none',
                    isActive ? 'mt-2.5 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0',
                  )}
                >
                  {item.description}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
