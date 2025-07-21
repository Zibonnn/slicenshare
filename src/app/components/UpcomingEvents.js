"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import EventInterestModal from "./EventInterestModal"

const events = [
  {
    title: "Slice N Share Tournament",
    description: "Get ready to battle it out! Big prizes, bigger glory.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "University of Dhaka",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Campus Ambassador Program",
    description: "Host games, gain perks and opportunities.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "North South University Auditorium",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Meet-Up & Concert Vibes",
    description: "Gamers, fans & music—an epic night awaits! Network, chill & enjoy live beats.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "South East University",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

export default function UpcomingEvents() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleEventInterest = (event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <section id="events" className="upcoming-events-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="upcoming-events-header"
        >
          <h2 className="h4-alt" style={{ marginBottom: 24 }}>
            UPCOMING EVENTS
          </h2>
        </motion.div>

        <div className="upcoming-events-grid-wrapper">
          <div className="upcoming-events-grid">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="upcoming-event-card"
                whileHover={{ scale: 1.02 }}
              >
                {/* Event Image */}
                <div className="upcoming-event-image-container">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="upcoming-event-image"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Event Content */}
                <div className="upcoming-event-content">
                  {/* Event Title with Gradient */}
                  <h3 className="h4 gradient-text-primary-no-center" style={{ marginBottom: 12 }}>{event.title}</h3>

                  {/* Event Description */}
                  <p className="body-s" style={{ marginBottom: 24, color: "var(--white-64)" }}>{event.description}</p>

                  {/* Date and Time */}
                  <div className="upcoming-event-meta-row">
                    <div className="upcoming-event-meta-item">
                      <svg className="upcoming-event-meta-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="caption-1">{event.date}</span>
                    </div>
                    <div className="upcoming-event-meta-item">
                      <svg className="upcoming-event-meta-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="caption-1">{event.time}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="upcoming-event-meta-row" style={{ marginBottom: 24 }}>
                    <div className="upcoming-event-meta-item">
                      <svg className="upcoming-event-meta-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="caption-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Interested Button */}
                  <motion.button
                    onClick={() => handleEventInterest(event)}
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ gap: "8px", marginTop: "8px" }}
                  >
                    <span className="subhead">Interested</span>
                    <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Interest Modal */}
      <EventInterestModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        eventTitle={selectedEvent?.title}
        eventImage={selectedEvent?.image}
      />
    </section>
  )
}
