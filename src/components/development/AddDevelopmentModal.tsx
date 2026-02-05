import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { developmentCategories, skillsPerCategory } from '@/data/mockDevelopmentData';
import { Upload } from 'lucide-react';

interface AddDevelopmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDevelopmentModal = ({ open, onOpenChange }: AddDevelopmentModalProps) => {
  const [category, setCategory] = useState<string>('');
  const [skills, setSkills] = useState<Record<string, number>>({});
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const availableSkills = category ? skillsPerCategory[category] || [] : [];

  const handleSkillChange = (skill: string, value: number[]) => {
    setSkills((prev) => ({ ...prev, [skill]: value[0] }));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSkills({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] rounded-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold">Add Development Entry</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Record coaching feedback and skill assessments for this player.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Date & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="h-10 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category" className="h-10 rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {developmentCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subcategory */}
          <div className="space-y-2">
            <Label htmlFor="subcategory" className="text-sm font-medium">Session Focus</Label>
            <Input
              id="subcategory"
              placeholder="e.g., Batting Technique, Match Preparation"
              className="h-10 rounded-lg"
            />
          </div>

          {/* Skills Rating */}
          {availableSkills.length > 0 && (
            <div className="space-y-4">
              <Label className="text-sm font-medium">Skill Ratings</Label>
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                {availableSkills.map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{skill}</span>
                      <span className="text-sm font-medium text-primary w-6 text-right">
                        {skills[skill] || 0}
                      </span>
                    </div>
                    <Slider
                      value={[skills[skill] || 0]}
                      onValueChange={(value) => handleSkillChange(skill, value)}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">Coaching Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Detailed feedback on the player's performance, areas of improvement, and recommendations..."
              className="min-h-[100px] resize-none rounded-lg"
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Media (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drop images or videos here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, MP4 up to 10MB
              </p>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Visible to Player & Parent</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPlayerVisible
                  ? 'This entry will be visible to the player and their parents'
                  : 'Only coaches can see this entry'}
              </p>
            </div>
            <Switch
              checked={isPlayerVisible}
              onCheckedChange={setIsPlayerVisible}
            />
          </div>
        </div>

        <DialogFooter className="pt-4 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg">
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90 rounded-lg">
            Save Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
