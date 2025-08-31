import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Testimonials = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('carousel');

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Attendee",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "EventHive made finding and attending events so much easier! The Summer Music Festival was absolutely incredible. The platform is intuitive and the event details were spot on.",
      event: "Summer Music Festival",
      category: "Music",
      date: "2024-07-20",
      location: "New York"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "As someone who attends multiple tech conferences, EventHive has become my go-to platform. The Tech Conference 2024 was perfectly organized and I discovered amazing networking opportunities.",
      event: "Tech Conference 2024",
      category: "Technology",
      date: "2024-08-25",
      location: "San Francisco"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Wellness Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The Free Yoga Workshop was exactly what I needed for my wellness journey. EventHive helped me discover this amazing community event that transformed my practice.",
      event: "Free Yoga Workshop",
      category: "Wellness",
      date: "2024-06-15",
      location: "Community Center"
    },
    {
      id: 4,
      name: "David Park",
      role: "Music Lover",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "I've been to countless music events, but the Summer Music Festival organized through EventHive was exceptional. The lineup was perfect and the experience was unforgettable!",
      event: "Summer Music Festival",
      category: "Music",
      date: "2024-07-20",
      location: "New York"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "EventHive helped me discover the Tech Conference 2024, which was crucial for my business growth. The insights I gained were invaluable and the connections I made are still paying off.",
      event: "Tech Conference 2024",
      category: "Technology",
      date: "2024-08-25",
      location: "San Francisco"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Fitness Trainer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The Free Yoga Workshop was a game-changer for my teaching approach. EventHive made it so easy to find and attend this transformative event. Highly recommend!",
      event: "Free Yoga Workshop",
      category: "Wellness",
      date: "2024-06-15",
      location: "Community Center"
    },
    {
      id: 7,
      name: "Anna Martinez",
      role: "Student",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "As a student, I love how EventHive makes it easy to find affordable and free events. The platform is perfect for discovering new experiences without breaking the bank!",
      event: "Student Meetup",
      category: "Education",
      date: "2024-09-10",
      location: "University Campus"
    },
    {
      id: 8,
      name: "Robert Kim",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "EventHive's networking features are outstanding. I met incredible people at the Business Summit and even found potential investors for my startup!",
      event: "Business Summit",
      category: "Business",
      date: "2024-10-05",
      location: "Convention Center"
    },
    {
      id: 9,
      name: "Maria Garcia",
      role: "Artist",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The Art Exhibition was beautifully curated and EventHive made it so simple to RSVP and get all the details. Perfect platform for creative events!",
      event: "Art Exhibition",
      category: "Arts",
      date: "2024-11-12",
      location: "Art Gallery"
    }
  ];

  const categories = ['all', 'Music', 'Technology', 'Wellness', 'Education', 'Business', 'Arts'];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesCategory = selectedCategory === 'all' || testimonial.category === selectedCategory;
    const matchesSearch = testimonial.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.event.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (isAutoPlaying && viewMode === 'carousel') {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, filteredTestimonials.length, viewMode]);

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const TestimonialCard = ({ testimonial, isActive = true }) => (
    <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 hover:shadow-3xl ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}`}>
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
      </div>

      <blockquote className="text-center mb-8">
        <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed mb-6">
          "{testimonial.review}"
        </p>
      </blockquote>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-xl font-bold text-slate-800 mb-1">{testimonial.name}</h4>
          <p className="text-slate-600 mb-2">{testimonial.role}</p>
          <p className="text-sm text-indigo-600 font-medium mb-3">Attended: {testimonial.event}</p>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
              {testimonial.category}
            </span>
            <span className="text-xs text-slate-500">{testimonial.location}</span>
          </div>
          <div className="flex justify-center md:justify-start space-x-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonial" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover why thousands of event enthusiasts trust EventHive for their memorable experiences
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 pl-12 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 shadow-sm"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 font-medium">View:</span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'carousel' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Carousel
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-50 hover:shadow-md border border-slate-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'carousel' && (
          <div className="relative max-w-6xl mx-auto">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {filteredTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <TestimonialCard testimonial={testimonial} isActive={true} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex justify-center space-x-3 mt-8">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 w-8'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-slate-800">{testimonial.name}</h4>
                      <div className="flex space-x-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{testimonial.role} • {testimonial.category}</p>
                    <p className="text-slate-700 italic mb-3">"{testimonial.review}"</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Attended: {testimonial.event}</span>
                      <span>{testimonial.location} • {testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{testimonials.length}+</div>
            <p className="text-slate-600">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">500+</div>
            <p className="text-slate-600">Events Hosted</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">4.9</div>
            <p className="text-slate-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <p className="text-slate-600">Support</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Own Event?</h3>
            <p className="text-lg mb-8 opacity-90">Join thousands of event organizers who trust EventHive</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-700 hover:via-pink-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
