
import React from "react";
import { Train } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

// Data for popular Indian cities
const popularCities = [
  {
    name: "Delhi",
    code: "NDLS",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000",
    description: "Explore the historic capital with its ancient monuments and vibrant culture",
  },
  {
    name: "Mumbai",
    code: "BCT",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1000",
    description: "The city of dreams with bustling streets and beautiful coastlines",
  },
  {
    name: "Jaipur",
    code: "JP",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000",
    description: "Pink City known for its stunning palaces and rich heritage",
  },
  {
    name: "Varanasi",
    code: "BSB",
    image: "https://images.unsplash.com/photo-1561361058-c24ceccc5936?q=80&w=1000",
    description: "The spiritual capital of India located on the banks of the Ganges",
  },
  {
    name: "Kolkata",
    code: "HWH",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000",
    description: "The cultural capital with colonial architecture and artistic heritage",
  },
  {
    name: "Chennai",
    code: "MAS",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000",
    description: "The gateway to South India with beautiful beaches and temples",
  },
  {
    name: "Agra",
    code: "AGC",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
    description: "Home to the iconic Taj Mahal and other Mughal-era architecture",
  },
  {
    name: "Bengaluru",
    code: "SBC",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000",
    description: "The Silicon Valley of India with pleasant weather and gardens",
  },
];

const CityCarousel = () => {
  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {popularCities.map((city, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <Link to={`/search-results?from=&to=${city.code}`} className="block h-full">
                <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1 h-full">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-irctc-blue">{city.name}</h3>
                      <span className="bg-irctc-blue/10 text-irctc-blue text-xs font-semibold py-1 px-2 rounded-full">
                        {city.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{city.description}</p>
                    <div className="flex items-center text-irctc-red text-sm font-medium">
                      <Train className="h-4 w-4 mr-1" />
                      <span>Explore Trains</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default CityCarousel;
