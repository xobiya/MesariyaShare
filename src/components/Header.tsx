import { Search, Menu, User, Heart, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onNavigate, currentPage, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M14 7h6m-6 4h6m-6 4h6M4 5v14a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1z" />
              </svg>
            </div>
            <span className="text-xl text-blue-600">mesariyashare</span>
          </button>

          {/* Primary Nav: Home / About / Contact (shown on md+) */}
          <nav className="hidden md:flex items-center gap-4 ml-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded ${
                currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded ${
                currentPage === 'about' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 rounded ${
                currentPage === 'contact' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for tools..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate('add-tool')}
              className="hidden sm:flex gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4" />
              List a Tool
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('favorites')}
              className="hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <User className="mr-2 w-4 h-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('my-tools')}>
                  My Tools
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('favorites')}>
                  <Heart className="mr-2 w-4 h-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
    </header>
  );
}
