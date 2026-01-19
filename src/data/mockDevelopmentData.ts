export interface SkillRating {
  skill: string;
  rating: number; // 1-5
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface DevelopmentEntry {
  id: string;
  date: string;
  category: 'Technique' | 'Tactical' | 'Fitness' | 'Mental' | 'Match Readiness';
  subcategory: string;
  coachName: string;
  coachAvatar: string;
  skills: SkillRating[];
  feedback: string;
  media: MediaItem[];
  visibility: 'player-parent' | 'coach-only';
}

export interface SkillHistory {
  date: string;
  batting: number;
  bowling: number;
  fielding: number;
  fitness: number;
  mental: number;
}

export const skillCategories = [
  'Batting',
  'Bowling',
  'Fielding',
  'Fitness',
  'Mental'
] as const;

export const developmentCategories = [
  'Technique',
  'Tactical',
  'Fitness',
  'Mental',
  'Match Readiness'
] as const;

export const skillsPerCategory: Record<string, string[]> = {
  Technique: ['Stance', 'Grip', 'Footwork', 'Shot Selection', 'Bowling Action', 'Arm Speed'],
  Tactical: ['Game Awareness', 'Field Placement', 'Match Strategy', 'Pressure Handling'],
  Fitness: ['Endurance', 'Agility', 'Strength', 'Flexibility', 'Recovery'],
  Mental: ['Concentration', 'Confidence', 'Resilience', 'Team Spirit', 'Decision Making'],
  'Match Readiness': ['Competition Form', 'Practice Performance', 'Technical Consistency', 'Physical Readiness']
};

export const mockDevelopmentEntries: DevelopmentEntry[] = [
  {
    id: '1',
    date: '2026-01-18',
    category: 'Technique',
    subcategory: 'Batting Technique',
    coachName: 'Coach Rahul Sharma',
    coachAvatar: 'RS',
    skills: [
      { skill: 'Stance', rating: 4 },
      { skill: 'Footwork', rating: 3 },
      { skill: 'Shot Selection', rating: 4 },
    ],
    feedback: 'Excellent progress on front foot drives. The backlift is now more controlled and the timing has improved significantly. We need to work on the leg-side play, particularly the flick off the pads. Good session overall - keep practicing the drills we discussed.',
    media: [
      { id: 'm1', type: 'image', url: '/placeholder.svg', caption: 'Front foot drive technique' },
      { id: 'm2', type: 'video', url: '/placeholder.svg', caption: 'Drill session recording' }
    ],
    visibility: 'player-parent'
  },
  {
    id: '2',
    date: '2026-01-15',
    category: 'Mental',
    subcategory: 'Match Pressure',
    coachName: 'Coach Priya Patel',
    coachAvatar: 'PP',
    skills: [
      { skill: 'Concentration', rating: 4 },
      { skill: 'Resilience', rating: 5 },
      { skill: 'Decision Making', rating: 3 },
    ],
    feedback: 'Outstanding mental fortitude shown during the pressure drills. Handled simulated match situations very well. The breathing techniques are working - visible improvement in staying calm. Decision-making under pressure still needs attention, but overall trajectory is very positive.',
    media: [],
    visibility: 'player-parent'
  },
  {
    id: '3',
    date: '2026-01-10',
    category: 'Fitness',
    subcategory: 'Strength & Conditioning',
    coachName: 'Coach Dev Malhotra',
    coachAvatar: 'DM',
    skills: [
      { skill: 'Endurance', rating: 4 },
      { skill: 'Agility', rating: 4 },
      { skill: 'Strength', rating: 3 },
    ],
    feedback: 'Completed the fitness assessment with improved scores across the board. Yo-yo test level increased to 16.4. Core strength is developing well. Recommend focusing on upper body strength for bowling power. Running between wickets speed has notably improved.',
    media: [
      { id: 'm3', type: 'image', url: '/placeholder.svg', caption: 'Fitness assessment results' }
    ],
    visibility: 'player-parent'
  },
  {
    id: '4',
    date: '2026-01-05',
    category: 'Technique',
    subcategory: 'Bowling Action',
    coachName: 'Coach Rahul Sharma',
    coachAvatar: 'RS',
    skills: [
      { skill: 'Bowling Action', rating: 3 },
      { skill: 'Arm Speed', rating: 4 },
      { skill: 'Footwork', rating: 3 },
    ],
    feedback: 'Working on correcting the slight kink in the bowling action. Have introduced new drills to improve the loading position. Arm speed is naturally good - we want to maintain this while cleaning up the action. Video analysis attached for reference.',
    media: [
      { id: 'm4', type: 'video', url: '/placeholder.svg', caption: 'Bowling action analysis' }
    ],
    visibility: 'coach-only'
  },
  {
    id: '5',
    date: '2025-12-28',
    category: 'Tactical',
    subcategory: 'Game Awareness',
    coachName: 'Coach Priya Patel',
    coachAvatar: 'PP',
    skills: [
      { skill: 'Game Awareness', rating: 4 },
      { skill: 'Match Strategy', rating: 3 },
      { skill: 'Field Placement', rating: 4 },
    ],
    feedback: 'Good understanding of match situations. Reading the game well when batting. Discussed various scenarios and how to adapt playing style based on match context. Need to work more on rotating strike during middle overs.',
    media: [],
    visibility: 'player-parent'
  },
  {
    id: '6',
    date: '2025-12-20',
    category: 'Match Readiness',
    subcategory: 'Pre-Season Assessment',
    coachName: 'Coach Dev Malhotra',
    coachAvatar: 'DM',
    skills: [
      { skill: 'Competition Form', rating: 4 },
      { skill: 'Practice Performance', rating: 5 },
      { skill: 'Technical Consistency', rating: 4 },
    ],
    feedback: 'Pre-season assessment shows excellent preparation. Technically sound and physically ready for the upcoming season. Strong performances in practice matches. Keep maintaining the current training intensity. Team selection looking positive.',
    media: [
      { id: 'm5', type: 'image', url: '/placeholder.svg', caption: 'Assessment scorecard' },
      { id: 'm6', type: 'image', url: '/placeholder.svg', caption: 'Practice match highlights' }
    ],
    visibility: 'player-parent'
  }
];

export const mockSkillHistory: SkillHistory[] = [
  { date: 'Oct', batting: 3.2, bowling: 2.8, fielding: 3.5, fitness: 3.0, mental: 3.2 },
  { date: 'Nov', batting: 3.5, bowling: 3.0, fielding: 3.6, fitness: 3.3, mental: 3.4 },
  { date: 'Dec', batting: 3.8, bowling: 3.2, fielding: 3.8, fitness: 3.6, mental: 3.8 },
  { date: 'Jan', batting: 4.0, bowling: 3.4, fielding: 4.0, fitness: 3.8, mental: 4.2 },
];

export const currentSkillLevels = {
  batting: 4.0,
  bowling: 3.4,
  fielding: 4.0,
  fitness: 3.8,
  mental: 4.2,
};

export const skillTrends = {
  batting: 'improving' as const,
  bowling: 'improving' as const,
  fielding: 'stable' as const,
  fitness: 'improving' as const,
  mental: 'improving' as const,
};
