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
  // Verified against the live Google Places API on 2026-09-24: rating 5.0 across 63
  // ratings. `clients` is the 1,333 customers migrated from Drupal into the POS, stated
  // conservatively as 1,300+. Both are real figures — do not inflate them, and re-verify
  // the rating before launch rather than assuming it held.
  // Split into value + label so the figures can count up. The numbers stay exactly
  // what they were: 5.0 verified live, 1,300+ from the 1,333 migrated customers.
  trust: {
    ratingValue:   5,
    ratingSuffix:  ' ★ on Google',
    clientsValue:  1300,
    clientsSuffix: '+ clients',
    zone:          'Zona Tec',
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
        title:       'Press only',
        description: 'You washed it at home. We press it on an industrial press.',
      },
      {
        title:       'Repairs & Alterations',
        description: 'Zipper replacement, button repair, hemming, and minor garment fixes.',
      },
      {
        title:       'Comforters & blankets',
        description: 'Duvets, comforters and thick quilts, on industrial machines.',
      },
      {
        title:       'Sneakers',
        description: 'Deep cleaning and restoration of athletic footwear.',
      },
      {
        title:       'Pickup & delivery',
        description: 'We collect and deliver to your door, at a flat rate across 24 Distrito Tec neighbourhoods.',
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
      'Coverage across 24 Distrito Tec neighbourhoods',
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
        a: 'Our laundry service is charged by weight, with a 3 kg minimum per service. Current rates are on the services page, or message us on WhatsApp and we will confirm them.',
      },
      {
        q: 'How long does service take?',
        a: 'Standard wash & fold by kilo is ready in 24 hours. Dry cleaning and delicate garments may take 48–72 hours depending on the required treatment.',
      },
      {
        q: 'Do you offer pickup & delivery near Tec de Monterrey?',
        a: 'Yes. We collect and deliver across 24 Distrito Tec neighbourhoods, including Campus Tec and the student residences, Colonia Roma and Tecnológico. Pickup and delivery are charged separately, each at a flat rate. Send us a WhatsApp and we will book it, usually for the same day.',
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
        a: 'Yes. We wash duvets, comforters and thick quilts on industrial machines, priced by bed size. If yours is extra thick or down-filled, message us on WhatsApp first and we will confirm.',
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
        description: 'Laundry by the kilo, dry cleaning, pressing, comforters, sneakers and repairs in Distrito Tec, Monterrey. Expert care for every garment, with pickup and delivery.',
      },
      // User-visible page copy, authored here. Product NAMES and PRICES are not in this
      // file — those are fixed facts read from the published POS contract via
      // lib/prices.ts, because a price typed into a page goes stale the moment the till
      // changes. Everything else is the website's to write.
      content: {
        hero: {
          eyebrow:         'Services',
          headline:        'Every garment\nasks for something\ndifferent.',
          lede:            'Laundry by the kilo, dry cleaning, pressing, comforters, sneakers and repairs — all in one place, in the heart of Distrito Tec. We inspect every piece before a single machine is switched on, because a cotton tee and a wool blazer are not the same job.',
          ctaPrimary:      'Message us on WhatsApp',
          ctaSecondary:    'See services and prices ↓',
          whatsappMessage: "Hi LAVALAVA! I'd like to know more about your services.",
        },
        catalogue: {
          eyebrow:     '01 — The catalogue',
          headline:    'What we do.',
          intro:       'Seven services. The prices below are the ones on the counter — the same ones you pay if you message us on WhatsApp or book pickup and delivery.',
          wasLabel:    'was',
          promoLabel:  'Promotional price',
          turnaroundLabel: 'Turnaround',
          priceFromLabel:  'from',
          items: [
            {
              slug:       'lavanderia-por-kilo',
              name:       'Wash, dry and fold',
              tagline:    'The weekly one',
              body:       'Gather the week and hand it over. We weigh it, sort it by colour and fabric, wash it, dry it, and give it back folded and ready for the closet. No need to separate anything beforehand — that part is our job.',
              detail:     'Charged by the kilo, with a 3 kg minimum per service. No packages to decode and no tiered rates: what it weighs is what it costs.',
              turnaround: '24 hours',
            },
            {
              slug:       'tintoreria',
              name:       'Dry cleaning',
              tagline:    'For what you cannot wash at home',
              body:       'Dry cleaning for suits, dresses, coats, blazers and anything carrying a “dry clean only” label. Every garment is held to the light before it goes in: we find the stains, treat them one at a time, and hand-press the details a machine press cannot reach.',
              detail:     'This is where the gap between a laundry and a craft shows most. If a garment is expensive, delicate, or hard to replace, this is where it belongs.',
              turnaround: '48 — 72 hours',
            },
            {
              slug:       'planchado',
              name:       'Press only',
              tagline:    'You washed it. We press it.',
              body:       'For when you do the washing at home but the ironing piles up. We use an industrial press and professional steam, which gives a sharper finish that lasts longer than a home iron — especially on collars, cuffs and pleats.',
              detail:     'Charged per piece, at the same price for every garment, so it is easy to count.',
              turnaround: '24 hours',
            },
            {
              slug:       'colchas-cobertores',
              name:       'Comforters and blankets',
              tagline:    'What will not fit in your machine',
              body:       'Duvets, comforters, heavy blankets and quilts. We wash them in large-drum industrial machines, which is what lets the filling move, rinse properly and loft back up instead of clumping.',
              detail:     'Priced by bed size rather than weight. If yours is extra thick or down-filled, message us first and we will confirm.',
              turnaround: 'Confirmed when we receive it',
            },
            {
              slug:       'tennis',
              name:       'Sneaker cleaning',
              tagline:    'Like they just came out of the box',
              body:       'Deep cleaning for trainers. We treat the upper, the sole and the laces separately, lift stains and odour, and dry at a controlled temperature so nothing warps or unglues.',
              detail:     'If they are leather, suede or a special edition, send us a photo on WhatsApp before you bring them in.',
              turnaround: 'Confirmed when we receive them',
            },
            {
              slug:       'composturas',
              name:       'Minor repairs and alterations',
              tagline:    'Before you throw it out, ask us',
              body:       'Buttons that came off, hems that came undone, zips that stopped running and small mends. These are little repairs that add years to a garment, and they almost always cost less than replacing it.',
              detail:     'For resizing or larger alterations, bring it in and we will look at it with you before quoting.',
              turnaround: 'Confirmed when we receive it',
            },
            {
              slug:       'recoleccion-entrega',
              name:       'Pickup and delivery',
              tagline:    'All of the above, at your door',
              body:       'Any service on this page can come to you and go back. Pickup and delivery are charged separately, each at a flat rate within our 24 covered neighbourhoods in Distrito Tec.',
              detail:     'Booked on WhatsApp, usually for the same day.',
              turnaround: 'Depends on the service you book',
            },
          ],
        },
        care: {
          eyebrow:  '02 — How we work',
          headline: 'What happens\nbetween drop-off\nand pickup.',
          steps: [
            {
              title:       'It gets inspected before it gets washed',
              description: 'Every garment is checked: care label, fabric, stains, loose buttons, things left in pockets. Whatever we find, we tell you about.',
            },
            {
              title:       'It gets sorted, not piled',
              description: 'We separate by colour, by temperature and by fibre. It is the boring part of the trade and it is exactly where clothes get ruined when it is skipped.',
            },
            {
              title:       'Delicates go their own way',
              description: 'Silk, lace, wool, anything lined or embellished. Treated one at a time, on a separate process, and hand-pressed wherever a machine press should not touch.',
            },
            {
              title:       'If something cannot be done, you hear it first',
              description: 'Some stains have set and some fabrics will not survive a given process. We would rather tell you at drop-off than hand back a damaged garment. We never experiment with your clothes without asking.',
            },
          ],
        },
        unusual: {
          eyebrow:  '03 — What if it is unusual?',
          headline: 'Just ask.',
          body:     'A wedding dress, a costume, a leather jacket, a rug, something inherited, something you cannot even identify the fabric of. Not everything is on the price list, and that does not mean we cannot do it. Send us a photo on WhatsApp and we will tell you honestly whether it is for us, what it would cost and how long it would take — or whether you are better off with a specialist.',
          cta:              'Send a photo on WhatsApp →',
          whatsappMessage:  'Hi LAVALAVA! I have a special garment and would like to know if you can work on it. Sending a photo.',
        },
        faq: {
          eyebrow:  '04 — Frequently asked questions',
          headline: 'What people\nask us most.',
          items: [
            {
              q: 'How does pricing by the kilo work?',
              a: 'We weigh your laundry when we receive it and that weight sets the cost. One flat price per kilo, with a 3 kg minimum per service. No packages and no tiered rates, and we will tell you the total before processing if you want to confirm first.',
            },
            {
              q: 'How long does each service take?',
              a: 'Wash-and-fold by the kilo and press-only are ready in 24 hours. Dry cleaning takes 48 to 72 hours, because solvent cleaning and stain treatment cannot be rushed without risking the garment. For comforters, sneakers and repairs we confirm the exact turnaround when we receive the piece, because it depends on what it needs.',
            },
            {
              q: 'What if I am in a hurry?',
              a: 'Tell us at the start. Depending on the day’s load we can prioritise your order, and if we are not going to make it we will say so immediately rather than leave you waiting.',
            },
            {
              q: 'How do you handle delicate garments?',
              a: 'They are separated at the initial inspection and processed apart. Silk, lace, wool and anything lined or embellished gets individual treatment and hand-pressing wherever an industrial press should not touch. If a garment will not survive the process it would need, we tell you before trying.',
            },
            {
              q: 'Can you remove any stain?',
              a: 'No, and be sceptical of anyone who says otherwise. Grease, wine, ink and blood lift far better the fresher they are; an old stain already set by heat can be permanent. We treat each one individually and tell you honestly what we expect to achieve before charging you for it.',
            },
            {
              q: 'Is there a minimum order?',
              a: 'Laundry by the kilo has a 3 kg minimum per service. Everything else is priced per piece, so you can bring in a single garment. If you are unsure about your case, message us on WhatsApp before coming in.',
            },
            {
              q: 'Do these prices include pickup and delivery?',
              a: 'No. The prices on this page are for the service itself. Pickup and delivery are charged separately, each at a flat rate. You can see those fares on the pickup and delivery page.',
            },
            {
              q: 'Can I pay by card?',
              a: 'Yes, we take cards and cash at the shop. For pickup and delivery we arrange payment over WhatsApp when you book.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Keep exploring',
          delivery: {
            title:       'Pickup and delivery',
            description: 'We collect and deliver across 24 Distrito Tec neighbourhoods. Full fares and coverage.',
            cta:         'See coverage and fares →',
          },
          location: {
            title:       'Come see us',
            description: 'Av. Junco de la Vega 2224B, Col. Roma — a short walk from the Tec.',
            cta:         'See location and hours →',
          },
        },
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
          intro:     'Pickup and delivery are charged separately, each at a flat rate within our covered neighbourhoods. No distance surcharge: the fare is the same across all 24 neighbourhoods.',
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
              description: 'Whether you live in Altavista or at Campus Tec, the trip costs the same. We do not charge by the kilometre or by the floor.',
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
              description: 'Per-kilo laundry, dry cleaning, pressing, comforters and blankets, sneakers and repairs. Everything we do in the shop, we do at your door.',
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
        description: 'We are at Av. Junco de la Vega 2224B, Col. Roma, Distrito Tec — minutes from Tec de Monterrey. Hours, map and directions.',
      },
      // User-visible page copy, authored here. Address, coordinates and hours are NOT in
      // this file — they are fixed facts in lib/seo.ts (BUSINESS) and the shared
      // `location` namespace, so the page, the footer and the JSON-LD cannot disagree.
      content: {
        hero: {
          eyebrow:         'Location',
          headline:        'Minutes from\nthe Tec.',
          lede:            'We are on Av. Junco de la Vega, in Colonia Roma, inside Distrito Tec. If you study or live near campus you can walk here — and if you drive, we are a few minutes off Garza Sada.',
          ctaPrimary:      'Get directions',
          ctaSecondary:    'See opening hours ↓',
        },
        address: {
          eyebrow:     '01 — Where we are',
          headline:    'The address,\nin plain text.',
          note:        'We are a street-level shop on Av. Junco de la Vega. If your phone drops you at the corner, look for number 2224B.',
          directions:  'Open in Google Maps →',
          whatsappCta: "Can't find us? Message us →",
          whatsappMessage: 'Hi LAVALAVA! I am nearby but cannot find you — can you help?',
        },
        hours: {
          eyebrow:  '02 — Opening hours',
          headline: 'When we\nare open.',
          note:     'Closed on Sundays. If you need something outside these hours, send us a WhatsApp and we will see what we can do — we read messages even when the shop is shut.',
          closedLabel: 'Closed',
        },
        visit: {
          eyebrow:  '03 — Your visit',
          headline: 'Before you\ncome in.',
          items: [
            {
              title:       'Walking from campus',
              description: 'We are inside Distrito Tec, a few minutes on foot from the campus and the student residences. It is a short, flat walk — you will not need transport.',
            },
            {
              title:       'No appointment needed',
              description: 'Just come by during opening hours and drop your clothes off. If you want to save time, message us on WhatsApp first and we will tell you how busy the day looks.',
            },
            {
              title:       'Bring it as it is',
              description: 'No need to sort, weigh or pack anything specially. We check and sort it with you at the counter.',
            },
            {
              title:       'Or stay home — we will come',
              description: 'If you would rather not go out, we collect and deliver across 24 Distrito Tec neighbourhoods. Booked on WhatsApp, usually for the same day.',
            },
          ],
        },
        faq: {
          eyebrow:  '04 — Frequently asked questions',
          headline: 'Getting here,\nand when.',
          items: [
            {
              q: 'Where exactly are you?',
              a: 'At Av. Junco de la Vega 2224B, Colonia Roma, Distrito Tec, 64700 Monterrey, Nuevo León. We are on Junco de la Vega itself; the number is 2224B. You can open the exact location in Google Maps from the button on this page.',
            },
            {
              q: 'How close are you to Tec de Monterrey?',
              a: 'We are inside Distrito Tec, a few minutes on foot from the campus and the student residences. For most students it is a short walk with no transport needed.',
            },
            {
              q: 'What are your opening hours?',
              a: 'Monday to Friday from 8:00 to 19:30, and Saturday from 9:00 to 15:30. We are closed on Sundays. You can message us on WhatsApp at any time and we will reply as soon as we open.',
            },
            {
              q: 'Are you open on Sundays?',
              a: 'No. Sunday is our closing day. If you need your clothes for Monday, drop them off on Saturday before 15:30 and we will sort it out.',
            },
            {
              q: 'Do I need an appointment?',
              a: 'No. Come by any time during opening hours. If you want to know how busy the day is before heading over, message us on WhatsApp and we will tell you.',
            },
            {
              q: 'What if I cannot make it to the shop?',
              a: 'We collect and deliver across 24 Distrito Tec neighbourhoods. Pickup and delivery are charged at a flat rate and booked on WhatsApp, usually for the same day.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Keep exploring',
          services: {
            title:       'What you can bring',
            description: 'Laundry by the kilo, dry cleaning, pressing, comforters, sneakers and repairs — with prices.',
            cta:         'See services and prices →',
          },
          delivery: {
            title:       'Better if we come to you',
            description: 'Pickup and delivery across 24 Distrito Tec neighbourhoods, at a flat rate.',
            cta:         'See coverage and fares →',
          },
        },
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
