import { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { HomePage } from './components/HomePage';
import { ToolDetailsPage } from './components/ToolDetailsPage';
import { AddToolPage } from './components/AddToolPage';
import { ProfilePage } from './components/ProfilePage';
import { Dashboard } from './components/Dashboard';
import { MessagesPage } from './components/MessagesPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { RentalRequestDialog } from './components/RentalRequestDialog';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Mock data
const mockTools = [
  {
    id: '1',
    name: 'DeWalt 20V Cordless Drill',
    description: 'Professional grade cordless drill with 2 batteries and charger. Perfect for drilling and driving applications. Includes carrying case.',
    price: 15,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNzY3NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'John Doe',
      rating: 4.8,
      verified: true,
      memberSince: 'January 2024',
      totalTools: 12,
      totalRentals: 47,
    },
    location: 'Downtown Seattle, WA',
    category: 'Power Tools',
    available: true,
    condition: 'Excellent',
    depositRequired: 50,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
  },
  {
    id: '2',
    name: 'Gas Lawn Mower',
    description: 'Self-propelled gas lawn mower with 21-inch cutting deck. Great for medium to large lawns. Recently serviced.',
    price: 25,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1723811898182-aff0c2eca53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXduJTIwbW93ZXIlMjBnYXJkZW58ZW58MXx8fHwxNzYxNzU4OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'Sarah Johnson',
      rating: 4.9,
      verified: true,
      memberSince: 'March 2024',
      totalTools: 8,
      totalRentals: 32,
    },
    location: 'Capitol Hill, Seattle',
    category: 'Garden Tools',
    available: true,
    condition: 'Good',
    depositRequired: 75,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '3 days',
  },
  {
    id: '3',
    name: 'Extension Ladder 24ft',
    description: 'Heavy-duty aluminum extension ladder. Extends up to 24 feet. Perfect for painting, roof access, or tree trimming.',
    price: 20,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1741916541518-1b5918bc4abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRkZXIlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzYxNjU3ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'Mike Chen',
      rating: 4.7,
      verified: false,
      memberSince: 'February 2024',
      totalTools: 5,
      totalRentals: 18,
    },
    location: 'Ballard, Seattle',
    category: 'Ladders & Scaffolding',
    available: false,
    condition: 'Good',
    depositRequired: 100,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
  },
  {
    id: '4',
    name: 'Circular Saw 7.25"',
    description: 'Powerful circular saw ideal for cutting lumber, plywood, and other materials. Includes extra blades.',
    price: 12,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1720594493715-a6d0867a3ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMHdvb2R3b3JraW5nfGVufDF8fHx8MTc2MTc2NzU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'Lisa Anderson',
      rating: 5.0,
      verified: true,
      memberSince: 'January 2024',
      totalTools: 15,
      totalRentals: 62,
    },
    location: 'Fremont, Seattle',
    category: 'Power Tools',
    available: true,
    condition: 'Like New',
    depositRequired: 40,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
  },
  {
    id: '5',
    name: 'Complete Tool Set',
    description: 'Comprehensive tool set with over 200 pieces. Includes wrenches, sockets, screwdrivers, pliers, and more.',
    price: 18,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1599256871679-6a154745680b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b29sYm94JTIwd29ya3Nob3B8ZW58MXx8fHwxNzYxNzY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'David Martinez',
      rating: 4.6,
      verified: true,
      memberSince: 'April 2024',
      totalTools: 6,
      totalRentals: 25,
    },
    location: 'Queen Anne, Seattle',
    category: 'Hand Tools',
    available: true,
    condition: 'Excellent',
    depositRequired: 60,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '14 days',
  },
  {
    id: '6',
    name: 'Pressure Washer 3000 PSI',
    description: 'Gas-powered pressure washer perfect for cleaning driveways, decks, and siding. Includes various nozzles.',
    price: 30,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNzY3NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'Emily White',
      rating: 4.9,
      verified: true,
      memberSince: 'February 2024',
      totalTools: 9,
      totalRentals: 41,
    },
    location: 'West Seattle',
    category: 'Cleaning Equipment',
    available: true,
    condition: 'Good',
    depositRequired: 80,
    minRentalPeriod: '4 hours',
    maxRentalPeriod: '3 days',
  },
  {
    id: '7',
    name: 'Table Saw 10"',
    description: 'Professional table saw with adjustable fence and miter gauge. Ideal for woodworking projects.',
    price: 35,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1720594493715-a6d0867a3ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMHdvb2R3b3JraW5nfGVufDF8fHx8MTc2MTc2NzU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'John Doe',
      rating: 4.8,
      verified: true,
      memberSince: 'January 2024',
      totalTools: 12,
      totalRentals: 47,
    },
    location: 'Downtown Seattle, WA',
    category: 'Power Tools',
    available: true,
    condition: 'Excellent',
    depositRequired: 150,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
  },
  {
    id: '8',
    name: 'Hedge Trimmer Electric',
    description: 'Electric hedge trimmer with 20-inch blade. Perfect for maintaining hedges and shrubs.',
    price: 10,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1723811898182-aff0c2eca53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXduJTIwbW93ZXIlMjBnYXJkZW58ZW58MXx8fHwxNzYxNzU4OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    owner: {
      name: 'Sarah Johnson',
      rating: 4.9,
      verified: true,
      memberSince: 'March 2024',
      totalTools: 8,
      totalRentals: 32,
    },
    location: 'Capitol Hill, Seattle',
    category: 'Garden Tools',
    available: true,
    condition: 'Good',
    depositRequired: 30,
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
  },
];

