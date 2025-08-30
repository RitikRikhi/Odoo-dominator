import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import concert from '../assets/images/concert.jpg'
import techConference from '../assets/images/meeting.jpg';
import standupComedy from '../assets/images/standUp.jpg'
export default function Carousel(){
    const [emblaRef]=useEmblaCarousel({loop:true},[Autoplay({ delay: 5000 })])
    
    const slides=[
          {
      image: concert,
      title: "Feel The Music, Live.",
      description: "Find concerts and festivals that make your heart beat faster.",
      ctaPrimary: "Discover Concerts",
      ctaSecondary: "See Featured Events"
    },
     {
    image: techConference,
    title: "Innovate. Network. Grow.",
    description: "Join leading minds at tech conferences and take your skills to the next level.",
    ctaPrimary: "Explore Tech Events",
    ctaSecondary: "See Upcoming Conferences",
  },
  {
    image: standupComedy, 
    title: "Laugh Out Loud.",
    description: "Catch the best comedians live and enjoy nights full of laughter.",
    ctaPrimary: "Book Comedy Shows",
    ctaSecondary: "View All Standups",
  },
    ]

    return (
  <div className="embla inset-3 h-[80vh] overflow-hidden relative rounded-b-3xl" ref={emblaRef}>
    <div className="embla__container flex h-[80vh]">
      {slides.map((slide, index) => (
        <div className="embla__slide inset-1 flex-[0_0_100%] relative h-[80vh]" key={index}>
        
          <div
            className="absolute inset-0 bg-cover bg-center rounded-b-3xl overflow-hidden"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/50"></div>

     
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">{slide.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-accentColor hover:bg-accentColor/90 rounded-full font-semibold">
                {slide.ctaPrimary}
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-full font-semibold">
                {slide.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>


    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
 
    </div>
  </div>
)
}