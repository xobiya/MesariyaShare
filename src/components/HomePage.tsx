import { Hammer, Wrench, Scissors, Zap, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ToolCard } from './ToolCard';
import { Badge } from './ui/badge';

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

interface HomePageProps {
  tools: Tool[];
  onViewDetails: (toolId: string) => void;
  onNavigate: (page: string) => void;
  onToggleFavorite: (toolId: string) => void;
  favorites: Set<string>;
  onCategoryFilter: (category: string) => void;
}

const categories = [
  { name: 'Power Tools', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { name: 'Hand Tools', icon: Hammer, color: 'bg-green-100 text-green-700' },
  { name: 'Garden Tools', icon: Scissors, color: 'bg-purple-100 text-purple-700' },
  { name: 'Automotive', icon: Wrench, color: 'bg-orange-100 text-orange-700' },
];

export function HomePage({
  tools,
  onViewDetails,
  onNavigate,
  onToggleFavorite,
  favorites,
  onCategoryFilter,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0yNCA0MGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">Borrow What You Need, Share What You Have</h1>
            <p className="text-xl mb-8 text-blue-100">
              Join your neighbors in building a sustainable, connected community.
              Rent tools for any project, earn money sharing yours.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                onClick={() => onNavigate('browse')}
              >
                Browse Tools
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700 border-0 shadow-lg"
                onClick={() => onNavigate('add-tool')}
              >
                List Your Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl text-blue-700 mb-2">1,250+</div>
              <div className="text-gray-600">Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-700 mb-2">850+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-700 mb-2">3,400+</div>
              <div className="text-gray-600">Successful Rentals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-700 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryFilter(category.name)}
                className={`${category.color} p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col items-center gap-3 group`}
              >
                <category.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Featured Tools</h2>
            <Button
              variant="ghost"
              onClick={() => onNavigate('browse')}
            >
              View All
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.slice(0, 8).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onViewDetails={onViewDetails}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.has(tool.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                1
              </div>
              <h3 className="text-xl mb-3">Find a Tool</h3>
              <p className="text-gray-600">
                Browse tools in your neighborhood or search for exactly what you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                2
              </div>
              <h3 className="text-xl mb-3">Request & Pick Up</h3>
              <p className="text-gray-600">
                Send a rental request and arrange a convenient pickup time with the owner.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                3
              </div>
              <h3 className="text-xl mb-3">Use & Return</h3>
              <p className="text-gray-600">
                Complete your project and return the tool. Leave a review to help the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join your neighbors in building a more sustainable and connected community.
          </p>
          <Button
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 shadow-lg"
            onClick={() => onNavigate('add-tool')}
          >
            List Your First Tool
          </Button>
        </div>
      </section>
    </div>
  );
}
