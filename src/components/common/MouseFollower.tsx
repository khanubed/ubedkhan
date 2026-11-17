'use client';

import { useEffect, useRef } from 'react';

export default function MouseFollower() {
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    // Do not mount on devices without pointer/hover (mobile)
    if (window.matchMedia('(pointer: coarse)').matches) {
      follower.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      if (follower) {
        follower.style.transform = `translate3d(${currentX - 15}px, ${currentY - 15}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: '#ffffff',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'background 0.2s',
      }}
    />
  );
}
