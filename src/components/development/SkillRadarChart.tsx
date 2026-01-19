import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { currentSkillLevels } from '@/data/mockDevelopmentData';

const radarData = [
  { skill: 'Batting', value: currentSkillLevels.batting, fullMark: 5 },
  { skill: 'Bowling', value: currentSkillLevels.bowling, fullMark: 5 },
  { skill: 'Fielding', value: currentSkillLevels.fielding, fullMark: 5 },
  { skill: 'Fitness', value: currentSkillLevels.fitness, fullMark: 5 },
  { skill: 'Mental', value: currentSkillLevels.mental, fullMark: 5 },
];

interface SkillRadarChartProps {
  compact?: boolean;
}

export const SkillRadarChart = ({ compact = false }: SkillRadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={compact ? 200 : 280}>
      <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={compact ? 70 : 100}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: compact ? 10 : 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          name="Current Level"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
