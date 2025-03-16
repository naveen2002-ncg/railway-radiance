import { Link } from "react-router-dom";
import { Calendar, Clock, Train, Map, TicketPlus, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import CityCarousel from "@/components/CityCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-irctc-blue clip-path-slant">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1601629665203-f9f2b8d3be93')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Book Your Train Tickets with Ease
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Fast, secure and hassle-free train booking experience across India
            </p>
            
            {/* Train animation */}
            <div className="hidden md:block overflow-hidden relative h-8 mb-8">
              <div className="absolute animate-train-move">
                <Train className="h-8 w-8 text-irctc-yellow" />
              </div>
            </div>
            
            {/* Search Form */}
            <SearchForm />
          </div>
        </div>
      </section>
      
      {/* Popular Cities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-irctc-blue mb-4">
            Explore Popular Cities in India
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            Discover the beauty and culture of India's most iconic destinations
          </p>
          
          <CityCarousel />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-irctc-blue mb-12">
            Why Book With Us?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-irctc-red" />
                  60-Day Advance Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Plan your journey up to 60 days in advance and secure your seats early.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <TicketPlus className="h-5 w-5 mr-2 text-irctc-red" />
                  Zero Booking Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No hidden charges or convenience fees when booking through our platform.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-irctc-red" />
                  Easy Refund Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick and hassle-free refunds directly to your bank account.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-irctc-red" />
                  Real-Time Train Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get live running status and delay information for all trains.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-irctc-red" />
                  PNR Status Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your PNR status and get timely updates about your booking.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Train className="h-5 w-5 mr-2 text-irctc-red" />
                  Tatkal Booking Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tatkal and Premium Tatkal bookings with optimized processing.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Popular Routes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-irctc-blue mb-4">
            Popular Routes
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore some of the most traveled train routes across India with competitive fares and frequent departures.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Link to={`/search-results?from=${route.from.code}&to=${route.to.code}`} key={index}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-40 bg-gradient-to-r from-irctc-blue to-blue-600 relative p-4">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="bg-white text-irctc-blue text-xs font-bold py-1 px-2 rounded-full">
                          {route.distance} KM
                        </div>
                        <div className="bg-irctc-yellow text-irctc-blue text-xs font-bold py-1 px-2 rounded-full">
                          From ₹{route.fare}
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-semibold">{route.from.code}</div>
                            <div className="text-xs">{route.from.name}</div>
                          </div>
                          <Train className="h-5 w-5 mx-2 text-irctc-yellow" />
                          <div className="text-right">
                            <div className="text-lg font-semibold">{route.to.code}</div>
                            <div className="text-xs">{route.to.name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500">{route.trains} Trains</div>
                        <div className="text-sm font-medium">{route.duration}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-irctc-blue hover:text-irctc-red">
                        View Trains
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-irctc-red hover:bg-irctc-red/90 text-white" asChild>
              <Link to="/search">Explore All Routes</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="py-16 bg-gradient-to-r from-irctc-blue to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-gray-200 mb-6 max-w-md">
                Book tickets, check PNR status, and get real-time updates on the go with our mobile app.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-black hover:bg-black/80">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9 3H6.1C5.6 3 5.1 3.2 4.7 3.6c-.4.4-.6.9-.6 1.4v14c0 .5.2 1 .6 1.4.4.4.9.6 1.4.6h11.8c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4v-14c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6zM12 18.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5-3.5H7V5h10v10z" />
                  </svg>
                  App Store
                </Button>
                <Button className="bg-black hover:bg-black/80">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5V3.5c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5v17c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5zm16.5-15h-15v15h15v-15z"/>
                    <path d="M12 15.5l-5-3 5-3 5 3-5 3z"/>
                  </svg>
                  Play Store
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-96 bg-gray-800 rounded-3xl p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-b-lg"></div>
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="h-10 bg-irctc-blue flex items-center justify-center">
                    <div className="flex items-center">
                      <Train className="h-4 w-4 text-white" />
                      <span className="ml-1 text-white text-xs font-semibold">IndiaRail</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="space-y-2">
                      <div className="h-24 bg-irctc-blue/10 rounded-lg"></div>
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-10 bg-irctc-blue rounded-lg"></div>
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Mock data for popular routes
const popularRoutes = [
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "HWH", name: "Howrah Junction" },
    distance: "1445",
    duration: "17h 15m",
    trains: "12",
    fare: "755"
  },
  {
    from: { code: "MAS", name: "Chennai Central" },
    to: { code: "SBC", name: "Bengaluru" },
    distance: "346",
    duration: "5h 30m",
    trains: "25",
    fare: "445"
  },
  {
    from: { code: "BCT", name: "Mumbai Central" },
    to: { code: "ADI", name: "Ahmedabad" },
    distance: "493",
    duration: "6h 20m",
    trains: "15",
    fare: "515"
  },
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "LKO", name: "Lucknow" },
    distance: "512",
    duration: "6h 30m",
    trains: "20",
    fare: "535"
  },
  {
    from: { code: "HWH", name: "Howrah Junction" },
    to: { code: "PNBE", name: "Patna Junction" },
    distance: "532",
    duration: "8h 15m",
    trains: "18",
    fare: "590"
  },
  {
    from: { code: "NDLS", name: "New Delhi" },
    to: { code: "JAT", name: "Jammu Tawi" },
    distance: "577",
    duration: "10h 45m",
    trains: "10",
    fare: "720"
  },
  {
    from: { code: "BCT", name: "Mumbai Central" },
    to: { code: "ST", name: "Surat" },
    distance: "263",
    duration: "3h 10m",
    trains: "30",
    fare: "310"
  },
  {
    from: { code: "SBC", name: "Bengaluru" },
    to: { code: "MAS", name: "Chennai Central" },
    distance: "346",
    duration: "5h 30m",
    trains: "25",
    fare: "445"
  }
];

export default Index;
