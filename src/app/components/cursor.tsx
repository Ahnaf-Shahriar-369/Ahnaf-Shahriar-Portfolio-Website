import { useEffect, useRef, useState, CSSProperties } from 'react';

type Point = { x: number; y: number };
const easeFactor = 0.15;

// Map tags to CSS classes
const tagToVariant: Record<string, string> = {
  a: 'cursor--link',
  button: 'cursor--button',
  img: 'cursor--img',
  video: 'cursor--video',
  input: 'cursor--input',
  textarea: 'cursor--textarea',
  table: 'cursor--table',
  tr: 'cursor--tr',
  td: 'cursor--td',
  th: 'cursor--th',
  ul: 'cursor--ul',
  ol: 'cursor--ol',
  nav: 'cursor--nav',
  header: 'cursor--header',
  footer: 'cursor--footer',
  code: 'cursor--code',
  pre: 'cursor--pre',
  blockquote: 'cursor--blockquote',
  // ...add more as needed
};

const isTouchDevice = () =>
  typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );

const Cursor: React.FC = () => {
  const target = useRef<Point>({ x: 0, y: 0 });
  const pos    = useRef<Point>({ x: 0, y: 0 });
  const [, setTick] = useState<number>(0);
  const [variant, setVariant] = useState<string>('');
  const [hidden, setHidden]   = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(true);

  // Disable on touch devices
  useEffect(() => {
    if (isTouchDevice()) setEnabled(false);
  }, []);

  // Track mouse & element
  useEffect(() => {
    if (!enabled) return;
    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      setVariant(tagToVariant[tag] || '');
    };
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('blur', onMouseLeave);
    window.addEventListener('focus', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('blur', onMouseLeave);
      window.removeEventListener('focus', onMouseEnter);
    };
  }, [enabled]);

  // Smooth trailing
  useEffect(() => {
    if (!enabled) return;
    let frameId: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * easeFactor;
      pos.current.y += (target.current.y - pos.current.y) * easeFactor;
      setTick(t => t + 1);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [enabled]);

  if (!enabled) return null;

  const style: CSSProperties = {
    left: `${pos.current.x}px`,
    top:  `${pos.current.y}px`,
  };
  const classes = ['cursor', variant, hidden && 'cursor--hidden']
    .filter(Boolean)
    .join(' ');

  return <div className={classes} style={style} />;
};

export default Cursor;