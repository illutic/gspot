/**
 * @core/config/siteConfig.ts
 *
 * Central source of truth for all site-wide constants.
 * Edit this file to update personal details, social links, and
 * feature-level defaults without touching component code.
 */

// ─── Owner ────────────────────────────────────────────────────────────────────

export const OWNER = {
  name: 'George Sigalas',
  title: 'Senior Android Developer',
  location: 'Portsmouth, UK',
  email: 'georgesg97@gmail.com',
  phoneUK: '+44 (0) 7432 586690',
  phoneGR: '+30 698 496 1329',
} as const;

// ─── Social & External Links ───────────────────────────────────────────────────

export const SOCIAL = {
  github: 'https://github.com/illutic',
  githubHandle: 'github.com/illutic',
  linkedin: 'https://www.linkedin.com/in/g-sigalas/',
  linkedinHandle: 'linkedin.com/in/g-sigalas',
} as const;

export const RESUME_URL = '/resume.pdf';

export const EDUCATION = {
  degree: 'BSc Computer Science',
  university: 'University of Portsmouth',
  period: '2018 – 2022',
} as const;

/** Endpoint URL for contact form submissions (AWS Lambda Function URL or fallback API path) */
export const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

// ─── Home / Hero ──────────────────────────────────────────────────────────────

/** Shown when the hero.md frontmatter is missing values */
export const HERO_FALLBACKS = {
  yearsExp: '5+',
  appsShipped: '4',
  recognition: 'BSc CS',
  badges: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'MVI'] as string[],
  snippetTitle: 'AiChatbot.kt',
  snippetCode: [
    '@Composable',
    'fun ChatScreen(',
    '  viewModel: ChatViewModel = hiltViewModel()',
    ') {',
    '  val state by viewModel',
    '    .uiState',
    '    .collectAsStateWithLifecycle()',
    '  // 60% network improvement \u2713',
    '}',
  ].join('\n'),
} as const;

/** Optional fallback image shown inside the Android device mockup on the Home page */
export const HOME_DEVICE_IMAGE = '';

// ─── Experience ───────────────────────────────────────────────────────────────

/** Fallback strings used when a career.md block is missing a field. */
export const EXPERIENCE_FALLBACKS = {
  role: 'Software Engineer',
  company: 'Tech Company',
} as const;

/**
 * Keywords scanned inside highlight bullet text to decide whether
 * a role is shown in "Impact Highlights" filter mode.
 * Add or remove terms here — no component code needs to change.
 */
export const EXPERIENCE_HIGHLIGHT_KEYWORDS: readonly string[] = [
  '60%',
  '80%',
  'LLM',
  'rewrite',
  'led',
] as const;

/**
 * Regex patterns used to extract auto-detected metric callouts
 * from highlight bullet text. Each entry produces a MetricCallout card.
 * pattern  – named-capture group `value` must capture the metric string.
 * label    – label shown under the value.
 */
export const EXPERIENCE_METRIC_PATTERNS: Array<{
  pattern: RegExp;
  label: string;
}> = [
    {
      pattern: /up to a (?<value>\d+%) network performance improvement/i,
      label: 'Network Improvement',
    },
    {
      pattern: /reduced .* by (?<value>\d+%)/i,
      label: 'Build Time Reduction',
    },
    {
      pattern: /(?<value>\d+%) .*(build time|build)/i,
      label: 'Build Time Reduction',
    },
  ];

/**
 * Badge variants: tags whose text includes any of these strings
 * get the "primary" (emerald) badge variant on experience cards.
 */
export const EXPERIENCE_PRIMARY_TAG_KEYWORDS: readonly string[] = [
  'LLM',
  'Compose',
] as const;

// ─── Projects ─────────────────────────────────────────────────────────────────

/**
 * Default cover images for project cards when no image URL is defined in frontmatter.
 */
export const PROJECT_DEFAULT_IMAGES: readonly string[] = [] as const;

// NOTE: Blog and project tag filters are derived dynamically from content
// at module scope in blogRegistry.ts and parseProjects.ts respectively.
// Do NOT add hardcoded tag lists here — they will not stay in sync.

/**
 * Badge styling: tags whose text includes any of these strings
 * get the "primary" (emerald) badge variant on project cards.
 * This is about visual emphasis, not filtering — stays in siteConfig.
 */
export const PROJECT_PRIMARY_TAG_KEYWORDS: readonly string[] = [
  'LLM',
  'AI',
  'KMP',
] as const;
