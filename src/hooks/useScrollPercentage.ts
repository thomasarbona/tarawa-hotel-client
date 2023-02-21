import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface RenderProps {
  percentage: number;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
  ref: React.RefObject<any> | ((node?: Element | null) => void);
}

export interface ScrollPercentageOptions extends IntersectionObserverInit {
  /** Number between 0 and 1 indicating the the percentage that should be visible before triggering */
  threshold?: number;
  /** Horizontal scroll mode (true/false) */
  horizontal?: boolean;
}

export interface ScrollPercentageProps extends ScrollPercentageOptions {
  /**
   * Children expects a function that receives an object
   * contain an `inView` boolean and `ref` that should be
   * assigned to the element root.
   */
  children: (fields: RenderProps) => React.ReactNode;

  /** Call this function whenever the in view state changes */
  onChange?: (percentage: number, entry?: IntersectionObserverEntry) => void;
}

/**
 * Types specific to the PlainChildren rendering of InView
 * */
export interface ScrollPercentagePlainChildrenProps
  extends ScrollPercentageOptions {
  children: React.ReactNode;

  /**
   * Render the wrapping element as this element.
   * @default `'div'`
   */
  as?: React.ComponentType<any>;

  /** Call this function whenever the in view state changes */
  onChange?: (percentage: number, entry?: IntersectionObserverEntry) => void;
}

export type ScrollPercentageHookResponse = [
  (node?: Element | null) => void,
  number,
  IntersectionObserverEntry | undefined,
];
/**
 * Create a hook that reports the percentage an element is scrolled into the viewport.
 * @param options {ScrollPercentageOptions}
 */
export function useScrollPercentage(
  options: ScrollPercentageOptions = {},
): ScrollPercentageHookResponse {
  const [ref, inView, entry] = useInView({ ...(options as any) });
  const [percentage, setPercentage] = useState(0);
  const target = entry && entry.target;

  useEffect(() => {
    const handleScroll = () => {
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const percentage = options.horizontal
        ? calculateHorizontalPercentage(
            bounds,
            options.threshold,
            options.root as any,
          )
        : calculateVerticalPercentage(
            bounds,
            options.threshold,
            options.root as any,
          );

      setPercentage(percentage);
    };

    if (inView) {
      const root = options.root || window;
      root.addEventListener('scroll', handleScroll, { passive: true });
      root.addEventListener('resize', handleScroll);

      return () => {
        root.removeEventListener('scroll', handleScroll);
        root.removeEventListener('resize', handleScroll);
      };
    }

    // Trigger a scroll update, so we set the initial scroll percentage
    handleScroll();
    return;
  }, [inView, options.root, options.horizontal, options.threshold, target]);

  return [ref, percentage, entry];
}

export function calculateVerticalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0;
  const vh =
    (root instanceof Element ? root.clientHeight : root.innerHeight) || 0;
  const offset = threshold * bounds.height;
  const percentage =
    (bounds.bottom - offset) / (vh + bounds.height - offset * 2);

  return 1 - Math.max(0, Math.min(1, percentage));
}

export function calculateHorizontalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0;
  const vw =
    (root instanceof Element ? root.clientWidth : root.innerWidth) || 0;
  const offset = threshold * bounds.width;
  const percentage = (bounds.right - offset) / (vw + bounds.width - offset * 2);

  return 1 - Math.max(0, Math.min(1, percentage));
}
