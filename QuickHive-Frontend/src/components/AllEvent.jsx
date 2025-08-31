import React, { useState, useEffect } from "react";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Music': 'from-purple-500 to-pink-500',
      'Technology': 'from-blue-500 to-cyan-500',
      'Wellness': 'from-green-500 to-emerald-500',
      'Sports': 'from-orange-500 to-red-500',
      'Arts': 'from-indigo-500 to-purple-500',
      'Business': 'from-slate-500 to-gray-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
            <p className="mt-4 text-lg text-slate-600 font-medium">Loading amazing events...</p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                onClick={fetchEvents}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main events container */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              All Events
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover amazing events happening around you. From music festivals to tech conferences, find your next adventure.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={event._id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(event._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${getCategoryColor(event.category)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {event.category}
                  </div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={event.imageUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"}
                      alt={event.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 via-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm font-medium mb-1">Click to explore</p>
                        <div className="w-8 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {event.description.length > 120
                        ? `${event.description.substring(0, 120)}...`
                        : event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-slate-600">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
                          <p className="text-sm font-medium">{formatDate(event.eventDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-slate-600">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">Time</p>
                          <p className="text-sm font-medium">{formatTime(event.eventTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-slate-600">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">Location</p>
                          <p className="text-sm font-medium">{event.eventLocation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Info & Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.ticketType === 'Free'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.ticketType}
                        </span>
                        {event.ticketType === 'Paid' && event.tickets && event.tickets.length > 0 && (
                          <span className="text-sm font-semibold text-slate-700">
                            From ₹{Math.min(...event.tickets.map(ticket => ticket.price))}
                          </span>
                        )}
                      </div>

                      <button
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
                        onClick={() => handleViewDetails(event)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">No Events Available</h3>
                  <p className="text-slate-600 mb-6">Check back later for upcoming events and amazing experiences!</p>
                  <button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    onClick={fetchEvents}
                  >
                    Refresh Events
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Modal for viewing event details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className={`relative bg-gradient-to-r ${getCategoryColor(selectedEvent.category)} p-8 text-white`}>
              <button
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start space-x-6">
                <img
                  src={selectedEvent.imageUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"}
                  alt={selectedEvent.title}
                  className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedEvent.title}</h2>
                  <p className="text-white/90 text-lg mb-4">{selectedEvent.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      {selectedEvent.category}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedEvent.ticketType === 'Free'
                        ? 'bg-green-500/20 text-green-100'
                        : 'bg-yellow-500/20 text-yellow-100'
                    }`}>
                      {selectedEvent.ticketType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Event Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 uppercase tracking-wide">Date</p>
                          <p className="text-lg font-semibold text-slate-800">{formatDate(selectedEvent.eventDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 uppercase tracking-wide">Time</p>
                          <p className="text-lg font-semibold text-slate-800">{formatTime(selectedEvent.eventTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 uppercase tracking-wide">Location</p>
                          <p className="text-lg font-semibold text-slate-800">{selectedEvent.eventLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Ticket Information
                  </h3>

                  {selectedEvent.ticketType === 'Free' ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-green-800 mb-2">Free Event</h4>
                      <p className="text-green-700">No ticket required! Just show up and enjoy.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedEvent.tickets && selectedEvent.tickets.length > 0 ? (
                        selectedEvent.tickets.map((ticket, index) => (
                          <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-bold text-slate-800">{ticket.type}</h4>
                                <p className="text-slate-600">Available: {ticket.quantity} tickets</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-indigo-600">₹{ticket.price}</p>
                              </div>
                            </div>

                            {ticket.saleStart && ticket.saleEnd && (
                              <div className="text-sm text-slate-500">
                                <p>Sale Period: {new Date(ticket.saleStart).toLocaleDateString()} - {new Date(ticket.saleEnd).toLocaleDateString()}</p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-yellow-800 mb-2">Ticket Info Unavailable</h4>
                          <p className="text-yellow-700">Please contact the organizer for ticket details.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-8 py-6 flex justify-end space-x-4">
              <button
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-200"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                {selectedEvent.ticketType === 'Free' ? 'RSVP Now' : 'Get Tickets'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;
