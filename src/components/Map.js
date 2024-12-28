'use client'

import { useState, useEffect } from 'react'

export function Map() {
  const [scale, setScale] = useState(3)
  const [position, setPosition] = useState({ x: window.innerWidth/4, y: window.innerHeight/8 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [selectedNft, setSelectedNft] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setPosition({ x: window.innerWidth/4, y: window.innerHeight/8 })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault()
    }

    const mapContainer = document.getElementById('map-container')
    if (mapContainer) {
      mapContainer.addEventListener('wheel', preventDefault, { passive: false })
    }

    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', preventDefault)
      }
    }
  }, [])

  const images = Array.from({ length: 333 }, (_, i) => `/nfts/${i}.png`)

  const handleWheel = (e) => {
    e.preventDefault()
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1)
    setScale(Math.min(Math.max(0.5, newScale), 4))
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleImageClick = (index, e) => {
    if (!isDragging) {
      setSelectedNft(selectedNft === index ? null : index)
    }
  }

  return (
    <div className="w-full bg-gray-800">
      <h2 className="text-4xl font-bold text-center text-white mb-8 pt-16">
        Explore ALPHpaca's NFTs
      </h2>
      
      <div 
        id="map-container"
        className="w-full h-[50vh] overflow-hidden bg-gray-800 select-none relative"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: 'transform 0.1s ease-out',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          <div className="flex flex-wrap w-[1280px] relative">
            {images.map((src, index) => (
              <div key={index} className="relative w-16 h-16">
                <img
                  src={src}
                  alt={`ALPHpaca's #${index + 1}`}
                  className={`w-16 h-16 select-none cursor-pointer transition-all duration-300 absolute ${
                    selectedNft === index ? 'transform scale-150 z-50 shadow-lg' : ''
                  }`}
                  draggable="false"
                  onClick={(e) => handleImageClick(index, e)}
                  style={{ 
                    display: 'block',
                    lineHeight: 0,
                    fontSize: 0
                  }}
                />
                {selectedNft === index && (
                  <div 
                    className="absolute left-20 top-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 rounded whitespace-nowrap z-50"
                  >
                    ALPHpaca's #{index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
