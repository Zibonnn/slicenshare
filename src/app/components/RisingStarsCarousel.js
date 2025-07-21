"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Constants
const CARD_WIDTH = 300
const SCROLL_SPEED = 1
const SCROLL_INTERVAL = 50
const PAUSE_DURATION = 3000

// Types (for better code organization)
const STREAMER_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  FALLBACK: 'fallback'
}

// Data
const FALLBACK_STREAMERS = [
  {
    displayName: "TorpedoGaming",
    fullName: "Rifat Khondokar",
    avatar: "/Streamers/Torpedo.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/gaming/torpedo.gaming.bd" },
      { platform: "YouTube", url: "https://www.youtube.com/@torpedo.121" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    displayName: "DeathTrio",
    fullName: "Nasif Ahmed",
    avatar: "/Streamers/DeathTrio.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/deathtrio/" },
      { platform: "YouTube", url: "https://www.youtube.com/@DeathTrio99" },
    ],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
  {
    displayName: "InsaneRuly",
    fullName: "Atik Yasir Risad",
    avatar: "/Streamers/InsaneRuly.jpg",
    primaryGameTitles: ["PUBG PC"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/InsaneRuly" },
      { platform: "YouTube", url: "https://www.youtube.com/@insaneruly2392" },
    ],
    isSponsored: false,
    borderColor: "border-yellow-500",
  },
  {
    displayName: "Moonstone",
    fullName: "Sabrina M Sarah",
    avatar: "/Streamers/Moonstone.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/themoonstone98" },
      { platform: "YouTube", url: "https://www.youtube.com/@moonstoneherself" },
    ],
    isSponsored: false,
    borderColor: "border-orange-500",
  },
  {
    displayName: "IkuSensei",
    fullName: "Mr. IKU",
    avatar: "/Streamers/MrIKU.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/ikusensei" },
      { platform: "YouTube", url: "https://www.youtube.com/@ikusensei2528" },
    ],
    isSponsored: false,
    borderColor: "border-green-500",
  },
  {
    displayName: "SavageSteam",
    fullName: "Raihanul Islam",
    avatar: "/Streamers/Savage.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [{ platform: "Facebook", url: "https://www.facebook.com/HHxSavage" }],
    isSponsored: false,
    borderColor: "border-blue-500",
  },
  {
    displayName: "ApySheikh",
    fullName: "Apy Sheikh",
    avatar: "/Streamers/sonic.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/16bmDrNYjU/" },
      { platform: "YouTube", url: "https://youtube.com/@sonicfps709?si=aKE-l228cUN3uomq" },
    ],
    isSponsored: false,
    borderColor: "border-cyan-500",
  },
  {
    displayName: "Swajan",
    fullName: "Effat Bin Hossain Swajan",
    avatar: "/Streamers/URLoveBlank.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/173Aa2eydL/?mibextid=qi2Omg" },
      { platform: "YouTube", url: "https://youtube.com/@urloveblank?si=tNtY5du6Y-mAFk7Z" },
    ],
    isSponsored: false,
    borderColor: "border-pink-500",
  },
  {
    displayName: "XtropeGaming",
    fullName: "ANAYET HOSSAIN",
    avatar: "/Streamers/Xenternite.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/xenterniteofficial" },
      { platform: "YouTube", url: "https://www.youtube.com/@xtropegaming" },
    ],
    isSponsored: false,
    borderColor: "border-indigo-500",
  },
  {
    displayName: "SifhPlays",
    fullName: "Md Abdulla Al Mamun",
    avatar: "/Streamers/Gameoverr.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/1CBnQpQ8js/" },
      { platform: "YouTube", url: "https://m.youtube.com/@sifh_plays" },
    ],
    isSponsored: false,
    borderColor: "border-teal-500",
  },
]

const AVATAR_MAP = {
  TorpedoGaming: "/Streamers/Torpedo.jpg",
  DeathTrio: "/Streamers/DeathTrio.jpg",
  InsaneRuly: "/Streamers/InsaneRuly.jpg",
  Moonstone: "/Streamers/Moonstone.jpg",
  IkuSensei: "/Streamers/MrIKU.jpg",
  SavageSteam: "/Streamers/Savage.jpg",
  ApySheikh: "/Streamers/sonic.jpg",
  Swajan: "/Streamers/URLoveBlank.jpg",
  XtropeGaming: "/Streamers/Xenternite.jpg",
  SifhPlays: "/Streamers/Gameoverr.jpg",
}

const BORDER_COLORS = [
  "border-white",
  "border-purple-500",
  "border-red-500",
  "border-yellow-500",
  "border-orange-500",
  "border-green-500",
  "border-blue-500",
  "border-cyan-500",
  "border-pink-500",
  "border-indigo-500",
  "border-teal-500",
]

