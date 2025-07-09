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
      // Always try to fetch from API, fallback to local data if it fails
      const shouldFetchAPI = true

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
                    className="framer-1jtzne7"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background:
                        "linear-gradient(180deg, var(--token-71433ee0-fb28-45f3-9aa2-484c17fef004, rgb(0, 0, 0)) 0%, rgb(23, 23, 23) 100%)",
                      borderRadius: 12,
                      width: 256,
                      minHeight: 'min-content',
                      overflow: 'hidden',
                      padding: 0,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignContent: 'center',
                      flexWrap: 'nowrap',
                      gap: 0,
                      justifyContent: 'flex-start',
                    }}
                  >
                    {/* Top Section - Background Game Image */}
                    <div className="framer-1rzyc1f" style={{ width: '100%', position: 'relative', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, overflow: 'hidden' }}>
                      <img
                        src={player.gameImage || getGameBackground(player.primaryGameTitles)}
                        alt={`${player.displayName} background`}
                        className="rising-star-card-bg"
                        crossOrigin="anonymous"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                        onError={e => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        }}
                      />
                      <div className="framer-6495gp" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 2 }} />
                      {/* Player Avatar - Centered */}
                      <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div
                          className="framer-1jtj5fw"
                          style={{
                            width: 128,
                            height: 128,
                            aspectRatio: '1/1',
                            borderRadius: 64,
                            overflow: 'hidden',
                            background: '#fff',
                            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.3)',
                            borderBottom: '4px solid var(--sns-purple, #8117f1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={player.avatar || getAvatarForStreamer(player.displayName)}
                            alt={player.displayName}
                            className="rising-star-avatar-img"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 64 }}
                            onError={e => {
                              e.target.src = "/Streamers/Torpedo.jpg"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Info Area */}
                    <div className="framer-11tzp1t" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, gap: 0 }}>
                      <div className="framer-gp47k7" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '24px 0 0 0' }}>
                        <h3 className="player-name-gradient h4-alt" style={{ textAlign: 'center', margin: 0 }}>
                          {player.displayName}
                        </h3>
                        <div className="framer-1pls46z" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, padding: '8px 0', background: 'linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 50%, rgba(0,0,0,0) 100%)' }}>
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
                                <img 
                                  src="/icons/yt.png" 
                                  srcSet="/icons/yt.png 1x, /icons/yt@2x.png 2x"
                                  alt="YouTube"
                                  className="rising-star-social-img"
                                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                />
                              )}
                              {social.platform === "Facebook" && (
                                <img 
                                  src="/icons/fb.png" 
                                  srcSet="/icons/fb.png 1x, /icons/fb@2x.png 2x"
                                  alt="Facebook"
                                  className="rising-star-social-img"
                                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                />
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
                      </div>
                      <div className="framer-15yvq5m" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, padding: 24 }}>
                        {/* Info cell 1: Plays */}
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '1px 0 0 0' }}>
                            <img 
                              src="/icons/controller.png" 
                              alt="Controller"
                              className="rising-star-game-icon"
                              style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span className="caption-1">Plays</span>
                            <span className="body-s">{player.primaryGameTitles?.filter((game) => game !== "N/A").join(", ") || "Various Games"}</span>
                          </div>
                        </div>
                        {/* Info cell 2: Status */}
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '1px 0 0 0' }}>
                            <img 
                              src="/icons/Medal.png" 
                              alt="Medal"
                              className="rising-star-status-icon"
                              style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span className="caption-1">Status</span>
                            <span className="body-s">{player.isSponsored || player.status === "sponsored" ? "SPONSORED PLAYER" : "RISING STAR"}</span>
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
