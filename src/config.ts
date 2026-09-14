// Single place for every outbound URL, contact detail and lead-form setting.
// Values mirror the live landing at https://voguestock.valura.ai unless noted.

/** Voguestock web app powered by Valura.Ai: new accounts. */
export const SIGNUP_URL = 'https://voguestock-app.valura.ai/auth?mode=signup';
/** Voguestock web app powered by Valura.Ai: existing accounts. */
export const LOGIN_URL = 'https://voguestock-app.valura.ai/auth';

export const APP_STORE_URL = 'https://apps.apple.com/in/app/valura-ai/id6752678259';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ai.valura.invester&hl=en';

// Web3Forms: the access key is a public, client-side key (already used by the live landings).
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY = '8534e800-fe2d-4b45-996b-cdda26d02edb';
export const LEAD_SUBJECT = 'Voguestock powered by Valura.Ai: new lead';
export const LEAD_FROM_NAME = 'Voguestock powered by Valura.Ai website';

// Voguestock contact details, as shown on the live landing and on www.voguestock.in.
export const CONTACT = {
  phoneDisplay: '0120-4918900 / 01',
  phoneHref: 'tel:+911204918900',
  whatsappDisplay: 'WhatsApp +91 88000 94409',
  whatsappHref: 'https://api.whatsapp.com/send?phone=918800094409',
  email: 'Support@voguestock.in',
  address: 'C-62, Sector-65, Noida 201301',
} as const;

// Voguestock policy pages (verified to respond 200).
export const VOGUESTOCK_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://www.voguestock.in/Privacy-Policy.aspx' },
  { label: 'Investor Charter', href: 'https://www.voguestock.in/investorcharter.aspx' },
  { label: 'Disclaimer', href: 'https://www.voguestock.in/Disclaimer.aspx' },
] as const;

/** Header navigation: the live landing's labels and section anchors. */
export const NAV_LINKS = [
  { label: 'Invest in', href: '#invest' },
  { label: 'Why', href: '#why' },
  { label: 'How it works', href: '#how' },
  { label: 'Trust', href: '#trust' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const RISK_LINE =
  'Investments in securities markets are subject to market risks. Read all related documents carefully before investing.';
export const ILLUSTRATIVE_CAPTION = 'Illustrative only. Not investment advice.';
