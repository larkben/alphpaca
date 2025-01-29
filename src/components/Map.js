'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaExpand, FaCompress } from 'react-icons/fa'

const Map = () => {
  const [scale, setScale] = useState(3)
  const [position, setPosition] = useState({ x: 350, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [selectedNft, setSelectedNft] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden
        ${isFullscreen ? 'fixed inset-0 z-[100]' : ''}`}
    >
      <div className="absolute top-4 right-4 flex gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800/80 rounded-lg text-green-400 hover:text-green-300 transition-colors"
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </motion.button>
      </div>

      <div className="p-8">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-8"
        >
          Explore ALPHpaca&apos;s NFTs
        </motion.h2>

        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScale(Math.max(0.5, scale - 0.2))}
            className="p-2 bg-gray-800/80 rounded-lg text-green-400 hover:text-green-300 transition-colors"
          >
            -
          </motion.button>
          <div className="px-4 py-2 bg-gray-800/80 rounded-lg text-green-400">
            {Math.round(scale * 100)}%
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScale(Math.min(4, scale + 0.2))}
            className="p-2 bg-gray-800/80 rounded-lg text-green-400 hover:text-green-300 transition-colors"
          >
            +
          </motion.button>
        </div>
        
        <div 
          id="map-container"
          className={`w-full overflow-hidden bg-gray-900/50 rounded-xl border border-gray-700/30 select-none relative
            ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[50vh]'}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div 
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
                <motion.div 
                  key={index} 
                  className={`relative w-16 h-16 transition-all duration-300
                    ${selectedNft === index ? 'z-50' : 'z-0'}`}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      scale: selectedNft === index ? 1.2 : 1,
                      zIndex: selectedNft === index ? 50 : 'auto'
                    }}
                  >
                    <img
                      src={src}
                      alt={`ALPHpaca's #${index + 1}`}
                      className={`w-16 h-16 select-none cursor-pointer transition-all duration-300 rounded-lg
                        ${selectedNft === index ? 'ring-2 ring-green-400 shadow-lg shadow-green-500/20' : ''}`}
                      draggable="false"
                      onClick={(e) => handleImageClick(index, e)}
                      style={{ 
                        display: 'block',
                        lineHeight: 0,
                        fontSize: 0
                      }}
                    />
                    {selectedNft === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 
                          bg-gray-900/90 text-green-400 px-2 py-1 rounded-lg whitespace-nowrap 
                          border border-gray-700/50 shadow-xl backdrop-blur-sm text-xs"
                      >
                        <div>ALPHpaca #{index + 1}</div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Map
