import { ArrowLeft, MapPin, Star, Shield, Calendar, DollarSign, MessageCircle, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    memberSince: string;
    totalTools: number;
    totalRentals: number;
  };
  location: string;
  category: string;
  available: boolean;
  condition: string;
  depositRequired: number;
  minRentalPeriod: string;
  maxRentalPeriod: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ToolDetailsPageProps {
  tool: Tool;
  reviews: Review[];
  onBack: () => void;
  onRequestRental: () => void;
  onContactOwner: () => void;
  onToggleFavorite: (toolId: string) => void;
  isFavorite: boolean;
}

export function ToolDetailsPage({
  tool,
  reviews,
  onBack,
  onRequestRental,
  onContactOwner,
  onToggleFavorite,
  isFavorite,
}: ToolDetailsPageProps) {
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
              {!tool.available && (
                <Badge className="absolute top-4 left-4 bg-gray-900/80">
                  Currently Unavailable
                </Badge>
              )}
              {tool.available && (
                <Badge className="absolute top-4 left-4 bg-green-600">
                  Available Now
                </Badge>
              )}
            </div>

            {/* Tool Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {tool.category}
                    </Badge>
                    <h1 className="text-3xl mb-2">{tool.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tool.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{averageRating} ({reviews.length} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onToggleFavorite(tool.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </Button>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{tool.description}</p>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl mb-4">Tool Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Condition</div>
                        <div>{tool.condition}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Deposit Required</div>
                        <div>${tool.depositRequired}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Min. Rental Period</div>
                        <div>{tool.minRentalPeriod}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Max. Rental Period</div>
                        <div>{tool.maxRentalPeriod}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl mb-4">Reviews ({reviews.length})</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {review.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{review.userName}</div>
                            <div className="text-sm text-gray-600">{review.date}</div>
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
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="text-gray-600 text-center py-8">No reviews yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Rental Card & Owner Info */}
          <div className="space-y-6">
            {/* Rental Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl text-blue-700">${tool.price}</span>
                    <span className="text-gray-600">/ {tool.priceUnit}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    + ${tool.depositRequired} refundable deposit
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={onRequestRental}
                    disabled={!tool.available}
                  >
                    {tool.available ? 'Request to Rent' : 'Currently Unavailable'}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={onContactOwner}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Owner
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Free cancellation up to 24h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4">Tool Owner</h3>
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {tool.owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{tool.owner.name}</span>
                      {tool.owner.verified && (
                        <Badge variant="outline" className="text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{tool.owner.rating} rating</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span>{tool.owner.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tools listed</span>
                    <span>{tool.owner.totalTools}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total rentals</span>
                    <span>{tool.owner.totalRentals}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
