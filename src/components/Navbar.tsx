
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  User, 
  Train,
  TicketPlus,
  Search,
  FileSearch,
  Calendar,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Train className="h-8 w-8 text-irctc-blue" />
              <span className="ml-2 text-xl font-bold text-irctc-blue hidden sm:block">IndiaRail</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              <Link to="/" className="text-irctc-blue hover:text-irctc-red px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/search" className="text-irctc-blue hover:text-irctc-red px-3 py-2 text-sm font-medium">
                Search Trains
              </Link>
              <Link to="/pnr" className="text-irctc-blue hover:text-irctc-red px-3 py-2 text-sm font-medium flex items-center gap-1">
                <FileSearch className="h-4 w-4" />
                PNR Status
              </Link>
              <Link to="/bookings" className="text-irctc-blue hover:text-irctc-red px-3 py-2 text-sm font-medium">
                My Bookings
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-irctc-blue text-white">UR</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Username</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TicketPlus className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="text-irctc-blue border-irctc-blue hover:bg-irctc-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-irctc-blue text-white hover:bg-irctc-blue/90">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-irctc-blue hover:text-irctc-red focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red"
              onClick={toggleMenu}
            >
              Search Trains
            </Link>
            <Link
              to="/pnr"
              className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red flex items-center gap-2"
              onClick={toggleMenu}
            >
              <FileSearch className="h-5 w-5" />
              PNR Status
            </Link>
            <Link
              to="/bookings"
              className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red"
              onClick={toggleMenu}
            >
              My Bookings
            </Link>
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-irctc-blue hover:text-irctc-red"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
