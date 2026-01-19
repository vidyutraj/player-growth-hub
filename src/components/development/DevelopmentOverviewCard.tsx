import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillRadarChart } from './SkillRadarChart';
import { SkillProgressBars } from './SkillProgressBars';
import { TrendSparklines } from './TrendSparklines';

interface DevelopmentOverviewCardProps {
  compact?: boolean;
}

export const DevelopmentOverviewCard = ({ compact = false }: DevelopmentOverviewCardProps) => {
  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Skills Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SkillRadarChart compact />
          <SkillProgressBars compact />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="radar">Radar</TabsTrigger>
            <TabsTrigger value="bars">Progress</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="radar" className="mt-0">
            <SkillRadarChart />
          </TabsContent>
          <TabsContent value="bars" className="mt-0">
            <div className="py-4">
              <SkillProgressBars />
            </div>
          </TabsContent>
          <TabsContent value="trends" className="mt-0">
            <div className="py-4">
              <TrendSparklines />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
