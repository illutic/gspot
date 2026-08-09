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

/** Fallback image shown inside the Android device mockup on the Home page */
export const HOME_DEVICE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYNMz0UOk69bc1pTK--CsvtVx8umd7loWDZ0MlBfEIrzgl8i-bsVvPufnlyWD1CingcNMt37QIFidZOpeOz42Y9RLel11Gwr6i7MuCFBm0Ny7ANvVmYm6WM8HnmHu-F5bjAiQDnhOURQLQViYLSSW9texHubs9JnVKnDr49wX7eIfqWfd3fqgYgBijXjnfMv3M9wI8SyBIs8BHRDIYElbxqToXl5s4QKnADy4WGALjsFiAi5xxD20-';

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
 * Cycled as fallback cover images for project cards when
 * no image URL is defined in the markdown frontmatter.
 */
export const PROJECT_DEFAULT_IMAGES: readonly string[] = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDbHoytZmbJveRecnVO31k5XkqpCT80D6WaKxL4tuANklDQr4npnnRo909CH9AdHTTKmjqkZDcDN1JktAktQOVGw2-dap1Sw220y2cwT6VqAPd_g2mNc_GzZ8drtB49UVmc-5p_PEiPcEIqwui9Nr9mkocQObG8icUr2mLTooG3X3D_fBLtB5hwQXtuHHhn0YZJGlPZkZgPn0EsxrOidBlkKMh_KZ3pi85plp9iNboO55Tu8NByYS5W',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ohf-w0M6Q3rriP8m0cLQzIojxqyKn3vWsQQTOTjy_FSMU_NDbc1LyI_LVfedv3p7t2WfCS767FtyoQBX7Vti5ZSCFRp9PykULC5SKl2H60b4c66Q8oMNFgheLzaon91Imqra4FjEn_u858jpMNFWCxYqbxp6-zmRVITw2XY-eh08ECaKLADplEBCcaH-LgrQr21sfMrBA1jqi6J7Bgbp6oqt_kpxG-jB0h7afFaGMwvyiONd7Jbj',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBGBFNhL-ystCGdZcBx7vt-g5C9cr0nmtDM_jXRtJ2OgQ9uulAdQwrNztDjHkUkoaO99Dqae7jE-E0D6zvA8qhZlFkqKhEovA49h6fAjJiuO8vE40ZkRRCLERkotteEKGP6MzExnkRCQP1ihRkgbJPjVkNtk0Jv-ikKv3P9XzZ10v5QmngdBnP53TXA7LEh4iU8RwbQF7ybdqH4LfrX520D3S7kqHy7qOOdDnsvQSlmJJAFZ6sVe1Bt',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC43IqJKWYk0a3UZcsq3HSboPF6rgwiwV5FmOx3__OlNJ9rSHlqE6WA2Mpq_ZeYPPBRhqvfyo7ZVeQHd22ZrzUekKNO4s8jSlrVJRBbVSwy8PZL01HAJy19GbjulvViIMDiOIVMujxHj8YFeUQqHw3JwpUPDpMrBeVy03KJFH7Qiu-AwA6GcoPQSspah91ZVnOf5w3ZVAWhJmDSy9Ev5VDI5wwkqJY_zF-F6DvHjWjnJnNIJc80ekhf',
] as const;

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
