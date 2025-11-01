import { ArrowLeft, SlidersHorizontal, Map, Grid3X3, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ToolCard } from './ToolCard';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  owner: {
    name: string;
    rating: number;
    verified: boolean;
  };
  location: string;
  category: string;
  available: boolean;
}

interface SearchResultsPageProps {
  tools: Tool[];
  onBack: () => void;
  onViewDetails: (toolId: string) => void;
  onToggleFavorite: (toolId: string) => void;
  favorites: Set<string>;
  searchQuery: string;
}

const categories = [
  'Power Tools',
  'Hand Tools',
  'Garden Tools',
  'Automotive',
  'Ladders & Scaffolding',
  'Cleaning Equipment',
];

export function SearchResultsPage({
  tools,
  onBack,
  onViewDetails,
  onToggleFavorite,
  favorites,
  searchQuery,
}: SearchResultsPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState(10);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter tools based on selected filters
  const filteredTools = tools.filter(tool => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(tool.category)) {
      return false;
    }
    if (tool.price < priceRange[0] || tool.price > priceRange[1]) {
      return false;
    }
    if (showAvailableOnly && !tool.available) {
      return false;
    }
    return true;
  });

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.owner.rating - a.owner.rating;
      default:
        return 0;
    }
  });

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="mt-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}/day</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3">Distance</h3>
        <div className="space-y-4">
          <Slider
            value={[distanceFilter]}
            onValueChange={(value) => setDistanceFilter(value[0])}
            max={50}
            step={5}
            className="mt-2"
          />
          <div className="text-sm text-gray-600">
            Within {distanceFilter} miles
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3">Availability</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="available"
            checked={showAvailableOnly}
            onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
          />
          <Label htmlFor="available" className="text-sm cursor-pointer">
            Show available tools only
          </Label>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 100]);
          setDistanceFilter(10);
          setShowAvailableOnly(false);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl">Search Results</h1>
                {searchQuery && (
                  <p className="text-sm text-gray-600">"{searchQuery}"</p>
                )}
              </div>
            </div>

            {/* Desktop View Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {sortedTools.length} tools found
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {(selectedCategories.length > 0 || showAvailableOnly) && (
                      <Badge className="ml-2 bg-blue-600 h-5 px-2">
                        {selectedCategories.length + (showAvailableOnly ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg">Filters</h2>
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                </div>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onViewDetails={onViewDetails}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.has(tool.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <CardContent className="text-center">
                  <Map className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl mb-2">Map View</h3>
                  <p className="text-gray-600 mb-4">
                    Interactive map showing tool locations would appear here
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Your location: Downtown Seattle, WA</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {sortedTools.length === 0 && (
              <Card className="p-12 text-center">
                <h3 className="text-xl mb-2">No tools found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 100]);
                  setShowAvailableOnly(false);
                }}>
                  Clear All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
