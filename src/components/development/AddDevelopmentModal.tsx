import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { developmentCategories, skillsPerCategory } from '@/data/mockDevelopmentData';

interface AddDevelopmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDevelopmentModal = ({ open, onOpenChange }: AddDevelopmentModalProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const availableSkills = category ? skillsPerCategory[category] || [] : [];

  const handleSkillChange = (skill: string, value: number[]) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skill]: value[0],
    }));
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSelectedSkills({});
  };

  const handleSubmit = () => {
    // Mock submit - in real app this would save to backend
    console.log({
      date,
      category,
      skills: selectedSkills,
      feedback,
      visibility: isPlayerVisible ? 'player-parent' : 'coach-only',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Development Entry</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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

          {/* Skills Rating */}
          {availableSkills.length > 0 && (
            <div className="space-y-4">
              <Label>Skills Assessment</Label>
              <div className="space-y-4 bg-muted/50 rounded-lg p-4">
                {availableSkills.map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill}</span>
                      <span className="text-sm text-muted-foreground">
                        {selectedSkills[skill] || 0}/5
                      </span>
                    </div>
                    <Slider
                      value={[selectedSkills[skill] || 0]}
                      onValueChange={(value) => handleSkillChange(skill, value)}
                      max={5}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coach Feedback */}
          <div className="space-y-2">
            <Label>Coach Feedback</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter detailed feedback about the player's performance, areas of improvement, and recommendations..."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop photos or videos, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Max 10MB per file • JPG, PNG, MP4
              </p>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label className="text-base">Visible to Player & Parent</Label>
              <p className="text-sm text-muted-foreground">
                {isPlayerVisible
                  ? 'This entry will be visible to the player and their parents'
                  : 'This entry will only be visible to coaches'}
              </p>
            </div>
            <Switch checked={isPlayerVisible} onCheckedChange={setIsPlayerVisible} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
