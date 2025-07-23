import { useEffect, useRef } from 'react';
import Image from 'next/image';
import tagCanvas from 'tag-canvas';

// All skill logos
const skills = [
  { name: 'bootstrap', logo: '/bootstrap-logo.png' },
  { name: 'css', logo: '/css-logo.png' },
  { name: 'material', logo: '/material-logo.png' },
  { name: 'express', logo: '/express-logo.png' },
  { name: 'shadecn', logo: '/shadecn-logo.png' },
  { name: 'git', logo: '/git-logo.png' },
  { name: 'github', logo: '/github-logo.png' },
  { name: 'html', logo: '/html-logo.png' },
  { name: 'javascript', logo: '/javascript-logo.png' },
  { name: 'mongodb', logo: '/mongodb-logo.png' },
  { name: 'prisma', logo: '/prisma-logo.png' },
  { name: 'nextjs', logo: '/nextjs-logo.png' },
  { name: 'nodejs', logo: '/nodejs-logo.png' },
  { name: 'react', logo: '/react-logo.png' },
  { name: 'redux', logo: '/redux-logo.png' },
  { name: 'sass', logo: '/sass-logo.png' },
  { name: 'tailwind', logo: '/tailwind-logo.png' },
  { name: 'vercel', logo: '/vercel-logo.png' },
  
  // ...
];

export default function LogoSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !listRef.current) return;

    try {
      tagCanvas.Start(
        'skillCanvas',
        'skillTags',
        {
          animate: true,
          initial: [0.1, -0.1],
          noMouse: false,
          dragControl: true,
          // ... (rest of the tagCanvas options remain the same)
          clickToFront: 500,
          minSpeed: 0.02,
          maxSpeed: 0.08,
          decel: 0.95,
          depth: 0.6,
          imageScale: 1.2,
          imageMode: 'both',
          reverse: false,
        }
      );
    } catch (e) {
      console.error('TagCanvas init failed', e);
    }

    return () => {
      try {
        tagCanvas.Delete('skillCanvas');
      } catch {}
    };
  }, []);

  return (
    <div className="logos">
      <canvas
        width={400}
        height={400}
        ref={canvasRef}
        id="skillCanvas"
      />
      <div ref={listRef} id="skillTags">
        {skills.map((skill, index) => (
          <div key={index}>
            <Image
              src={skill.logo}
              alt={skill.name}
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
}