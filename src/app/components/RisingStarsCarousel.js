"use client"
import { motion, useAnimation } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Enhanced fallback data with real streamer info from your API
const fallbackPlayers = [
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

// Function to get avatar based on display name
const getAvatarForStreamer = (displayName) => {
  const avatarMap = {
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
    MHFiroz: "/Streamers/Torpedo.jpg", // Default fallback
  }

  return avatarMap[displayName] || "/Streamers/Torpedo.jpg" // Use actual image instead of placeholder
}

// Function to get background image based on game
const getGameBackground = (games) => {
  if (!games || games.length === 0)
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"

  const game = games[0].toLowerCase()
  if (game.includes("valorant")) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  } else if (game.includes("pubg")) {
    return "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
  } else {
    return "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
}

// Function to get border color based on plan or random
const getBorderColor = (index) => {
  const colors = [
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
  return colors[index % colors.length]
}

export default function RisingStarsCarousel() {
  const [streamers, setStreamers] = useState(fallbackPlayers)
  const [loading, setLoading] = useState(false) // Start with false since we have good fallback data
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentX, setCurrentX] = useState(0)
  const [apiStatus, setApiStatus] = useState("fallback") // 'loading', 'success', 'error', 'fallback'
  const controls = useAnimation()

  useEffect(() => {
    const fetchStreamers = async () => {
      // Only try to fetch in production or if explicitly testing
      const shouldFetchAPI =
        process.env.NODE_ENV === "production" ||
        window.location.hostname === "slicenshare.com" ||
        window.location.hostname.includes("vercel.app")

      if (!shouldFetchAPI) {
        console.log("🔧 Development mode: Using enhanced fallback data with real streamer info")
        setApiStatus("fallback")
        return
      }

      try {
        setLoading(true)
        setApiStatus("loading")

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

        const response = await fetch("https://api.slicenshare.com/api/v1/auth/streamers", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const apiData = await response.json()

          if (apiData.success && apiData.data && apiData.data.length > 0) {
            // Transform API data to match our component structure
            const transformedStreamers = apiData.data.map((streamer, index) => ({
              ...streamer,
              avatar: getAvatarForStreamer(streamer.displayName),
              gameImage: getGameBackground(streamer.primaryGameTitles),
              borderColor: getBorderColor(index),
            }))

            setStreamers(transformedStreamers)
            setApiStatus("success")
            console.log("✅ Successfully loaded", apiData.count, "streamers from API")
          } else {
            throw new Error("Invalid API response structure")
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        setApiStatus("error")
        if (error.name === "AbortError") {
          console.log("⚠️ API request timed out, using enhanced fallback data")
        } else if (error.message.includes("CORS")) {
          console.log("🔒 CORS restriction detected, using enhanced fallback data")
        } else {
          console.log("⚠️ API error, using enhanced fallback data:", error.message)
        }
        // Keep using enhanced fallback data
        setStreamers(fallbackPlayers)
      } finally {
        setLoading(false)
      }
    }

    // Only try to fetch if we're in the browser (not during SSR)
    if (typeof window !== "undefined") {
      fetchStreamers()
    }
  }, [])

  // Create infinite loop by tripling the array
  const infiniteCards = [...streamers, ...streamers, ...streamers]
  const cardWidth = 300 // Width of each card including gap
  const totalWidth = streamers.length * cardWidth

  // Continuous scroll animation
  useEffect(() => {
    if (!isHovered && !isPaused && streamers.length > 0 && !loading) {
      const startContinuousScroll = async () => {
        await controls.start({
          x: [currentX, currentX - totalWidth],
          transition: {
            duration: streamers.length * 8,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        })
      }
      startContinuousScroll()
    } else {
      controls.stop()
    }
  }, [isHovered, isPaused, controls, totalWidth, streamers.length, currentX, loading])

  const handlePrevious = () => {
    setIsPaused(true)
    const targetX = currentX + cardWidth
    setCurrentX(targetX)

    controls.start({
      x: targetX,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    })

    setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  const handleNext = () => {
    setIsPaused(true)
    const targetX = currentX - cardWidth
    setCurrentX(targetX)

    controls.start({
      x: targetX,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    })

    setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  const getStatusMessage = () => {
    switch (apiStatus) {
      case "loading":
        return { text: "Loading live streamer data...", color: "text-blue-500", icon: "🔄" }
      case "success":
        return { text: `Live data from ${streamers.length} streamers`, color: "text-green-500", icon: "✅" }
      case "error":
        return { text: "API temporarily unavailable - showing featured streamers", color: "text-yellow-500", icon: "⚠️" }
      case "fallback":
      default:
        return { text: `Featuring ${streamers.length} rising stars`, color: "text-purple-500", icon: "⭐" }
    }
  }

  const status = getStatusMessage()

  if (loading) {
    return (
      <section className="relative -mt-[400px] z-30 py-32" style={{ top: "-10%" }}>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl relative">
            <div className="text-center mb-12">
              <h2 className="rising-title">THE RISING STARS</h2>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading our amazing streamers...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rising-carousel-section">
      <div className="w-full flex justify-center">
        <div className="rising-carousel-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rising-carousel-header"
          >
            <h4 className="h4-alt rising-carousel-title">THE RISING STARS</h4>
            {/* Enhanced status indicator */}
            <p className="body rising-carousel-subtitle">Meet Our 10 July Stars</p>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="rising-carousel-nav-btn left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="rising-carousel-nav-btn right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Container with Fade Edges */}
          <div className="rising-carousel-fade-container">
            {/* Left Fade Overlay */}
            <div className="rising-carousel-fade left"></div>

            {/* Right Fade Overlay */}
            <div className="rising-carousel-fade right"></div>

            <div
              className="rising-carousel-overflow"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="rising-carousel-track"
                animate={controls}
                style={{ width: `${infiniteCards.length * cardWidth}px` }}
              >
                {infiniteCards.map((player, index) => (
                  <motion.div
                     key={`${player.displayName}-${index}`}
                    className="rising-star-card"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Card Container */}
                    <div className="rising-star-card-inner">
                      {/* Top Section - Background Game Image (50% height) */}
                      <div className="rising-star-card-top" style={{ height: 'auto' }}>
                        <img
                          src={player.gameImage || getGameBackground(player.primaryGameTitles)}
                          alt={`${player.displayName} background`}
                         className="rising-star-card-bg"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                          }}
                        />
                        <div className="rising-star-card-bg-gradient"></div>

                        {/* Player Avatar - Centered in the background section */}
                        <div className="rising-star-avatar-container">
                          <div
                            className={`rising-star-avatar ${player.borderColor || "border-white"}`}
                          >
                            <img
                              src={player.avatar || getAvatarForStreamer(player.displayName)}
                              alt={player.displayName}
                              className="rising-star-avatar-img"
                              onError={(e) => {
                                e.target.src = "/Streamers/Torpedo.jpg"
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Solid Dark Background (50% height) */}
                      <div className="rising-star-card-bottom" style={{ height: 'auto' }}>
                        <div className="rising-star-name" style={{ padding: '16px' }}>
                          <h3 className="player-name-gradient h4-alt">
                            {player.displayName}
                          </h3>
                        </div>
                        <div className="rising-star-social" style={{ width: '100%', height: 'min-content', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '8px 0', background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, #000 50%, rgba(0,0,0,0) 100%)' }}>
                          {player.socials?.slice(0, 3).map((social, socialIndex) => (
                            <motion.a
                              key={socialIndex}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rising-star-social-icon"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {social.platform === "YouTube" && (
                                <svg className="rising-star-social-svg youtube" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                 </svg>
                              )}
                              {social.platform === "Facebook" && (
                                <svg className="rising-star-social-svg facebook" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                 </svg>
                              )}
                              {social.platform === "Twitch" && (
                                <svg className="rising-star-social-svg twitch" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                                 </svg>
                              )}
                              {!["YouTube", "Facebook", "Twitch"].includes(social.platform) && (
                                <svg className="rising-star-social-svg other" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                 </svg>
                              )}
                            </motion.a>
                          ))}
                        </div>
                        <div className="rising-star-game-info">
                          <div className="rising-star-info-group" style={{ boxSizing: 'border-box', width: '100%', height: 'min-content', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '24px', overflow: 'hidden', alignContent: 'flex-start', flexWrap: 'nowrap', gap: '16px', borderRadius: 0 }}>
                            {/* Info cell 1: Plays */}
                            <div className="rising-star-info-cell" style={{ width: '256px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px', position: 'relative', padding: 0 }}>
                              <div className="rising-star-info-icon" style={{ display: 'flex', alignItems: 'center', padding: '1px 0 0 0' }}>
                                <svg className="rising-star-game-icon" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="rising-star-info-text" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <span className="caption-1" style={{ color: 'rgba(255,255,255,0.56)' }}>Plays</span>
                                <span className="body-s" style={{ color: '#fff' }}>{player.primaryGameTitles?.filter((game) => game !== "N/A").join(", ") || "Various Games"}</span>
                              </div>
                            </div>
                            {/* Info cell 2: Status */}
                            <div className="rising-star-info-cell" style={{ width: '256px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px', position: 'relative', padding: 0 }}>
                              <div className="rising-star-info-icon" style={{ display: 'flex', alignItems: 'center', padding: '1px 0 0 0' }}>
                                <svg className="rising-star-status-icon" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="rising-star-info-text" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <span className="caption-1" style={{ color: 'rgba(255,255,255,0.56)' }}>Status</span>
                                <span className="body-s" style={{ color: '#fff' }}>{player.isSponsored ? "SPONSORED PLAYER" : "RISING STAR"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
