export const ROUTES = {
  HOME: '/',
  DISCOVER: '/discover',
  GROUP: '/group/:groupId',
  THREAD: '/thread/:threadId',
  PROFILE: '/profile',
  MESSAGES: '/messages',
  SETTINGS: '/settings'
};

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'Grid3x3' },
  { id: 'Technology', name: 'Technology', icon: 'Cpu' },
  { id: 'Art & Design', name: 'Art & Design', icon: 'Palette' },
  { id: 'Music', name: 'Music', icon: 'Music' },
  { id: 'Gaming', name: 'Gaming', icon: 'Gamepad2' },
  { id: 'Science', name: 'Science', icon: 'Microscope' },
  { id: 'Sports', name: 'Sports', icon: 'Trophy' },
  { id: 'Food', name: 'Food', icon: 'Coffee' },
  { id: 'Travel', name: 'Travel', icon: 'Map' }
];

export const COLORS = {
  primary: '#7C3AED',      // Harmonious violet
  secondary: '#F59E0B',    // Warm amber
  accent: '#10B981',       // Fresh emerald
  surface: '#FEFEFE',      // Clean white surface
  background: '#FAFAFB',   // Subtle background
  success: '#10B981',      // Emerald success
  warning: '#F59E0B',      // Amber warning
  error: '#EF4444',        // Clear red error
  info: '#3B82F6'          // Trustworthy blue
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300
};

export const TOAST_SETTINGS = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export const BADGES = {
  'Early Adopter': { color: 'primary', icon: 'Zap' },
  'Tech Enthusiast': { color: 'secondary', icon: 'Cpu' },
  'Community Builder': { color: 'accent', icon: 'Users' },
  'Creative Genius': { color: 'primary', icon: 'Palette' },
  'Color Master': { color: 'secondary', icon: 'Paintbrush' },
  'Sound Pioneer': { color: 'accent', icon: 'Music' },
  'Collaboration Expert': { color: 'primary', icon: 'Users' },
  'Strategic Mind': { color: 'secondary', icon: 'Brain' },
  'Team Player': { color: 'accent', icon: 'Users' },
  'Meta Analyst': { color: 'primary', icon: 'BarChart' },
  'Cosmic Explorer': { color: 'secondary', icon: 'Telescope' },
  'Science Advocate': { color: 'accent', icon: 'Microscope' },
  'Wellness Guru': { color: 'primary', icon: 'Heart' },
  'Motivator': { color: 'secondary', icon: 'Zap' },
  'Code Ninja': { color: 'accent', icon: 'Code' },
  'Open Source Hero': { color: 'primary', icon: 'Github' },
  'Design Thinker': { color: 'secondary', icon: 'Figma' },
  'Accessibility Champion': { color: 'accent', icon: 'Eye' }
};