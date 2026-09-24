import type { Translations } from './es'

export const en: Translations = {
  nav: {
    services:  'Services',
    delivery:  'Pickup & Delivery',
    location:  'Location',
    whatsapp:  'Message us',
    home:      'Home',
  },
  hero: {
    eyebrow:         '01 — Premium Laundry & Dry Cleaning · Distrito Tec',
    headline:        'More time\nfor you.',
    subheadStrong:   'Premium laundry & dry cleaning',
    subheadTertiary: 'Premium service in Distrito Tec, Monterrey. Laundry by the kilo and professional dry cleaning. Expert care for your everyday clothes and delicate garments, with pickup and home delivery.',
    ctaPrimary:      'Message us',
    ctaSecondary:    'Get directions →',
    whatsappMessage: "Hi LAVALAVA! I'd like more information.",
  },
  welcome: {
    text: 'Welcome to LAVALAVA — enjoy a special gift on your first visit.',
  },
  pillars: {
    eyebrow: '01 — Why LAVALAVA',
    items: [
      {
        title:       'Visible care',
        description: 'We treat every garment as if it were our own. Inspected, sorted, and processed with attention to detail.',
      },
      {
        title:       'Effortless',
        description: "Message us, we pick up, we deliver. Or stop by — we're minutes from Tec.",
      },
      {
        title:       'Reliable timing',
        description: "Your clothes ready when we promise. We let you know via WhatsApp the moment they're done.",
      },
    ],
  },
  trust: {
    rating:  '5.0 ★ on Google',
    clients: '1,300+ clients',
    zone:    'Zona Tec',
  },
  services: {
    eyebrow:  '02 — Services',
    headline: 'The care your\nclothes deserve.',
    items: [
      {
        title:       'Wash & fold by kilo',
        description: 'Professional wash and dry. Ready in 24 hours.',
        badge:       'Most popular',
      },
      {
        title:       'Dry cleaning',
        description: 'Solvent cleaning for delicate and formal garments.',
      },
      {
        title:       'Wash & press',
        description: 'Clean clothes, perfectly pressed and ready to wear.',
      },
      {
        title:       'Repairs & Alterations',
        description: 'Zipper replacement, button repair, hemming, and minor garment fixes.',
      },
      {
        title:       'Duvets & bedding',
        description: 'Comforters, duvets, pillows, and all bed linens.',
      },
      {
        title:       'Sneakers',
        description: 'Deep cleaning and restoration of athletic footwear.',
      },
      {
        title:       'Pickup & delivery',
        description: 'We pick up and deliver to your door. Coverage in Distrito Tec and surrounding areas.',
        badge:       'Premium',
      },
    ],
    cta: 'View all services →',
  },
  howItWorks: {
    eyebrow:  '03 — How it works',
    headline: 'As easy as\na message.',
    steps: [
      { number: '01', title: 'Message us',          description: 'Send us a WhatsApp. We reply immediately.' },
      { number: '02', title: 'We pick up',           description: 'We collect your clothes at your convenience.' },
      { number: '03', title: 'We care',              description: 'Every garment processed with attention and care.' },
      { number: '04', title: "Done. We'll tell you.", description: "Your clothes are ready. We notify you via WhatsApp the moment it's done." },
    ],
  },
  delivery: {
    eyebrow:     '04 — Pickup & Delivery',
    headline:    'Your clothes,\nwherever you are.',
    description: 'We pick up and deliver to your door. No lines, no waiting. Just send us a message and we handle the rest.',
    benefits: [
      'Flat-rate pickup and delivery, no surprises',
      'Coverage in Distrito Tec and surrounding areas',
      'Delivery at the time that works for you',
      'WhatsApp notification at every step',
    ],
    cta:             'Schedule a pickup →',
    whatsappMessage: "Hi LAVALAVA! I'd like to schedule a pickup.",
    learnMore:       'Learn about pickup & delivery →',
  },
  reviews: {
    eyebrow:  '05 — Reviews',
    headline: 'What our\nclients say.',
    feedback: 'How did it go? Tell us via WhatsApp',
    // {rating} is replaced with the star count at render time
    starsLabel:      '{rating} out of 5 stars',
    feedbackMessage: "Hi LAVALAVA! I'd like to tell you how it went.",
    items: [
      {
        name:   'María G.',
        text:   'Excellent service. My clothes came back spotless and they let me know via WhatsApp when ready. Very punctual.',
        rating: 5,
      },
      {
        name:   'Carlos M.',
        text:   "The best laundry service near Tec. Fast, careful, and very attentive. I don't use anyone else.",
        rating: 5,
      },
      {
        name:   'Ana R.',
        text:   'I brought a delicate dress and it came back perfect. The delivery service is very convenient.',
        rating: 5,
      },
    ],
  },
  instagram: {
    eyebrow:     '06 — @lavalava.vip',
    headline:    'Follow us on\nInstagram.',
    description: 'Share your experience and stay up to date.',
    cta:         'Follow on Instagram →',
  },
  location: {
    eyebrow:  '07 — Location',
    headline: 'Minutes from\nTec.',
    address:  'Av. Junco de la Vega 2224B, Col. Roma',
    city:     'Distrito Tec, 64700 Monterrey, N.L.',
    hours: [
      { days: 'Monday — Friday', time: '8:00 — 19:30' },
      { days: 'Saturday',        time: '9:00 — 15:30' },
      { days: 'Sunday',          time: 'Closed' },
    ],
    directions: 'Get directions →',
    nearby:     'A short walk from Tecnológico de Monterrey.',
    mapCta:     'View map',
    mapLabel:   'LAVALAVA location map',
    moreInfo:   'View location & hours →',
  },
  faq: {
    eyebrow:  '08 — Frequently asked questions',
    headline: 'Everything you\nneed to know.',
    items: [
      {
        q: 'How much does laundry service cost per kilo?',
        a: 'Our per-kilo laundry service is competitively priced in Distrito Tec. Message us on WhatsApp to get current pricing and available packages.',
      },
      {
        q: 'How long does service take?',
        a: 'Standard wash & fold by kilo is ready in 24 hours. Dry cleaning and delicate garments may take 48–72 hours depending on the required treatment.',
      },
      {
        q: 'Do you offer pickup & delivery near Tec de Monterrey?',
        a: 'Yes. We offer pickup and delivery in Distrito Tec, Colonia Roma, and surrounding areas. Just send us a WhatsApp to coordinate.',
      },
      {
        q: 'How will I know when my clothes are ready?',
        a: "We notify you via WhatsApp the moment your clothes are done. No need to call or guess — we'll reach out.",
      },
      {
        q: 'Do you clean delicate garments and evening gowns?',
        a: 'Yes. We offer specialized dry cleaning for delicate fabrics: silk, lace, formal wear, and evening gowns. Each garment receives individual treatment.',
      },
      {
        q: 'Can I bring comforters and duvets?',
        a: 'Absolutely. We wash comforters, duvets, pillows, and all bedding. We recommend calling ahead to confirm availability depending on volume.',
      },
      {
        q: 'Where exactly are you located?',
        a: "We're at Av. Junco de la Vega, Colonia Roma, in the heart of Distrito Tec, Monterrey. A short walk from Tecnológico de Monterrey.",
      },
    ],
  },
  finalCta: {
    headline:        'More time for you\nstarts with a message.',
    cta:             'Message us on WhatsApp',
    whatsappMessage: "Hi LAVALAVA! I'd like more information.",
  },
  footer: {
    tagline:   'Premium laundry & dry cleaning\nin Distrito Tec, Monterrey.',
    address:   'Av. Junco de la Vega 2224B, Col. Roma',
    city:      'Distrito Tec, 64700 Monterrey, N.L.',
    email:     'hola@lavalava.vip',
    copyright: '© {year} LAVALAVA. All rights reserved.',
  },
  // Per-page metadata. Repo-owned by the content ownership rule (machine-facing
  // SEO surfaces stay in the repo; user-visible copy moves to the CMS). Do not
  // migrate these into the CMS payload.
  pages: {
    servicios: {
      meta: {
        title:       'Laundry & Dry Cleaning Services in Distrito Tec | LAVALAVA',
        description: 'Laundry by the kilo, dry cleaning, wash & press, comforters and sneakers in Distrito Tec, Monterrey. Expert care for every garment, with pickup and delivery.',
      },
    },
    aDomicilio: {
      meta: {
        title:       'Laundry Pickup & Delivery in Distrito Tec, Monterrey | LAVALAVA',
        description: 'Laundry and dry cleaning picked up and delivered across Distrito Tec, Zona Tec and Colonia Roma. No lines, no waiting — schedule it on WhatsApp.',
      },
      // User-visible page copy. Moves to the CMS when `catalog.json` lands
      // (pages['a-domicilio']); until then this file is the source of truth and the
      // seed the POS session imports. The colonia list is NOT here — it is shared,
      // non-bilingual data in lib/coverage.ts.
      content: {
        hero: {
          eyebrow:         'Pickup & delivery',
          headline:        "Don't go out.\nWe'll come to you.",
          lede:            'Laundry and dry cleaning picked up and delivered across Distrito Tec. Message us on WhatsApp, we collect your clothes at a time you choose, and bring them back clean, folded and ready to wear.',
          ctaPrimary:      'Schedule a pickup',
          ctaSecondary:    'See covered neighbourhoods ↓',
          whatsappMessage: "Hi LAVALAVA! I'd like to schedule a pickup.",
        },
        steps: {
          eyebrow:  '01 — How it works',
          headline: 'Four steps.\nZero lines.',
          intro:    'The whole thing happens over WhatsApp. No app to download, no account to create, no cart to fill.',
          items: [
            {
              number:      '01',
              title:       'Message us',
              description: 'Send us a WhatsApp with your neighbourhood and a time that suits you. We confirm your pickup window in minutes, not days.',
            },
            {
              number:      '02',
              title:       'We collect',
              description: 'We arrive at your door in the agreed window. Nothing to weigh, sort or pack — we handle all of that back at the shop.',
            },
            {
              number:      '03',
              title:       'We take care of it',
              description: 'Every garment is checked before it is processed. Wash-and-fold goes through per-kilo laundry; delicates and formal wear go to dry cleaning for individual treatment.',
            },
            {
              number:      '04',
              title:       'We bring it back',
              description: 'We message you the moment it is ready and deliver to your door, folded and protected. You never stood in a single line.',
            },
          ],
        },
        coverage: {
          eyebrow:       '02 — Coverage',
          headline:      'We reach all 24\nneighbourhoods in\nDistrito Tec.',
          intro:         'These are the neighbourhoods where we pick up and deliver, all of them inside the official Distrito Tec boundary in Monterrey. If you live in one of them, you are covered.',
          featuredLabel: 'Where we deliver most',
          allLabel:      'Full coverage',
          notListed: {
            text:            "Don't see your neighbourhood? Message us anyway. We serve surrounding areas case by case and will confirm right away.",
            cta:             'Ask about my area →',
            whatsappMessage: 'Hi LAVALAVA! Do you offer pickup and delivery in my neighbourhood?',
          },
        },
        pricing: {
          eyebrow:   '03 — Pricing',
          headline:  'A flat fare\nper trip.',
          intro:     'Pickup and delivery are charged separately, each at a flat rate within our covered neighbourhoods. No distance surcharge and no minimum order.',
          wasLabel:  'was',
          promoNote: 'Promotional price, currently running.',
          roundTrip: {
            title: 'Want the round trip?',
            text:  "That's pickup plus delivery. Message us and we'll confirm the total before you book.",
          },
          disclaimer: 'These fares cover the trip itself. Washing, dry cleaning or pressing your clothes is quoted separately, by service and by weight.',
        },
        included: {
          eyebrow:  '04 — What you get',
          headline: "What's included.",
          items: [
            {
              title:       'A flat fare, with no distance surcharge',
              description: 'Whether you live in Altavista or at Campus Tec, the trip costs the same. We do not charge by the kilometre and there is no minimum order.',
            },
            {
              title:       'You pick the window',
              description: 'We arrange collection and delivery for the time that works for you, within our service hours.',
            },
            {
              title:       'WhatsApp updates at every step',
              description: 'We message you when we are on the way, when your clothes arrive, and when they are ready. You never have to chase us.',
            },
            {
              title:       'Every service, at your door',
              description: 'Per-kilo laundry, dry cleaning, wash and press, comforters, sneakers and repairs. Everything we do in the shop, we do at your door.',
            },
          ],
        },
        faq: {
          eyebrow:  '05 — Frequently asked questions',
          headline: 'Before you ask.',
          items: [
            {
              q: 'How much does pickup and delivery cost?',
              a: 'Pickup and delivery are charged separately, each at a flat rate within our covered neighbourhoods in Distrito Tec. You can book pickup only, delivery only, or both. Washing or dry cleaning your clothes is quoted separately, by service and by weight. Current fares are in the pricing section on this page.',
            },
            {
              q: 'What if I am not home when you arrive?',
              a: 'We message you on WhatsApp before we set out, so it rarely happens. If something comes up, we reschedule the pickup or delivery for later the same day or the next one, at no charge.',
            },
            {
              q: 'How far in advance do I need to book?',
              a: 'Usually same day. Message us on WhatsApp and we confirm the available pickup window in minutes. The earlier you write, the more time slots you have to choose from.',
            },
            {
              q: 'How long until I get my clothes back?',
              a: 'Per-kilo laundry is ready in 24 hours. Dry cleaning and delicate garments can take 48 to 72 hours depending on the treatment required. We confirm the exact turnaround at pickup.',
            },
            {
              q: 'How do I know where my clothes are?',
              a: 'On WhatsApp. We message you when we collect, when your order goes into processing, and when it is ready for delivery. It is the same chat from start to finish.',
            },
            {
              q: 'Do I need to weigh or sort anything first?',
              a: 'No. Hand it over as it is. We weigh, sort and separate at the shop, and we tell you the total before processing if you want to check first.',
            },
            {
              q: 'Do you collect from the Tec de Monterrey residences?',
              a: 'Yes. Campus Tec and the student residences are inside our coverage area and are among the places we collect from most often.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Keep exploring',
          services: {
            title:       'All our services',
            description: 'Per-kilo laundry, dry cleaning, comforters, sneakers and repairs — in detail.',
            cta:         'See services →',
          },
          location: {
            title:       'I would rather drop by',
            description: 'Av. Junco de la Vega 2224B, Col. Roma — a short walk from the Tec.',
            cta:         'See location and hours →',
          },
        },
      },
    },
    ubicacion: {
      meta: {
        title:       'Laundry & Dry Cleaning near Tec de Monterrey | LAVALAVA',
        description: 'Find us at Av. Junco de la Vega 2224B, Col. Roma, Distrito Tec — minutes from Tec de Monterrey. Hours, map and directions.',
      },
    },
  },
  meta: {
    title:       'LAVALAVA — Premium Laundry & Dry Cleaning in Distrito Tec, Monterrey',
    description: 'Premium laundry & dry cleaning in Distrito Tec, Monterrey. Pickup & delivery available. The care your clothes deserve.',
    // Used for the LocalBusiness JSON-LD description. Intentionally more
    // keyword-dense than `description` above — it's an AEO surface, not a SERP snippet.
    schemaDescription: 'Premium laundry and dry cleaning in Distrito Tec, Monterrey. Pickup and delivery available. Wash & fold by the kilo, dry cleaning, delicates, and comforters.',
  },
}
