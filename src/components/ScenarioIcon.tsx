import React, { useState } from 'react';
import {
  AlarmClock,
  BookOpen,
  ChefHat,
  CloudRain,
  Compass,
  Image as ImageIcon,
  MessageCircleHeart,
  Palette,
  Shirt,
  Tv,
  Wallet,
} from 'lucide-react';
import { ScenarioIconKey } from '../types/gdcd';

interface ScenarioIconProps {
  icon: ScenarioIconKey;
  className?: string;
}

export function ScenarioIcon({ icon, className = 'w-6 h-6' }: ScenarioIconProps) {
  switch (icon) {
    case 'alarm':
      return <AlarmClock className={className} aria-hidden="true" />;
    case 'shirt':
      return <Shirt className={className} aria-hidden="true" />;
    case 'book':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'tv':
      return <Tv className={className} aria-hidden="true" />;
    case 'palette':
      return <Palette className={className} aria-hidden="true" />;
    case 'message':
      return <MessageCircleHeart className={className} aria-hidden="true" />;
    case 'wallet':
      return <Wallet className={className} aria-hidden="true" />;
    case 'rain':
      return <CloudRain className={className} aria-hidden="true" />;
    case 'chef':
      return <ChefHat className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    default:
      return <BookOpen className={className} aria-hidden="true" />;
  }
}

interface IllustratedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackIcon?: React.ReactNode;
}

export function IllustratedImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel = 'Minh họa GDCD',
  fallbackIcon,
}: IllustratedImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 via-slate-100 to-amber-50 text-blue-900 p-4 text-center"
        role="img"
        aria-label={alt}
      >
        {fallbackIcon ?? <ImageIcon className="w-8 h-8 text-blue-700" aria-hidden="true" />}
        <span className="text-sm font-semibold text-slate-700">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
