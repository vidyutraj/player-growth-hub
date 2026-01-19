import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { mockSkillHistory, skillTrends } from '@/data/mockDevelopmentData';

const skillColors: Record<string, string> = {
  batting: 'hsl(var(--primary))',
  bowling: 'hsl(142, 76%, 36%)',
  fielding: 'hsl(221, 83%, 53%)',
  fitness: 'hsl(262, 83%, 58%)',
  mental: 'hsl(38, 92%, 50%)',
};

const skillLabels: Record<string, string> = {
  batting: 'Batting',
  bowling: 'Bowling',
  fielding: 'Fielding',
  fitness: 'Fitness',
  mental: 'Mental',
};

const trendLabels: Record<string, { label: string; color: string }> = {
  improving: { label: '↑ Improving', color: 'text-emerald-500' },
  stable: { label: '→ Stable', color: 'text-amber-500' },
  declining: { label: '↓ Declining', color: 'text-red-500' },
};

export const TrendSparklines = () => {
  const skills = ['batting', 'bowling', 'fielding', 'fitness', 'mental'] as const;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {skills.map((skill) => {
        const trend = skillTrends[skill];
        const trendInfo = trendLabels[trend];

        return (
          <div key={skill} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {skillLabels[skill]}
              </span>
              <span className={`text-xs font-medium ${trendInfo.color}`}>
                {trendInfo.label}
              </span>
            </div>
            <div className="h-10 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSkillHistory}>
                  <Line
                    type="monotone"
                    dataKey={skill}
                    stroke={skillColors[skill]}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
};
