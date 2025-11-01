import { ArrowLeft, MapPin, Star, Calendar, Award, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ToolCard } from './ToolCard';

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

interface ProfilePageProps {
  onBack: () => void;
  onViewDetails: (toolId: string) => void;
  userTools: Tool[];
  favorites: Set<string>;
  onToggleFavorite: (toolId: string) => void;
}

const userProfile = {
  name: 'John Doe',
  location: 'Downtown Seattle, WA',
  memberSince: 'January 2024',
  rating: 4.8,
  verified: true,
  totalTools: 12,
  totalRentals: 47,
  bio: 'DIY enthusiast and woodworking hobbyist. Happy to share my tools with the community. Available for pickup most weekends.',
};

const reviews = [
  {
    id: '1',
    toolName: 'DeWalt Cordless Drill',
    rating: 5,
    comment: 'Great tool in excellent condition. John was very helpful and flexible with pickup time.',
    renterName: 'Sarah M.',
    date: 'October 15, 2024',
  },
  {
    id: '2',
    toolName: 'Ladder Extension 24ft',
    rating: 5,
    comment: 'Perfect for my project. Tool was clean and well-maintained.',
    renterName: 'Mike R.',
    date: 'October 8, 2024',
  },
  {
    id: '3',
    toolName: 'Circular Saw',
    rating: 4,
    comment: 'Good tool, worked well for cutting deck boards.',
    renterName: 'Lisa K.',
    date: 'September 22, 2024',
  },
];

export function ProfilePage({
  onBack,
  onViewDetails,
  userTools,
  favorites,
  onToggleFavorite,
}: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <h1 className="text-2xl">{userProfile.name}</h1>
                  {userProfile.verified && (
                    <Badge variant="outline" className="text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 text-gray-600 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{userProfile.rating} rating</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile.location}</span>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span>{userProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tools listed</span>
                    <span>{userProfile.totalTools}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total rentals</span>
                    <span>{userProfile.totalRentals}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">About</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{userProfile.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Achievements</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-yellow-700" />
                    </div>
                    <div>
                      <div className="text-sm">Top Contributor</div>
                      <div className="text-xs text-gray-600">50+ successful rentals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <div className="text-sm">Highly Rated</div>
                      <div className="text-xs text-gray-600">4.8+ average rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm">Early Adopter</div>
                      <div className="text-xs text-gray-600">Member since 2024</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="tools">My Tools ({userTools.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="mt-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {userTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onViewDetails={onViewDetails}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={favorites.has(tool.id)}
                    />
                  ))}
                </div>
                {userTools.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-600 mb-4">You haven't listed any tools yet</p>
                      <Button>List Your First Tool</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="mb-1">{review.toolName}</div>
                            <div className="text-sm text-gray-600">
                              by {review.renterName} • {review.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
