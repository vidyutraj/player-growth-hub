import { Progress } from '@/components/ui/progress';
import { currentSkillLevels, skillTrends } from '@/data/mockDevelopmentData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const skillLabels: Record<string, string> = {
  batting: 'Batting',
  bowling: 'Bowling',
  fielding: 'Fielding',
  fitness: 'Fitness',
  mental: 'Mental',
};

const TrendIcon = ({ trend }: { trend: 'improving' | 'stable' | 'declining' }) => {
  if (trend === 'improving') {
    return <TrendingUp className="h-4 w-4 text-emerald-500" />;
  }
  if (trend === 'declining') {
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  }
  return <Minus className="h-4 w-4 text-amber-500" />;
};

interface SkillProgressBarsProps {
  compact?: boolean;
}

export const SkillProgressBars = ({ compact = false }: SkillProgressBarsProps) => {
  const skills = Object.entries(currentSkillLevels);

  return (
    <div className={`space-y-${compact ? '2' : '3'}`}>
      {skills.map(([key, value]) => (
        <div key={key} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-foreground`}>
              {skillLabels[key]}
            </span>
            <div className="flex items-center gap-2">
              <span className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {value.toFixed(1)}/5
              </span>
              <TrendIcon trend={skillTrends[key as keyof typeof skillTrends]} />
            </div>
          </div>
          <Progress value={(value / 5) * 100} className="h-2" />
        </div>
      ))}
    </div>
  );
};
