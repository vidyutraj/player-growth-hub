import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Play, Image, Eye, EyeOff } from 'lucide-react';
import { DevelopmentEntry } from '@/data/mockDevelopmentData';
import { format } from 'date-fns';

interface DevelopmentEntryCardProps {
  entry: DevelopmentEntry;
  isCoachView?: boolean;
}

const categoryColors: Record<string, string> = {
  Technique: 'bg-primary/10 text-primary border-primary/20',
  Tactical: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  Fitness: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  Mental: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  'Match Readiness': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
};

const RatingDots = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`h-2 w-2 rounded-full ${
            dot <= rating
              ? 'bg-primary'
              : 'bg-muted'
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
    <Card className="overflow-hidden transition-all hover:shadow-sm border rounded-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarFallback className="bg-muted text-muted-foreground font-medium text-sm rounded-full">
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
            <Badge variant="outline" className={`text-xs font-normal border ${categoryColors[entry.category]}`}>
              {entry.category}
            </Badge>
            {isCoachView && (
              <Badge
                variant="outline"
                className={`text-xs font-normal ${
                  isCoachOnly
                    ? 'border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:bg-amber-950'
                    : 'border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:bg-emerald-950'
                }`}
              >
                {isCoachOnly ? (
                  <><EyeOff className="h-3 w-3 mr-1" /> Coach Only</>
                ) : (
                  <><Eye className="h-3 w-3 mr-1" /> Visible</>
                )}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        <p className="text-sm font-medium text-foreground">{entry.subcategory}</p>
        
        {/* Skills Rated */}
        <div className="space-y-2.5">
          {entry.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{skill.skill}</span>
              <RatingDots rating={skill.rating} />
            </div>
          ))}
        </div>

        {/* Feedback - Expandable */}
        <div className="space-y-2 pt-2 border-t">
          <p className={`text-sm text-muted-foreground leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
            {entry.feedback}
          </p>
          {entry.feedback.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-primary hover:bg-transparent hover:text-primary/80 font-medium"
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
          <div className="flex gap-2 flex-wrap pt-2">
            {entry.media.map((media) => (
              <div
                key={media.id}
                className="relative group rounded-lg overflow-hidden bg-muted w-16 h-16 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              >
                <img src={media.url} alt={media.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {media.type === 'video' ? (
                    <Play className="h-5 w-5 text-background" />
                  ) : (
                    <Image className="h-5 w-5 text-background" />
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
