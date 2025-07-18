import { useEffect, useRef } from 'react'
const MouseFollower = () => {
  const followerRef = useRef(null)

  useEffect(() => {
    const follower = followerRef.current
    let mouseX = 0  
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15
      if (follower) {
        follower.style.transform = `translate3d(${currentX - 15}px, ${currentY - 15}px, 0)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={followerRef}
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
        transition: 'background 0.2s'
      }}
    />
  )
}
export default MouseFollower