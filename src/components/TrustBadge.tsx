import { Shield, CheckCircle, Award, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TrustBadgeProps {
  type: 'verified' | 'top-contributor' | 'responsive' | 'trusted';
  size?: 'sm' | 'md' | 'lg';
}

export function TrustBadge({ type, size = 'md' }: TrustBadgeProps) {
  const configs = {
      verified: {
      icon: CheckCircle,
      label: 'Verified',
      color: 'bg-green-100 text-green-700 border-green-200',
      tooltip: 'Identity verified by mesariyashare',
    },
    'top-contributor': {
      icon: Award,
      label: 'Top Contributor',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      tooltip: '50+ successful rentals',
    },
    responsive: {
      icon: Clock,
      label: 'Quick Response',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      tooltip: 'Responds within 1 hour',
    },
    trusted: {
      icon: Shield,
      label: 'Trusted Member',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      tooltip: '4.8+ rating with 20+ reviews',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${config.color} ${textSize} gap-1`}>
            <Icon className={iconSize} />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
