import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronDown, ChevronUp, Play, Image, Eye, EyeOff } from 'lucide-react';
import { DevelopmentEntry } from '@/data/mockDevelopmentData';
import { format } from 'date-fns';

interface DevelopmentEntryCardProps {
  entry: DevelopmentEntry;
  isCoachView?: boolean;
}

const categoryColors: Record<string, string> = {
  Technique: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Tactical: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Fitness: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Mental: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'Match Readiness': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
};

export const DevelopmentEntryCard = ({ entry, isCoachView = false }: DevelopmentEntryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCoachOnly = entry.visibility === 'coach-only';

  // Don't show coach-only entries in player view
  if (!isCoachView && isCoachOnly) {
    return null;
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {entry.coachAvatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{entry.coachName}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(entry.date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[entry.category]}>
              {entry.category}
            </Badge>
            {isCoachView && (
              <Badge
                variant="outline"
                className={`text-xs ${
                  isCoachOnly
                    ? 'border-amber-300 text-amber-600 dark:border-amber-600 dark:text-amber-400'
                    : 'border-emerald-300 text-emerald-600 dark:border-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isCoachOnly ? (
                  <><EyeOff className="h-3 w-3 mr-1" /> Coach Only</>
                ) : (
                  <><Eye className="h-3 w-3 mr-1" /> Player & Parent</>
                )}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground font-medium">{entry.subcategory}</p>
        
        {/* Skills Rated */}
        <div className="space-y-2">
          {entry.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{skill.skill}</span>
              <StarRating rating={skill.rating} />
            </div>
          ))}
        </div>

        {/* Feedback - Expandable */}
        <div className="space-y-2">
          <p className={`text-sm text-muted-foreground leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
            {entry.feedback}
          </p>
          {entry.feedback.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-primary hover:bg-transparent"
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Read more <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          )}
        </div>

        {/* Media Thumbnails */}
        {entry.media.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {entry.media.map((media) => (
              <div
                key={media.id}
                className="relative group rounded-lg overflow-hidden bg-muted w-20 h-20 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              >
                <img src={media.url} alt={media.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {media.type === 'video' ? (
                    <Play className="h-6 w-6 text-white" />
                  ) : (
                    <Image className="h-6 w-6 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