const mockReviews = [
  {
    id: '1',
    userName: 'Alex Turner',
    rating: 5,
    comment: 'Excellent tool! Worked perfectly for my deck project. Owner was friendly and helpful.',
    date: 'October 20, 2024',
  },
  {
    id: '2',
    userName: 'Maria Garcia',
    rating: 5,
    comment: 'Great condition, easy pickup. Would definitely rent again!',
    date: 'October 12, 2024',
  },
  {
    id: '3',
    userName: 'Tom Wilson',
    rating: 4,
    comment: 'Good tool, got the job done. Pickup was a bit delayed but otherwise smooth.',
    date: 'October 5, 2024',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '4']));
  const [showRentalDialog, setShowRentalDialog] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedToolId(null);
  };

  const handleViewDetails = (toolId: string) => {
    setSelectedToolId(toolId);
    setCurrentPage('tool-details');
  };

  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(toolId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  const handleRequestRental = () => {
    setShowRentalDialog(true);
  };

  const handleContactOwner = () => {
    toast.success('Message sent to tool owner');
  };

  const handleSubmitRental = (requestData: any) => {
    console.log('Rental request:', requestData);
    setShowRentalDialog(false);
    toast.success('Rental request sent! The owner will respond soon.');
  };

  const handleSubmitTool = (toolData: any) => {
    console.log('New tool:', toolData);
    toast.success('Tool listed successfully!');
    setCurrentPage('home');
  };

  const handleCategoryFilter = (category: string) => {
    toast.info(`Filtering by ${category}`);
    // In a real app, this would filter the tools
  };

  // Filter tools based on search
  const filteredTools = mockTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get user's tools (tools owned by John Doe)
  const userTools = mockTools.filter((tool) => tool.owner.name === 'John Doe');

  // Get selected tool
  const selectedTool = mockTools.find((tool) => tool.id === selectedToolId);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'messages' && currentPage !== 'landing' && (
        <Header
          onNavigate={handleNavigate}
          currentPage={currentPage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => handleNavigate('home')} />
      )}

      {currentPage === 'about' && (
        <AboutPage onBack={() => handleNavigate('home')} />
      )}

      {currentPage === 'contact' && (
        <ContactPage onBack={() => handleNavigate('home')} />
      )}

      {currentPage === 'home' && (
        <HomePage
          tools={filteredTools}
          onViewDetails={handleViewDetails}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          onCategoryFilter={handleCategoryFilter}
        />
      )}

      {currentPage === 'browse' && (
        <SearchResultsPage
          tools={mockTools}
          onBack={() => handleNavigate('home')}
          onViewDetails={handleViewDetails}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          searchQuery={searchQuery}
        />
      )}

      {currentPage === 'tool-details' && selectedTool && (
        <ToolDetailsPage
          tool={selectedTool}
          reviews={mockReviews}
          onBack={() => handleNavigate('home')}
          onRequestRental={handleRequestRental}
          onContactOwner={handleContactOwner}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.has(selectedTool.id)}
        />
      )}

      {currentPage === 'add-tool' && (
        <AddToolPage
          onBack={() => handleNavigate('home')}
          onSubmit={handleSubmitTool}
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={handleNavigate} />
      )}

      {currentPage === 'messages' && (
        <MessagesPage onBack={() => handleNavigate('dashboard')} />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          onBack={() => handleNavigate('dashboard')}
          onViewDetails={handleViewDetails}
          userTools={userTools}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Rental Request Dialog */}
      {selectedTool && (
        <RentalRequestDialog
          open={showRentalDialog}
          onClose={() => setShowRentalDialog(false)}
          toolName={selectedTool.name}
          price={selectedTool.price}
          priceUnit={selectedTool.priceUnit}
          depositRequired={selectedTool.depositRequired}
          onSubmit={handleSubmitRental}
        />
      )}

      {/* Mobile Bottom Navigation */}
      {currentPage !== 'landing' && (
        <BottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          unreadMessages={2}
        />
      )}

      <Toaster />
    </div>
  );
}
