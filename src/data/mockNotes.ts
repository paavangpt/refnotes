import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  color: string;
  isPinned: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

const createMockNote = (
  userId: string, 
  title: string, 
  content: string, 
  tags: string[] = [], 
  color: string = "",
  isPinned: boolean = false,
  isPrivate: boolean = false,
  createdAt?: string
): Note => {
  const date = createdAt ? new Date(createdAt) : new Date();
  return {
    id: uuidv4(),
    userId,
    title,
    content,
    tags,
    color,
    isPinned,
    isPrivate,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  };
};

export const mockNotes: Note[] = [
  // Angelica Rose (user-001) notes
  createMockNote(
    "user-001",
    "Meeting Notes: Product Strategy",
    "# Product Strategy Meeting\n\n## Attendees\n- Jane Doe (PM)\n- John Smith (Dev)\n- Alice Johnson (Design)\n\n## Agenda\n1. Q2 Roadmap Review\n2. Feature Prioritization\n3. User Feedback Discussion\n\n## Action Items\n- [ ] Jane: Create product spec for new dashboard\n- [ ] John: Estimate development effort\n- [ ] Alice: Update design mockups\n\n## Notes\nWe decided to focus on improving the dashboard experience for Q2. Users have been requesting better data visualization and export options. We'll need to prioritize the analytics API work to support this.",
    ["work", "product", "meeting"],
    "#8b5cf6",
    true,
    false,
    "2023-07-10T14:30:00.000Z"
  ),
  createMockNote(
    "user-001",
    "Learning React Hooks",
    "# React Hooks Notes\n\n## useState\n```jsx\nconst [state, setState] = useState(initialState);\n```\nUse for local component state\n\n## useEffect\n```jsx\nuseEffect(() => {\n  // side effects here\n  return () => {\n    // cleanup function\n  };\n}, [dependencies]);\n```\nUse for side effects\n\n## Custom Hook Example\n```jsx\nfunction useWindowSize() {\n  const [size, setSize] = useState({width: 0, height: 0});\n  \n  useEffect(() => {\n    const handleResize = () => {\n      setSize({width: window.innerWidth, height: window.innerHeight});\n    };\n    window.addEventListener('resize', handleResize);\n    handleResize();\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n  \n  return size;\n}\n```",
    ["programming", "react", "hooks"],
    "#3b82f6",
    false,
    false,
    "2023-06-25T09:15:00.000Z"
  ),
  createMockNote(
    "user-001",
    "Grocery List",
    "# Grocery List\n\n## Produce\n- [ ] Spinach\n- [ ] Tomatoes\n- [ ] Avocados\n- [ ] Bell peppers\n\n## Dairy\n- [ ] Greek yogurt\n- [ ] Almond milk\n- [ ] Cheese\n\n## Pantry\n- [ ] Quinoa\n- [ ] Black beans\n- [ ] Olive oil\n- [ ] Honey\n\n## Other\n- [ ] Paper towels\n- [ ] Dish soap",
    ["personal", "shopping"],
    "#10b981",
    false,
    true,
    "2023-07-05T18:45:00.000Z"
  ),
  createMockNote(
    "user-001",
    "UI Animation Principles",
    "# UI Animation Principles\n\n## Key Principles\n\n1. **Purpose**: Every animation should serve a purpose\n2. **Timing**: Keep animations brief (200-500ms)\n3. **Consistency**: Use similar animations for similar actions\n4. **Subtlety**: Avoid excessive or distracting motion\n\n## Animation Types\n\n- **Transitions**: Moving between states or screens\n- **Feedback**: Confirming user actions\n- **Status**: Indicating loading or progress\n- **Demonstrations**: Showing how features work\n\n## CSS Animation Example\n\n```css\n.button {\n  transition: transform 0.2s ease-in-out;\n}\n\n.button:hover {\n  transform: scale(1.05);\n}\n```\n\nRemember: Animation should enhance the user experience, not distract from it.",
    ["design", "animation", "ui"],
    "#ec4899",
    true,
    false,
    "2023-08-05T08:20:00.000Z"
  ),
  
  // Marcus Chen (user-002) notes
  createMockNote(
    "user-002",
    "Project Ideas",
    "# Project Ideas\n\n## Web Apps\n1. **Task Management System**\n   - Features: Kanban board, time tracking, team collaboration\n   - Tech stack: React, Node.js, MongoDB\n\n2. **Recipe Finder**\n   - Features: Search by ingredients, dietary restrictions, save favorites\n   - Tech stack: Vue.js, Firebase\n\n## Mobile Apps\n1. **Fitness Tracker**\n   - Features: Workout routines, progress charts, nutrition logging\n   - Tech: React Native\n\n2. **Language Learning Game**\n   - Features: Spaced repetition, audio pronunciation, daily challenges\n   - Tech: Flutter\n\n## Game Development\n1. **2D Platformer**\n   - Features: Procedurally generated levels, character progression\n   - Tech: Unity\n\n## Learning Goals\n- [ ] GraphQL\n- [ ] WebAssembly\n- [ ] Rust\n- [ ] Machine Learning basics",
    ["programming", "ideas", "projects"],
    "#f59e0b",
    true,
    false,
    "2023-06-20T11:00:00.000Z"
  ),
  createMockNote(
    "user-002",
    "Debugging Notes: Memory Leak in Node.js App",
    "# Memory Leak Debugging\n\n## Symptoms\n- Increasing memory usage over time\n- Performance degradation after ~24h uptime\n- Eventually crashes with \"FATAL ERROR: JavaScript heap out of memory\"\n\n## Debugging Steps\n1. Used `--inspect` flag to connect Chrome DevTools\n2. Generated heap snapshots at different time intervals\n3. Compared snapshots to identify growing objects\n\n## Findings\n- Event listeners not being removed properly in the WebSocket manager\n- Connection objects stored in array but never removed when disconnected\n- Closure in timer callback holding reference to large objects\n\n## Solutions\n```javascript\n// Before - Problem: callback closure retains reference to 'data'\nfunction processData(data) {\n  setInterval(() => {\n    doSomethingWith(data);\n  }, 1000);\n}\n\n// After - Fixed: store only what's needed\nfunction processData(data) {\n  const necessaryValue = extractValue(data);\n  setInterval(() => {\n    doSomethingWith(necessaryValue);\n  }, 1000);\n}\n```\n\n## Memory Management Best Practices\n- Use WeakMap/WeakSet for caches\n- Clear timers with clearInterval/clearTimeout\n- Remove event listeners when components unmount\n- Be careful with closures in long-lived callbacks\n- Monitor memory usage in production",
    ["programming", "debugging", "nodejs"],
    "#ef4444",
    false,
    false,
    "2023-07-01T15:20:00.000Z"
  ),
  createMockNote(
    "user-002",
    "TypeScript Advanced Types",
    "# TypeScript Advanced Types\n\n## Utility Types\n\n### Partial<T>\n```typescript\ntype User = { id: string; name: string; email: string };\ntype PartialUser = Partial<User>; // All properties optional\n```\n\n### Pick<T, K>\n```typescript\ntype UserName = Pick<User, 'name'>; // { name: string }\n```\n\n### Omit<T, K>\n```typescript\ntype UserWithoutId = Omit<User, 'id'>; // { name: string; email: string }\n```\n\n## Conditional Types\n```typescript\ntype ExtractNumber<T> = T extends number ? T : never;\n```\n\n## Template Literal Types\n```typescript\ntype EventName<T extends string> = `${T}Changed`;\ntype UserEvents = EventName<'name' | 'email'>; // 'nameChanged' | 'emailChanged'\n```\n\n## Mapped Types\n```typescript\ntype ReadOnly<T> = { readonly [P in keyof T]: T[P] };\n```\n\nThese advanced types make TypeScript extremely powerful for creating type-safe applications.",
    ["typescript", "programming", "types"],
    "#3b82f6",
    true,
    false,
    "2023-08-12T09:45:00.000Z"
  ),
  
  // Sarah Johnson (user-003) notes
  createMockNote(
    "user-003",
    "Design System Components",
    "# Design System Components\n\n## Buttons\n- Primary: `#4f46e5`\n- Secondary: `#6b7280`\n- Danger: `#ef4444`\n- Success: `#10b981`\n\n### Button Sizes\n- Small: 24px height, 12px font\n- Medium: 36px height, 14px font\n- Large: 48px height, 16px font\n\n## Typography\n- Headings: Inter, font-weight: 700\n- Body: Inter, font-weight: 400\n- Monospace: JetBrains Mono\n\n### Type Scale\n- xs: 12px\n- sm: 14px\n- base: 16px\n- lg: 18px\n- xl: 20px\n- 2xl: 24px\n- 3xl: 30px\n- 4xl: 36px\n\n## Input Fields\n- Height: 40px\n- Border: 1px solid `#d1d5db`\n- Border Radius: 6px\n- Focus State: 2px solid `#4f46e5`, border: transparent\n\n## Spacing System\n- 4px increments\n- Named tokens: 2xs (4px), xs (8px), sm (12px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)\n\n## Colors\n- Primary: `#4f46e5`\n- Gray: `#6b7280`\n- Error: `#ef4444`\n- Warning: `#f59e0b`\n- Success: `#10b981`\n- Info: `#3b82f6`\n\n## Shadow Styles\n- sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`\n- md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`\n- lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`\n- xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`",
    ["design", "ui", "components"],
    "#ec4899",
    true,
    false,
    "2023-06-15T10:30:00.000Z"
  ),
  createMockNote(
    "user-003",
    "Book Notes: Design of Everyday Things",
    "# Design of Everyday Things - Don Norman\n\n## Key Concepts\n\n### Affordances\nProperties that determine how an object could possibly be used. Good design makes affordances visible.\n\n### Signifiers\nSignals that communicate where and how an action should take place. Unlike affordances, signifiers are deliberately placed.\n\n### Constraints\nLimit the possible actions that can be performed. Types:\n- Physical constraints\n- Cultural constraints\n- Semantic constraints\n- Logical constraints\n\n### Mapping\nRelationship between controls and their effects. Example: Stovetop knobs should clearly map to burners.\n\n### Feedback\nCommunicating the results of an action. Should be:\n- Immediate\n- Clear\n- Not excessive\n\n## Design Principles\n\n1. **Visibility**: Important functions should be visible\n2. **Feedback**: Actions should provide clear, timely feedback\n3. **Constraints**: Limit possible actions to prevent errors\n4. **Consistency**: Similar operations use similar elements\n5. **Affordances**: Make it obvious how to use objects\n6. **Mappings**: Make controls logically relate to their function\n\n## Examples from the Book\n\n- **Bad Design**: Glass doors where you can't tell if you should push or pull\n- **Good Design**: Stove with burners arranged to match control knobs\n\n## Quotes\n\n> \"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.\"\n\n> \"Design is really an act of communication, which means having a deep understanding of the person with whom the designer is communicating.\"",
    ["design", "books", "notes"],
    "",
    false,
    false,
    "2023-06-28T21:15:00.000Z"
  ),
  createMockNote(
    "user-003",
    "Community Guidelines Draft",
    "# Community Guidelines\n\n## Core Principles\n\n1. **Respect**: Treat all community members with respect and consideration\n2. **Inclusivity**: Create a welcoming environment for everyone regardless of background\n3. **Quality**: Share thoughtful and constructive content\n4. **Safety**: Help maintain a safe space free from harassment and abuse\n\n## Guidelines\n\n### Content Standards\n- Keep discussions relevant to the platform's focus\n- Provide value through your contributions\n- Use clear and accessible language\n- Credit sources when sharing others' work\n\n### Prohibited Behavior\n- Harassment or bullying of any kind\n- Hate speech or discrimination\n- Spam or excessive self-promotion\n- Sharing misinformation or unverified claims\n- Violating others' privacy\n\n### Moderation Process\n1. Warning for first-time violations\n2. Temporary restrictions for repeated issues\n3. Permanent removal for serious or continued violations\n\n## Reporting\nUse the report button to flag content that violates these guidelines. All reports will be reviewed by the moderation team within 24 hours.",
    ["community", "moderation", "guidelines"],
    "#10b981",
    true,
    false,
    "2023-07-14T13:20:00.000Z"
  ),
  
  // Alex Thompson (user-004) notes
  createMockNote(
    "user-004",
    "Design Trends 2023",
    "# Design Trends 2023\n\n## Dominant Trends\n\n### 1. 3D Elements\n- Integration of 3D elements in otherwise flat designs\n- Subtle animations to enhance depth perception\n- More accessible tools making 3D design mainstream\n\n### 2. Dark Mode Innovations\n- Beyond simple color inversion\n- Strategic use of color and contrast\n- Dynamic dark mode transitions\n\n### 3. Micro-interactions\n- Subtle feedback animations\n- Human-centered design focus\n- Creating memorable moments in user flow\n\n### 4. Minimalism 2.0\n- Functional minimalism rather than aesthetic\n- Focus on reducing cognitive load\n- Simplified navigation patterns\n\n### 5. Glassmorphism Evolution\n- More refined blur effects\n- Thoughtful transparency levels\n- Combination with subtle shadows for depth\n\n## Tooling Changes\n- AI-assisted design tools becoming mainstream\n- Better cross-platform design systems\n- Improved handoff between design and development\n\n## Typography Trends\n- Variable fonts for responsive design\n- Bold, expressive typography as focal points\n- Custom fonts for brand identity\n\nKeeping up with trends is important, but remember to prioritize user needs over visual novelty.",
    ["design", "trends", "ui"],
    "#a855f7",
    true,
    false,
    "2023-05-10T09:30:00.000Z"
  ),
  createMockNote(
    "user-004",
    "User Research Methods",
    "# User Research Methods\n\n## Qualitative Methods\n\n### 1. User Interviews\n- One-on-one conversations with users\n- Usually 30-60 minutes\n- Good for in-depth understanding of behaviors and attitudes\n\n### 2. Contextual Inquiry\n- Observing users in their natural environment\n- Understanding real-world context of product use\n- Identifying pain points not mentioned in interviews\n\n### 3. Focus Groups\n- Small group discussions (5-8 participants)\n- Moderated conversation about specific topics\n- Good for generating ideas and exploring reactions\n\n## Quantitative Methods\n\n### 1. Surveys\n- Collecting data from large user samples\n- Structured questions with defined responses\n- Good for validating hypotheses with statistical confidence\n\n### 2. Analytics Review\n- Analyzing behavioral data from product usage\n- Identifying patterns and trends\n- Measuring actual behavior vs. reported behavior\n\n### 3. A/B Testing\n- Testing variations with random user groups\n- Measuring performance differences\n- Data-driven decision making\n\n## Research Planning\n\n1. Define research questions\n2. Select appropriate methods\n3. Recruit participants (5-8 for qualitative, larger samples for quantitative)\n4. Prepare research materials\n5. Conduct research\n6. Analyze and synthesize findings\n7. Create actionable recommendations",
    ["research", "ux", "methods"],
    "#3b82f6",
    false,
    false,
    "2023-06-22T14:15:00.000Z"
  ),
  createMockNote(
    "user-004",
    "Accessibility Checklist",
    "# Web Accessibility Checklist\n\n## Visual Design\n\n- [ ] Color contrast meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)\n- [ ] Information is not conveyed by color alone\n- [ ] Text can be resized up to 200% without loss of content/functionality\n- [ ] Interface has sufficient whitespace for readability\n\n## Content & Typography\n\n- [ ] Headings are used in proper hierarchical order (H1, H2, etc.)\n- [ ] Link text is descriptive (no \"click here\" or \"read more\")\n- [ ] Reading level is appropriate for audience (aim for Grade 8-10)\n- [ ] Text alternatives are provided for non-text content\n- [ ] Icons have text labels or aria-labels\n\n## Interaction\n\n- [ ] All functionality is available via keyboard\n- [ ] Keyboard focus is visible and follows logical sequence\n- [ ] No keyboard traps (can navigate in and out of components)\n- [ ] Interactive elements have sufficient touch target size (44×44px)\n- [ ] Form fields have associated labels\n\n## Technical Implementation\n\n- [ ] Semantic HTML is used appropriately\n- [ ] ARIA is used where necessary (but not overused)\n- [ ] Dynamic content changes announce updates to screen readers\n- [ ] Page title is descriptive and unique\n- [ ] Language is specified in HTML\n\n## Testing\n\n- [ ] Tested with keyboard navigation\n- [ ] Tested with screen reader\n- [ ] Tested at 200% zoom\n- [ ] Automated testing tools used (Axe, WAVE, etc.)\n- [ ] Tested with actual users with disabilities when possible",
    ["accessibility", "design", "web"],
    "#10b981",
    true,
    false,
    "2023-08-02T10:45:00.000Z"
  ),
  
  // Elena Rodriguez (user-005) notes
  createMockNote(
    "user-005",
    "Content Calendar Template",
    "# Q4 Content Calendar\n\n## October\n\n### Week 1: Product Update Focus\n- Monday: Blog post on new features\n- Wednesday: Tutorial video on advanced usage\n- Friday: User success story\n\n### Week 2: Industry Trends\n- Monday: Expert interview\n- Wednesday: Industry data analysis\n- Friday: Trend prediction post\n\n### Week 3: Community Spotlight\n- Monday: Community member interview\n- Wednesday: Showcase of community projects\n- Friday: AMA session announcement\n\n### Week 4: Educational Series\n- Monday: Beginner guide part 1\n- Wednesday: Beginner guide part 2\n- Friday: Resources roundup\n\n## November\n\n### Week 1: Case Studies\n- Monday: Enterprise implementation case\n- Wednesday: SMB success story\n- Friday: ROI analysis\n\n## Content Types Distribution\n\n- Blog posts: 40%\n- Videos: 20%\n- Social media: 25%\n- Email newsletters: 15%\n\n## Promotional Plan\n\n- Organic social: All content\n- Paid promotion: Product updates, case studies\n- Email: Weekly digest, special announcements\n- Partners: Co-marketing for expert interviews",
    ["marketing", "planning", "content"],
    "#f59e0b",
    true,
    false,
    "2023-07-25T11:20:00.000Z"
  ),
  createMockNote(
    "user-005",
    "Email Newsletter Best Practices",
    "# Email Newsletter Best Practices\n\n## Subject Lines\n\n- Keep under 50 characters\n- Create urgency without using spam triggers\n- Use personalization where appropriate\n- A/B test regularly (2-3 variations)\n- Be specific rather than clever\n\n## Content Structure\n\n- Start with most important content\n- Use clear hierarchy (headings, subheadings)\n- Limit to 3-5 sections maximum\n- One primary call-to-action\n- Short paragraphs (2-3 sentences)\n\n## Design Considerations\n\n- Mobile-first approach (60%+ opens on mobile)\n- Readable font size (16px minimum)\n- Alt text for all images\n- Dark mode compatibility\n- Fallbacks for email clients that block images\n\n## Timing & Frequency\n\n- Consistency over perfect timing\n- Tuesday-Thursday generally performs best\n- 10am-2pm local time for B2B\n- Test sending times for your audience\n- Respect frequency expectations (don't suddenly increase)\n\n## Technical Requirements\n\n- Proper authentication (SPF, DKIM, DMARC)\n- Unsubscribe link clearly visible\n- Physical address included\n- Test across multiple email clients\n- Keep file size under 100KB when possible\n\n## Performance Metrics\n\n- Open rate: Industry average 15-25%\n- Click rate: Industry average 2-5%\n- Unsubscribe rate: Under 0.5% is good\n- Monitor deliverability and bounce rates\n- Track conversions, not just clicks",
    ["email", "marketing", "newsletter"],
    "#3b82f6",
    false,
    false,
    "2023-08-18T15:45:00.000Z"
  ),
  createMockNote(
    "user-005",
    "Social Media Strategy Review",
    "# Social Media Strategy Review\n\n## Platform Performance\n\n### LinkedIn\n- Highest conversion rate (3.2%)\n- Best for: Industry insights, case studies\n- Post frequency: 3-4/week\n- Key metric improvement: 23% engagement increase\n\n### Twitter\n- Highest engagement rate (4.7%)\n- Best for: News, quick tips, conversations\n- Post frequency: Daily\n- Key metric improvement: 15% follower growth\n\n### Instagram\n- Best visual showcase\n- Best for: Culture, behind-the-scenes, visual products\n- Post frequency: 2-3/week\n- Key metric improvement: 35% reach increase\n\n## Content Performance\n\n### Top Performing Content Types\n1. Industry data visualizations\n2. Team spotlight posts\n3. Product tips and tutorials\n4. Customer success stories\n5. Industry news analysis\n\n### Underperforming Content\n1. General motivational quotes\n2. Generic product photos\n3. Text-heavy infographics\n\n## Q3 Learnings\n\n- Video content consistently outperforms static posts (2.7x engagement)\n- Posting between 10am-12pm generates 22% higher engagement\n- Posts mentioning industry trends get 35% more shares\n- Posts with personal stories from team receive 47% more comments\n\n## Q4 Adjustments\n\n- Increase video content by 30%\n- Develop LinkedIn showcase page for product division\n- Implement social listening for competitive intelligence\n- Launch employee advocacy program\n- Create dedicated hashtag strategy\n\n## Budget Allocation\n\n- Content creation: 40%\n- Paid amplification: 30%\n- Tools and analytics: 20%\n- Training: 10%",
    ["social media", "marketing", "strategy"],
    "#ef4444",
    true,
    false,
    "2023-09-05T09:30:00.000Z"
  ),
];

// Helper function to get notes by user ID
export const getNotesByUserId = (userId: string): Note[] => {
  return mockNotes.filter(note => note.userId === userId);
}; 