// Utility functions
const getAvatarForStreamer = (displayName) => {
  return AVATAR_MAP[displayName] || "/Streamers/Torpedo.jpg"
}

const getGameBackground = (games) => {
  if (!games?.length) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }

  const game = games[0].toLowerCase()
  if (game.includes("valorant")) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  } else if (game.includes("pubg")) {
    return "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
  }
  return "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
}

const getBorderColor = (index) => {
  return BORDER_COLORS[index % BORDER_COLORS.length]
}

// Custom hooks
const useStreamersData = () => {
  const [streamers, setStreamers] = useState(FALLBACK_STREAMERS)
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState(STREAMER_STATUS.FALLBACK)

  const fetchStreamers = useCallback(async () => {
    if (typeof window === "undefined") return

    try {
      setLoading(true)
      setApiStatus(STREAMER_STATUS.LOADING)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const response = await fetch("https://api.slicenshare.com/api/v1/auth/streamers", {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const apiData = await response.json()

        if (apiData.success && apiData.data?.length > 0) {
          const transformedStreamers = apiData.data.map((streamer, index) => ({
            ...streamer,
            displayName: streamer.ingameName || streamer.displayName || streamer.name || streamer.username || `Streamer${index + 1}`,
            avatar: getAvatarForStreamer(streamer.ingameName || streamer.displayName || streamer.name || streamer.username),
            gameImage: getGameBackground(streamer.primaryGameTitles || streamer.games || streamer.gameTitles),
            borderColor: getBorderColor(index),
          }))

          setStreamers(transformedStreamers)
          setApiStatus(STREAMER_STATUS.SUCCESS)
        } else {
          throw new Error("Invalid API response structure")
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      setApiStatus(STREAMER_STATUS.ERROR)
      setStreamers(FALLBACK_STREAMERS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStreamers()
  }, [fetchStreamers])

  return { streamers, loading, apiStatus }
}

const useCarouselAnimation = (streamers, loading) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentX, setCurrentX] = useState(0)

  const totalWidth = useMemo(() => streamers.length * CARD_WIDTH, [streamers.length])

  useEffect(() => {
    if (isHovered || isPaused || !streamers.length || loading) return

    const interval = setInterval(() => {
      setCurrentX(prev => {
        const newX = prev - SCROLL_SPEED
        return newX <= -totalWidth ? 0 : newX
      })
    }, SCROLL_INTERVAL)

    return () => clearInterval(interval)
  }, [isHovered, isPaused, totalWidth, streamers.length, loading])

  const handleNavigation = useCallback((direction) => {
    setIsPaused(true)
    setCurrentX(prev => prev + (direction * CARD_WIDTH))
    
    setTimeout(() => setIsPaused(false), PAUSE_DURATION)
  }, [])

  return {
    isHovered,
    setIsHovered,
    currentX,
    handleNavigation
  }
}

// Components
const StatusIndicator = ({ apiStatus, streamersCount }) => {
  const getStatusConfig = () => {
    switch (apiStatus) {
      case STREAMER_STATUS.LOADING:
        return { text: "Loading live streamer data...", color: "text-blue-500", icon: "🔄" }
      case STREAMER_STATUS.SUCCESS:
        return { text: `Live data from ${streamersCount} streamers`, color: "text-green-500", icon: "✅" }
      case STREAMER_STATUS.ERROR:
        return { text: "API temporarily unavailable - showing featured streamers", color: "text-yellow-500", icon: "⚠️" }
      default:
        return { text: `Featuring ${streamersCount} rising stars`, color: "text-purple-500", icon: "⭐" }
    }
  }

  const config = getStatusConfig()

  return (
    <p className="body rising-carousel-subtitle">
      {config.icon} {config.text}
    </p>
  )
}

const NavigationButton = ({ direction, onClick, className }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  
  return (
    <button
      onClick={onClick}
      className={`rising-carousel-nav-btn ${className}`}
      aria-label={`Navigate ${direction}`}
    >
      <Icon size={24} />
    </button>
  )
}

const SocialIcon = ({ social }) => {
  const getIcon = () => {
    switch (social.platform) {
      case "YouTube":
        return (
          <img 
            src="/icons/yt.png"
            srcSet="/icons/yt.png 1x, /icons/yt@2x.png 2x"
            alt="YouTube"
            className="rising-star-social-img"
          />
        )
      case "Facebook":
        return (
          <img 
            src="/icons/fb.png"
            srcSet="/icons/fb.png 1x, /icons/fb@2x.png 2x"
            alt="Facebook"
            className="rising-star-social-img"
          />
        )
      case "Twitch":
        return (
          <svg className="rising-star-social-svg twitch" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
          </svg>
        )
      default:
        return (
          <svg className="rising-star-social-svg other" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        )
    }
  }

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rising-star-social-icon"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {getIcon()}
    </motion.a>
  )
}

const StreamerCard = ({ streamer, index }) => {
  return (
    <motion.div
      key={`${streamer.displayName}-${index}`}
      className="rising-star-card"
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Game Image */}
      <div className="rising-star-card-top">
        <img
          src={streamer.gameImage || getGameBackground(streamer.primaryGameTitles)}
          alt={`${streamer.displayName} background`}
          className="rising-star-card-bg"
          crossOrigin="anonymous"
          onError={e => {
            e.target.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          }}
        />
        <div className="rising-star-card-overlay" />
        
        {/* Player Avatar */}
        <div className="rising-star-avatar-container">
          <div className="rising-star-avatar">
            <img
              src={streamer.avatar || getAvatarForStreamer(streamer.displayName)}
              alt={streamer.displayName}
              className="rising-star-avatar-img"
              onError={e => {
                e.target.src = "/Streamers/Torpedo.jpg"
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="rising-star-card-info">
        <div className="rising-star-card-header">
          <h3 className="player-name-gradient h4-alt">
            {streamer.displayName}
          </h3>
          
          {/* Verified Gamer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%" }}>
            <span className="caption-1">Verified</span>
            <img 
              src="/Logo/Logo.png"
              alt="SNS Logo"
              style={{ width: "16px", height: "16px" }}
            />
            <span className="caption-1">Gamer</span>
          </div>
          
          <div className="rising-star-socials">
            {streamer.socials?.slice(0, 3).map((social, socialIndex) => (
              <SocialIcon key={socialIndex} social={social} />
            ))}
          </div>
        </div>
        
        <div className="rising-star-card-details">
          {/* Games */}
          <div className="rising-star-detail-item">
            <img 
              src="/icons/controller.png"
              alt="Controller"
              className="rising-star-detail-icon"
            />
            <div className="rising-star-detail-content">
              <span className="caption-1">Plays</span>
              <span className="body-s">
                {streamer.primaryGameTitles?.filter(game => game !== "N/A").join(", ") || "Various Games"}
              </span>
            </div>
          </div>
          
          {/* Status - Commented out for future use
          <div className="rising-star-detail-item">
            <img 
              src="/icons/Medal.png"
              alt="Medal"
              className="rising-star-detail-icon"
            />
            <div className="rising-star-detail-content">
              <span className="caption-1">Status</span>
              <span className="body-s">
                {streamer.isSponsored || streamer.status === "sponsored" ? "SPONSORED PLAYER" : "RISING STAR"}
              </span>
            </div>
          </div>
          */}
        </div>
      </div>
    </motion.div>
  )
}

const LoadingSpinner = () => (
  <section className="rising-carousel-section">
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl relative">
        <div className="text-center mb-12">
          <h2 className="rising-title">THE RISING STARS</h2>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading our amazing streamers...</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// Main Component
export default function RisingStarsCarousel() {
  const { streamers, loading, apiStatus } = useStreamersData()
  const { isHovered, setIsHovered, currentX, handleNavigation } = useCarouselAnimation(streamers, loading)

  const infiniteCards = useMemo(() => [...streamers, ...streamers, ...streamers], [streamers])
  const trackWidth = useMemo(() => infiniteCards.length * CARD_WIDTH, [infiniteCards.length])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <section className="rising-carousel-section">
      <div className="w-full flex justify-center">
        <div className="rising-carousel-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rising-carousel-header"
          >
            <h4 className="h4-alt rising-carousel-title">THE RISING STARS</h4>
            <p className="body rising-carousel-subtitle">Meet Our 10 July Stars</p>
          </motion.div>

          {/* Navigation Buttons */}
          <NavigationButton 
            direction="left" 
            onClick={() => handleNavigation(1)} 
            className="left" 
          />
          <NavigationButton 
            direction="right" 
            onClick={() => handleNavigation(-1)} 
            className="right" 
          />

          {/* Carousel Container */}
          <div 
            className="rising-carousel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlays */}
            <div className="rising-carousel-fade-left" />
            <div className="rising-carousel-fade-right" />
            
            {/* Carousel Track */}
            <motion.div
              className="rising-carousel-track"
              animate={{ x: currentX }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: `${trackWidth}px` }}
            >
              {infiniteCards.map((streamer, index) => (
                <StreamerCard key={`${streamer.displayName}-${index}`} streamer={streamer} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
