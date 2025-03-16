
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { format, addDays, subDays, parseISO } from "date-fns";
import { 
  Train, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight as ArrowRightIcon, 
  Filter, 
  ChevronDown,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Mock train data
const mockTrains = [
  {
    id: "12301",
    name: "Rajdhani Express",
    from: { code: "NDLS", name: "New Delhi", time: "16:55" },
    to: { code: "HWH", name: "Howrah Junction", time: "10:10" },
    duration: "17h 15m",
    days: [true, true, true, true, true, true, true],
    classes: [
      { code: "3A", name: "AC 3 Tier", available: 42, fare: 1855 },
      { code: "2A", name: "AC 2 Tier", available: 16, fare: 2575 },
      { code: "1A", name: "AC First Class", available: 7, fare: 4320 }
    ],
    rating: 4.7
  },
  {
    id: "12259",
    name: "Duronto Express",
    from: { code: "NDLS", name: "New Delhi", time: "08:35" },
    to: { code: "HWH", name: "Howrah Junction", time: "03:55" },
    duration: "19h 20m",
    days: [false, true, false, true, false, true, false],
    classes: [
      { code: "SL", name: "Sleeper", available: 125, fare: 755 },
      { code: "3A", name: "AC 3 Tier", available: 26, fare: 1855 },
      { code: "2A", name: "AC 2 Tier", available: 9, fare: 2575 }
    ],
    rating: 4.5
  },
  {
    id: "12303",
    name: "Poorva Express",
    from: { code: "NDLS", name: "New Delhi", time: "20:40" },
    to: { code: "HWH", name: "Howrah Junction", time: "17:50" },
    duration: "21h 10m",
    days: [true, true, true, true, true, true, true],
    classes: [
      { code: "SL", name: "Sleeper", available: 157, fare: 705 },
      { code: "3A", name: "AC 3 Tier", available: 54, fare: 1785 },
      { code: "2A", name: "AC 2 Tier", available: 22, fare: 2405 }
    ],
    rating: 4.2
  },
  {
    id: "12305",
    name: "Howrah Mail",
    from: { code: "NDLS", name: "New Delhi", time: "23:55" },
    to: { code: "HWH", name: "Howrah Junction", time: "23:55" },
    duration: "24h 00m",
    days: [true, true, true, true, true, true, true],
    classes: [
      { code: "SL", name: "Sleeper", available: 176, fare: 675 },
      { code: "3A", name: "AC 3 Tier", available: 61, fare: 1720 }
    ],
    rating: 3.9
  },
  {
    id: "12307",
    name: "Kolkata Yuva Express",
    from: { code: "NDLS", name: "New Delhi", time: "09:15" },
    to: { code: "HWH", name: "Howrah Junction", time: "05:30" },
    duration: "20h 15m",
    days: [false, false, true, false, false, true, false],
    classes: [
      { code: "CC", name: "AC Chair Car", available: 89, fare: 1430 }
    ],
    rating: 4.1
  }
];

// Week days
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trains, setTrains] = useState<any[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? parseISO(searchParams.get("date")!) : new Date()
  );
  
  // Filter states
  const [departureTime, setDepartureTime] = useState("all");
  const [trainClasses, setTrainClasses] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("departure");
  
  // Extract search params
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const journeyDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const quota = searchParams.get("quota") || "GN";
  
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setTrains(mockTrains);
      setFilteredTrains(mockTrains);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (trains.length === 0) return;
    
    let filtered = [...trains];
    
    // Filter by departure time
    if (departureTime !== "all") {
      filtered = filtered.filter(train => {
        const hour = parseInt(train.from.time.split(":")[0]);
        
        switch (departureTime) {
          case "morning":
            return hour >= 4 && hour < 12;
          case "afternoon":
            return hour >= 12 && hour < 16;
          case "evening":
            return hour >= 16 && hour < 20;
          case "night":
            return hour >= 20 || hour < 4;
          default:
            return true;
        }
      });
    }
    
    // Filter by train classes
    if (trainClasses.length > 0) {
      filtered = filtered.filter(train => 
        train.classes.some((cls: any) => trainClasses.includes(cls.code))
      );
    }
    
    // Sort trains
    filtered = sortTrains(filtered, sortOption);
    
    setFilteredTrains(filtered);
  }, [departureTime, trainClasses, sortOption, trains]);
  
  const sortTrains = (trains: any[], option: string) => {
    return [...trains].sort((a, b) => {
      switch (option) {
        case "departure":
          return compareTime(a.from.time, b.from.time);
        case "arrival":
          return compareTime(a.to.time, b.to.time);
        case "duration":
          return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
        case "price_low":
          return getLowestFare(a) - getLowestFare(b);
        case "price_high":
          return getLowestFare(b) - getLowestFare(a);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };
  
  const compareTime = (time1: string, time2: string) => {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    
    if (h1 === h2) {
      return m1 - m2;
    }
    return h1 - h2;
  };
  
  const getDurationInMinutes = (duration: string) => {
    const [hours, minutes] = duration.split("h ").map(part => 
      parseInt(part.replace("m", "").trim())
    );
    return hours * 60 + minutes;
  };
  
  const getLowestFare = (train: any) => {
    return Math.min(...train.classes.map((cls: any) => cls.fare));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("date", format(date, "yyyy-MM-dd"));
      
      // Update URL without reloading page
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${newSearchParams.toString()}`
      );
    }
  };
  
  const handlePrevDay = () => {
    if (selectedDate) {
      handleDateChange(subDays(selectedDate, 1));
    }
  };
  
  const handleNextDay = () => {
    if (selectedDate) {
      handleDateChange(addDays(selectedDate, 1));
    }
  };
  
  const handleClassCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      setTrainClasses([...trainClasses, value]);
    } else {
      setTrainClasses(trainClasses.filter(v => v !== value));
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Search summary bar */}
        <div className="bg-irctc-blue text-white p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-2 md:mr-6">
                <div className="text-sm text-irctc-yellow">From</div>
                <div className="font-semibold">{from || "N/A"}</div>
              </div>
              <ArrowRight className="h-5 w-5 mx-1 md:mx-4" />
              <div className="mx-2 md:mx-6">
                <div className="text-sm text-irctc-yellow">To</div>
                <div className="font-semibold">{to || "N/A"}</div>
              </div>
              <div className="hidden md:block h-8 w-px bg-blue-600 mx-4"></div>
              <div className="hidden md:block">
                <div className="text-sm text-irctc-yellow">Date</div>
                <div className="font-semibold">
                  {selectedDate ? format(selectedDate, "dd MMM, EEE") : "N/A"}
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-blue-600 mx-4"></div>
              <div className="hidden md:block">
                <div className="text-sm text-irctc-yellow">Quota</div>
                <div className="font-semibold">{quota}</div>
              </div>
            </div>
            
            <div className="flex space-x-2 md:space-x-4">
              <div className="md:hidden flex items-center">
                <div className="text-sm text-irctc-yellow mr-2">Date</div>
                <div className="font-semibold">
                  {selectedDate ? format(selectedDate, "dd MMM") : "N/A"}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-irctc-blue"
                onClick={handlePrevDay}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Prev Day
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white text-white hover:bg-white hover:text-irctc-blue"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Change Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-irctc-blue"
                onClick={handleNextDay}
              >
                Next Day
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-20">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Filter className="h-5 w-5 text-irctc-blue" />
                </div>
              </div>
              
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="departure-time">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="text-sm font-medium">Departure Time</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="departureTime" 
                          className="h-4 w-4 text-irctc-blue" 
                          value="all"
                          checked={departureTime === "all"}
                          onChange={(e) => setDepartureTime(e.target.value)}
                        />
                        <span>All</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="departureTime" 
                          className="h-4 w-4 text-irctc-blue" 
                          value="morning"
                          checked={departureTime === "morning"}
                          onChange={(e) => setDepartureTime(e.target.value)}
                        />
                        <span>Morning (04:00 - 11:59)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="departureTime" 
                          className="h-4 w-4 text-irctc-blue" 
                          value="afternoon"
                          checked={departureTime === "afternoon"}
                          onChange={(e) => setDepartureTime(e.target.value)}
                        />
                        <span>Afternoon (12:00 - 15:59)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="departureTime" 
                          className="h-4 w-4 text-irctc-blue" 
                          value="evening"
                          checked={departureTime === "evening"}
                          onChange={(e) => setDepartureTime(e.target.value)}
                        />
                        <span>Evening (16:00 - 19:59)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="departureTime" 
                          className="h-4 w-4 text-irctc-blue" 
                          value="night"
                          checked={departureTime === "night"}
                          onChange={(e) => setDepartureTime(e.target.value)}
                        />
                        <span>Night (20:00 - 03:59)</span>
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="classes">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="text-sm font-medium">Classes</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="class-sl"
                          checked={trainClasses.includes("SL")}
                          onCheckedChange={(checked) => 
                            handleClassCheckboxChange(checked as boolean, "SL")
                          }
                        />
                        <label
                          htmlFor="class-sl"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Sleeper (SL)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="class-3a"
                          checked={trainClasses.includes("3A")}
                          onCheckedChange={(checked) => 
                            handleClassCheckboxChange(checked as boolean, "3A")
                          }
                        />
                        <label
                          htmlFor="class-3a"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AC 3 Tier (3A)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="class-2a"
                          checked={trainClasses.includes("2A")}
                          onCheckedChange={(checked) => 
                            handleClassCheckboxChange(checked as boolean, "2A")
                          }
                        />
                        <label
                          htmlFor="class-2a"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AC 2 Tier (2A)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="class-1a"
                          checked={trainClasses.includes("1A")}
                          onCheckedChange={(checked) => 
                            handleClassCheckboxChange(checked as boolean, "1A")
                          }
                        />
                        <label
                          htmlFor="class-1a"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AC First Class (1A)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="class-cc"
                          checked={trainClasses.includes("CC")}
                          onCheckedChange={(checked) => 
                            handleClassCheckboxChange(checked as boolean, "CC")
                          }
                        />
                        <label
                          htmlFor="class-cc"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AC Chair Car (CC)
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Train list */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <h2 className="text-lg font-semibold">
                    {isLoading ? (
                      <Skeleton className="h-6 w-40" />
                    ) : (
                      `${filteredTrains.length} Trains Available`
                    )}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isLoading ? (
                      <Skeleton className="h-4 w-60 mt-1" />
                    ) : (
                      `For ${from} to ${to} on ${selectedDate ? format(selectedDate, "dd MMM yyyy, EEEE") : ""}`
                    )}
                  </p>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full sm:w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="departure">Departure ↑</SelectItem>
                      <SelectItem value="arrival">Arrival ↑</SelectItem>
                      <SelectItem value="duration">Duration ↑</SelectItem>
                      <SelectItem value="price_low">Price ↑</SelectItem>
                      <SelectItem value="price_high">Price ↓</SelectItem>
                      <SelectItem value="rating">Rating ↓</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <Skeleton className="h-6 w-52 mb-4" />
                      <div className="flex justify-between">
                        <div>
                          <Skeleton className="h-8 w-16 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center">
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-8 w-16 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredTrains.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Train className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No trains found</h3>
                <p className="text-gray-500 mb-4">
                  Try changing your search criteria or selecting a different date.
                </p>
                <Button className="bg-irctc-blue hover:bg-irctc-blue/90">
                  Modify Search
                </Button>
              </div>
            ) : (
              filteredTrains.map((train) => (
                <Card key={train.id} className="mb-4 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">{train.name}</h3>
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {train.id}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-irctc-yellow fill-irctc-yellow" />
                          <span className="ml-1 text-sm font-medium">{train.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="flex-1">
                          <div className="text-2xl font-bold">{train.from.time}</div>
                          <div className="text-sm text-gray-500">
                            {train.from.name} ({train.from.code})
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center my-2 md:my-0 md:mx-6">
                          <div className="text-xs text-gray-500 mb-1">{train.duration}</div>
                          <div className="w-24 md:w-32 h-px bg-gray-300 relative">
                            <div className="absolute top-1/2 left-0 w-2 h-2 bg-irctc-blue rounded-full transform -translate-y-1/2"></div>
                            <div className="absolute top-1/2 right-0 w-2 h-2 bg-irctc-red rounded-full transform -translate-y-1/2"></div>
                          </div>
                          <div className="flex space-x-1 mt-2">
                            {weekDays.map((day, index) => (
                              <div
                                key={index}
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
                                  train.days[index]
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                                title={`Runs on ${day}: ${train.days[index] ? "Yes" : "No"}`}
                              >
                                {day[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex-1 text-right">
                          <div className="text-2xl font-bold">{train.to.time}</div>
                          <div className="text-sm text-gray-500">
                            {train.to.name} ({train.to.code})
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {train.classes.map((cls) => (
                          <div
                            key={cls.code}
                            className="border rounded-md p-3 flex flex-col cursor-pointer hover:bg-gray-50"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{cls.name}</span>
                              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                {cls.code}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={cn(
                                "text-sm font-semibold",
                                cls.available > 20 ? "text-green-600" : 
                                cls.available > 0 ? "text-amber-600" : "text-red-600"
                              )}>
                                {cls.available > 0 ? `Avl ${cls.available}` : "WL"}
                              </span>
                              <span className="text-base font-bold">₹{cls.fare}</span>
                            </div>
                            <Button
                              className="mt-2 bg-irctc-blue hover:bg-irctc-blue/90 text-white text-xs"
                              size="sm"
                              asChild
                            >
                              <Link to={`/train/${train.id}?class=${cls.code}&date=${journeyDate}`}>
                                Book Now
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
