import { MapPin, Star, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
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
  };
  location: string;
  category: string;
  available: boolean;
}

interface ToolCardProps {
  tool: Tool;
  onViewDetails: (toolId: string) => void;
  onToggleFavorite?: (toolId: string) => void;
  isFavorite?: boolean;
}

export function ToolCard({ tool, onViewDetails, onToggleFavorite, isFavorite }: ToolCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => onViewDetails(tool.id)}
        />
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-9 h-9 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(tool.id);
            }}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
          </Button>
        )}
        {!tool.available && (
          <Badge className="absolute top-2 left-2 bg-gray-900/90 shadow-sm">
            Unavailable
          </Badge>
        )}
        {tool.available && (
          <Badge className="absolute top-2 left-2 bg-green-600 shadow-sm">
            Available Now
          </Badge>
        )}
      </div>
      <CardContent className="p-4" onClick={() => onViewDetails(tool.id)}>
        <div className="mb-2">
          <Badge variant="secondary" className="mb-2">
            {tool.category}
          </Badge>
          <h3 className="line-clamp-1">{tool.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">{tool.description}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{tool.location}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {tool.owner.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm">{tool.owner.name}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{tool.owner.rating}</span>
                {tool.owner.verified && (
                  <Shield className="w-3 h-3 text-green-600 ml-1" />
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-blue-700">${tool.price}</div>
            <div className="text-xs text-gray-500">/{tool.priceUnit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
