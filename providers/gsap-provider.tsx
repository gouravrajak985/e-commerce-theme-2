"use client";

import { ReactNode, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface CursorState {
  x: number;
  y: number;
}

export const GsapProvider = ({ children }: { children: ReactNode }) => {
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0 });
  const [cursorBig, setCursorBig] = useState(false);

  useEffect(() => {
    // Create cursor follower element
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #000;
      opacity: 0.5;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorFollower);

    // Create cursor follower large element
    const cursorFollowerLarge = document.createElement('div');
    cursorFollowerLarge.className = 'cursor-follower-large';
    cursorFollowerLarge.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid #000;
      border-radius: 50%;
      opacity: 0.2;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorFollowerLarge);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    // Handle interactive elements
    const handleMouseEnter = () => {
      setCursorBig(true);
    };

    const handleMouseLeave = () => {
      setCursorBig(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // GSAP animations for cursor followers
    gsap.to(cursorFollower, {
      x: cursor.x,
      y: cursor.y,
      duration: 0.1,
    });

    gsap.to(cursorFollowerLarge, {
      x: cursor.x,
      y: cursor.y,
      duration: 0.3,
      scale: cursorBig ? 1.5 : 1,
      ease: "power2.out",
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.removeChild(cursorFollower);
      document.body.removeChild(cursorFollowerLarge);
    };
  }, [cursor, cursorBig]);

  return <>{children}</>;
};