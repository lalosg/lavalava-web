export const es = {
  nav: {
    services:  'Servicios',
    delivery:  'A domicilio',
    location:  'Ubicación',
    whatsapp:  'Escríbenos',
    home:      'Inicio',
  },
  hero: {
    eyebrow:          '01 — Lavandería · Tintorería · Distrito Tec',
    headline:         'Más tiempo\npara ti.',
    subheadStrong:    'Lavandería y tintorería premium',
    subheadTertiary:  'Servicio premium en Distrito Tec, Monterrey. Lavandería por kilo y tintorería profesional. Cuidado experto para tu ropa diaria y prendas delicadas, con servicio de recolección y entrega a domicilio.',
    ctaPrimary:       'Escríbenos',
    ctaSecondary:     'Cómo llegar →',
    whatsappMessage:  '¡Hola LAVALAVA! Me gustaría más información.',
  },
  welcome: {
    text: 'Bienvenido a LAVALAVA — recibe un beneficio especial en tu primera visita.',
  },
  pillars: {
    eyebrow: '01 — Por qué LAVALAVA',
    items: [
      {
        title:       'Cuidado visible',
        description: 'Tratamos cada prenda como si fuera nuestra. Revisamos, clasificamos y procesamos con atención al detalle.',
      },
      {
        title:       'Sin complicaciones',
        description: 'Escríbenos, recogemos, entregamos. O visítanos — estamos a minutos del Tec.',
      },
      {
        title:       'Puntualidad confiable',
        description: 'Tu ropa lista cuando prometemos. Te avisamos por WhatsApp en el momento exacto.',
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
    ratingSuffix:  ' ★ en Google',
    clientsValue:  1300,
    clientsSuffix: '+ clientes',
    zone:          'Zona Tec',
  },
  services: {
    eyebrow:  '02 — Servicios',
    headline: 'El cuidado que\ntu ropa merece.',
    items: [
      {
        title:       'Lavandería por kilo',
        description: 'Lavado y secado profesional. Listo en 24 horas.',
        badge:       'Más popular',
      },
      {
        title:       'Tintorería',
        description: 'Limpieza en seco para prendas delicadas y formales.',
      },
      {
        title:       'Planchado por pieza',
        description: 'Ya la lavaste en casa. Nosotros la planchamos con prensa industrial.',
      },
      {
        title:       'Arreglos y Composturas',
        description: 'Cambio de cierres, pegado de botones, bastillas y pequeños remiendos.',
      },
      {
        title:       'Colchas y cobertores',
        description: 'Edredones, cobertores y colchas gruesas, en maquinaria industrial.',
      },
      {
        title:       'Tenis',
        description: 'Limpieza profunda y restauración de calzado deportivo.',
      },
      {
        title:       'Servicio a domicilio',
        description: 'Recogemos y entregamos en tu puerta, con tarifa fija en 24 colonias del Distrito Tec.',
        badge:       'Premium',
      },
    ],
    cta: 'Ver todos los servicios →',
  },
  howItWorks: {
    eyebrow:  '03 — Cómo funciona',
    headline: 'Tan fácil como\nun mensaje.',
    steps: [
      { number: '01', title: 'Escríbenos',      description: 'Mándanos un WhatsApp. Te respondemos de inmediato.' },
      { number: '02', title: 'Recogemos',        description: 'Pasamos por tu ropa a la hora que más te convenga.' },
      { number: '03', title: 'Cuidamos',          description: 'Procesamos cada prenda con atención y cuidado.' },
      { number: '04', title: 'Lista. Te avisamos.', description: 'Tu ropa lista. Te avisamos por WhatsApp en el momento exacto.' },
    ],
  },
  delivery: {
    eyebrow:     '04 — Servicio a domicilio',
    headline:    'Tu ropa, donde\nestés.',
    description: 'Recogemos y entregamos en tu puerta. Sin filas, sin esperas. Solo mándanos un mensaje y nosotros nos encargamos del resto.',
    benefits: [
      'Recolección y entrega con tarifa fija, sin sorpresas',
      'Cobertura en 24 colonias del Distrito Tec',
      'Entrega en el horario que elijas',
      'Notificación por WhatsApp en cada paso',
    ],
    cta:              'Agendar recolección →',
    whatsappMessage:  '¡Hola LAVALAVA! Me gustaría agendar una recolección a domicilio.',
    learnMore:        'Conoce el servicio a domicilio →',
  },
  reviews: {
    eyebrow:  '05 — Reseñas',
    headline: 'Lo que dicen\nnuestros clientes.',
    feedback: '¿Cómo te fue? Cuéntanos por WhatsApp',
    // {rating} is replaced with the star count at render time
    starsLabel:      '{rating} de 5 estrellas',
    feedbackMessage: '¡Hola LAVALAVA! Quiero contarte cómo me fue.',
    items: [
      {
        name:   'María G.',
        text:   'Excelente servicio. Mi ropa quedó impecable y me avisaron por WhatsApp cuando estuvo lista. Muy puntuales.',
        rating: 5,
      },
      {
        name:   'Carlos M.',
        text:   'El mejor servicio de lavandería cerca del Tec. Rápidos, cuidadosos y muy atentos. Ya no uso otro.',
        rating: 5,
      },
      {
        name:   'Ana R.',
        text:   'Llevé un vestido delicado y lo regresaron perfecto. El servicio a domicilio es muy conveniente.',
        rating: 5,
      },
    ],
  },
  instagram: {
    eyebrow:     '06 — @lavalava.vip',
    headline:    'Síguenos en\nInstagram.',
    description: 'Comparte tu experiencia y sigue nuestras novedades.',
    cta:         'Seguir en Instagram →',
  },
  location: {
    eyebrow:    '07 — Ubicación',
    headline:   'A minutos\ndel Tec.',
    address:    'Av. Junco de la Vega 2224B, Col. Roma',
    city:       'Distrito Tec, 64700 Monterrey, N.L.',
    hours: [
      { days: 'Lunes — Viernes', time: '8:00 — 19:30' },
      { days: 'Sábado',         time: '9:00 — 15:30' },
      { days: 'Domingo',        time: 'Cerrado' },
    ],
    directions: 'Cómo llegar →',
    nearby:     'A minutos caminando del Tecnológico de Monterrey.',
    mapCta:     'Ver mapa',
    mapLabel:   'Mapa de ubicación LAVALAVA',
    moreInfo:   'Ver ubicación y horarios →',
  },
  faq: {
    eyebrow:  '08 — Preguntas frecuentes',
    headline: 'Todo lo que\nnecesitas saber.',
    items: [
      {
        q: '¿Cuánto cuesta el servicio de lavandería por kilo?',
        a: 'Nuestro servicio de lavandería por kilo se cobra por peso, con un mínimo de 3 kilos por servicio. Consulta la tarifa vigente en la página de servicios, o escríbenos por WhatsApp y te la confirmamos.',
      },
      {
        q: '¿Cuánto tiempo tarda el servicio?',
        a: 'El servicio estándar de lavandería por kilo está listo en 24 horas. La tintorería y prendas delicadas pueden tomar 48–72 horas dependiendo del tratamiento requerido.',
      },
      {
        q: '¿Tienen servicio a domicilio cerca del Tec de Monterrey?',
        a: 'Sí. Recogemos y entregamos en 24 colonias del Distrito Tec, incluidas Campus Tec y las residencias, Colonia Roma y Tecnológico. La recolección y la entrega se cobran por separado, cada una con tarifa fija. Mándanos un WhatsApp y lo agendamos, normalmente para el mismo día.',
      },
      {
        q: '¿Cómo sé cuándo está lista mi ropa?',
        a: 'Te avisamos por WhatsApp en el momento exacto en que tu ropa está lista. No tienes que llamar ni adivinar — nosotros te buscamos.',
      },
      {
        q: '¿Lavan ropa delicada y vestidos de noche?',
        a: 'Sí. Contamos con servicio especializado de tintorería para prendas delicadas: seda, encaje, vestidos de fiesta y ropa formal. Cada prenda recibe tratamiento individual.',
      },
      {
        q: '¿Puedo llevar cobertores y edredones?',
        a: 'Sí. Lavamos edredones, cobertores y colchas gruesas en maquinaria industrial, con precio según el tamaño de cama. Si el tuyo es extra grueso o de plumas, escríbenos antes por WhatsApp y te confirmamos.',
      },
      {
        q: '¿Dónde están ubicados exactamente?',
        a: 'Estamos en Av. Junco de la Vega, Colonia Roma, en el corazón de Distrito Tec, Monterrey. A pocos minutos caminando del Tecnológico de Monterrey.',
      },
    ],
  },
  finalCta: {
    headline:         'Más tiempo para ti\nempieza con un mensaje.',
    cta:              'Escríbenos por WhatsApp',
    whatsappMessage:  '¡Hola LAVALAVA! Me gustaría más información.',
  },
  footer: {
    tagline:   'Lavandería y tintorería premium\nen Distrito Tec, Monterrey.',
    address:   'Av. Junco de la Vega 2224B, Col. Roma',
    city:      'Distrito Tec, 64700 Monterrey, N.L.',
    email:     'hola@lavalava.vip',
    copyright: '© {year} LAVALAVA. Todos los derechos reservados.',
  },
  // Per-page metadata. Repo-owned by the content ownership rule (machine-facing
  // SEO surfaces stay in the repo; user-visible copy moves to the CMS). Do not
  // migrate these into the CMS payload.
  pages: {
    servicios: {
      meta: {
        title:       'Servicios de Lavandería y Tintorería en Distrito Tec | LAVALAVA',
        description: 'Lavandería por kilo, tintorería, planchado por pieza, colchas y cobertores, tenis y composturas en Distrito Tec, Monterrey. Precios y tiempos de entrega.',
      },
      // User-visible page copy, authored here. Product NAMES and PRICES are not in this
      // file — those are fixed facts read from the published POS contract via
      // lib/prices.ts, because a price typed into a page goes stale the moment the till
      // changes. Everything else is the website's to write.
      content: {
        hero: {
          eyebrow:         'Servicios',
          headline:        'Cada prenda\npide algo distinto.',
          lede:            'Lavandería por kilo, tintorería, planchado, cobertores, tenis y composturas — todo en un mismo lugar, en el corazón de Distrito Tec. Revisamos prenda por prenda antes de tocar una sola máquina, porque una playera de algodón y un saco de lana no se tratan igual.',
          ctaPrimary:      'Escríbenos por WhatsApp',
          ctaSecondary:    'Ver servicios y precios ↓',
          whatsappMessage: '¡Hola LAVALAVA! Me gustaría más información sobre sus servicios.',
        },
        catalogue: {
          eyebrow:     '01 — El catálogo',
          headline:    'Lo que hacemos.',
          intro:       'Siete servicios. Los precios de abajo son los vigentes en el mostrador — los mismos que pagas si nos escribes por WhatsApp o si pides servicio a domicilio.',
          wasLabel:    'antes',
          promoLabel:  'Precio promocional',
          turnaroundLabel: 'Tiempo de entrega',
          priceFromLabel:  'desde',
          items: [
            {
              slug:       'lavanderia-por-kilo',
              name:       'Lavado, secado y doblado',
              tagline:    'El de todas las semanas',
              body:       'Junta tu ropa de la semana y déjanosla. La pesamos, la separamos por color y por tipo de tela, la lavamos, la secamos y te la devolvemos doblada y lista para guardar en el clóset. No tienes que separar nada antes de traerla: de eso nos encargamos nosotros.',
              detail:     'Se cobra por kilo, con un mínimo de 3 kilos por servicio. No hay paquetes que descifrar ni tarifas escalonadas: lo que pesa, es lo que cuesta.',
              turnaround: '24 horas',
            },
            {
              slug:       'tintoreria',
              name:       'Tintorería',
              tagline:    'Para lo que no se lava en casa',
              body:       'Lavado en seco para trajes, vestidos, abrigos, sacos y todo lo que lleva una etiqueta que dice “dry clean only”. Cada prenda se revisa a contraluz antes de entrar: identificamos manchas, las tratamos una por una y planchamos a mano los detalles que una prensa no alcanza.',
              detail:     'Es el servicio donde más se nota la diferencia entre una lavandería y un oficio. Si tienes una prenda cara, delicada o con valor sentimental, este es su lugar.',
              turnaround: '48 — 72 horas',
            },
            {
              slug:       'planchado',
              name:       'Planchado por pieza',
              tagline:    'Ya la lavaste. Nosotros la planchamos.',
              body:       'Para cuando lavas en casa pero el planchado se te acumula. Usamos prensa industrial y vapor profesional, que deja un acabado más nítido y más duradero que una plancha doméstica — sobre todo en cuellos, puños y pliegues.',
              detail:     'Se cobra por pieza y el precio es el mismo para todas, así que contar es fácil.',
              turnaround: '24 horas',
            },
            {
              slug:       'colchas-cobertores',
              name:       'Colchas y cobertores',
              tagline:    'Lo que no cabe en tu lavadora',
              body:       'Edredones, cobertores, cobijas gruesas y colchas. Los lavamos en maquinaria industrial con tambor grande, que es lo que permite que el relleno se mueva, se enjuague de verdad y vuelva a esponjarse en lugar de apelmazarse.',
              detail:     'El precio va por tamaño de cama, no por peso. Si tu cobertor es extra grueso o de plumas, escríbenos antes y te confirmamos.',
              turnaround: 'Te lo confirmamos al recibirlo',
            },
            {
              slug:       'tennis',
              name:       'Lavado de tenis',
              tagline:    'Como recién sacados de la caja',
              body:       'Limpieza profunda de calzado deportivo. Tratamos la tela, la suela y las agujetas por separado, quitamos manchas y olor, y secamos a temperatura controlada para que no se deformen ni se despeguen.',
              detail:     'Si son de piel, gamuza o edición especial, mándanos una foto por WhatsApp antes de traerlos.',
              turnaround: 'Te lo confirmamos al recibirlos',
            },
            {
              slug:       'composturas',
              name:       'Pequeñas composturas y ajustes',
              tagline:    'Antes de tirarla, pregúntanos',
              body:       'Botones que se cayeron, bastillas descosidas, cierres que ya no corren y remiendos menores. Son arreglos pequeños que alargan la vida de una prenda años, y casi siempre cuestan menos que reemplazarla.',
              detail:     'Para ajustes de talla o arreglos mayores, tráela y la revisamos contigo antes de cotizar.',
              turnaround: 'Te lo confirmamos al recibirla',
            },
            {
              slug:       'recoleccion-entrega',
              name:       'Servicio a domicilio',
              tagline:    'Todo lo anterior, en tu puerta',
              body:       'Cualquiera de los servicios de esta página puede llegar y regresar a tu domicilio. La recolección y la entrega se cobran por separado, con tarifa fija dentro de nuestras 24 colonias de cobertura en Distrito Tec.',
              detail:     'Se agenda por WhatsApp, normalmente para el mismo día.',
              turnaround: 'Según el servicio que pidas',
            },
          ],
        },
        care: {
          eyebrow:  '02 — Cómo trabajamos',
          headline: 'Lo que pasa\nentre que nos la\ndejas y te la\ndevolvemos.',
          steps: [
            {
              title:       'Se revisa antes de lavarse',
              description: 'Cada prenda pasa por una revisión: etiqueta de cuidado, tipo de tela, manchas, botones flojos, bolsillos con cosas dentro. Lo que encontramos, te lo decimos.',
            },
            {
              title:       'Se clasifica, no se amontona',
              description: 'Separamos por color, por temperatura y por tipo de fibra. Es la parte aburrida del oficio y es exactamente donde se arruina la ropa cuando no se hace.',
            },
            {
              title:       'Lo delicado va aparte',
              description: 'Seda, encaje, lana, prendas con aplicaciones o forro. Se tratan una por una, en proceso separado, y se planchan a mano donde la prensa no debe tocar.',
            },
            {
              title:       'Si algo no se puede, te lo decimos antes',
              description: 'Hay manchas que ya sentaron y telas que no aguantan cierto proceso. Preferimos decírtelo al recibir la prenda que devolvértela dañada. Nunca experimentamos con tu ropa sin avisarte.',
            },
          ],
        },
        unusual: {
          eyebrow:  '03 — ¿Y si es algo raro?',
          headline: 'Pregúntanos.',
          body:     'Un vestido de novia, un disfraz, una chamarra de piel, un tapete, una prenda heredada, algo que no sabes ni de qué tela es. No todo está en la lista de precios, y eso no significa que no podamos. Mándanos una foto por WhatsApp y te decimos con honestidad si es para nosotros, cuánto costaría y cuánto tardaría — o si te conviene más llevarlo a un especialista.',
          cta:              'Mandar una foto por WhatsApp →',
          whatsappMessage:  '¡Hola LAVALAVA! Tengo una prenda especial y quiero saber si la pueden trabajar. Les mando foto.',
        },
        faq: {
          eyebrow:  '04 — Preguntas frecuentes',
          headline: 'Lo que más\nnos preguntan.',
          items: [
            {
              q: '¿Cómo funciona el cobro por kilo?',
              a: 'Pesamos tu ropa al recibirla y ese peso define el costo. Es un precio por kilo, parejo, con un mínimo de 3 kilos por servicio. No hay paquetes ni tarifas escalonadas, y te decimos el total antes de procesar si quieres confirmarlo primero.',
            },
            {
              q: '¿Cuánto tarda cada servicio?',
              a: 'El lavado por kilo y el planchado están listos en 24 horas. La tintorería toma de 48 a 72 horas, porque el lavado en seco y el tratamiento de manchas no se pueden apurar sin arriesgar la prenda. Para cobertores, tenis y composturas te confirmamos el tiempo exacto al recibir la pieza, porque depende de lo que traiga.',
            },
            {
              q: '¿Qué pasa si tengo prisa?',
              a: 'Dinos desde el principio. Según la carga del día podemos priorizar tu pedido, y si no vamos a alcanzar te lo decimos de inmediato en lugar de dejarte esperando.',
            },
            {
              q: '¿Cómo tratan la ropa delicada?',
              a: 'Se separa desde la revisión inicial y se procesa aparte. Seda, encaje, lana y prendas con forro o aplicaciones llevan tratamiento individual y planchado a mano donde la prensa industrial no debe tocar. Si una prenda no aguanta el proceso que requeriría, te lo decimos antes de intentarlo.',
            },
            {
              q: '¿Quitan cualquier mancha?',
              a: 'No, y desconfía de quien te diga que sí. Las manchas de grasa, vino, tinta y sangre salen mucho mejor mientras más frescas estén; una mancha vieja que ya se fijó con calor puede ser permanente. Tratamos cada una individualmente y te decimos con honestidad qué esperamos lograr antes de cobrarte por ello.',
            },
            {
              q: '¿Tienen mínimo de pedido?',
              a: 'La lavandería por kilo tiene un mínimo de 3 kilos por servicio. Los demás servicios se cobran por pieza, así que puedes traer desde una sola prenda. Si tienes dudas sobre tu caso, escríbenos por WhatsApp antes de venir.',
            },
            {
              q: '¿Los precios incluyen el servicio a domicilio?',
              a: 'No. Los precios de esta página son los del servicio en sí. La recolección y la entrega a domicilio se cobran aparte, cada una con tarifa fija. Puedes ver esas tarifas en la página de servicio a domicilio.',
            },
            {
              q: '¿Puedo pagar con tarjeta?',
              a: 'Sí, aceptamos tarjeta y efectivo en el local. Para servicio a domicilio coordinamos el pago por WhatsApp al agendar.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Sigue explorando',
          delivery: {
            title:       'Servicio a domicilio',
            description: 'Recogemos y entregamos en 24 colonias del Distrito Tec. Tarifas y cobertura completa.',
            cta:         'Ver cobertura y tarifas →',
          },
          location: {
            title:       'Visítanos',
            description: 'Av. Junco de la Vega 2224B, Col. Roma — a minutos caminando del Tec.',
            cta:         'Ver ubicación y horarios →',
          },
        },
      },
    },
    aDomicilio: {
      meta: {
        title:       'Lavandería a Domicilio en Distrito Tec, Monterrey | LAVALAVA',
        description: 'Recolección y entrega de lavandería y tintorería a domicilio en Distrito Tec, Zona Tec y Colonia Roma. Sin filas, sin esperas — agenda por WhatsApp.',
      },
      // User-visible page copy. Moves to the CMS when `catalog.json` lands
      // (pages['a-domicilio']); until then this file is the source of truth and the
      // seed the POS session imports. The colonia list is NOT here — it is shared,
      // non-bilingual data in lib/coverage.ts.
      content: {
        hero: {
          eyebrow:         'Servicio a domicilio',
          headline:        'No salgas.\nNosotros vamos.',
          lede:            'Recolección y entrega de lavandería y tintorería a domicilio en Distrito Tec. Escríbenos por WhatsApp, pasamos por tu ropa a la hora que elijas y te la devolvemos limpia, doblada y lista para usar.',
          ctaPrimary:      'Agendar recolección',
          ctaSecondary:    'Ver colonias con cobertura ↓',
          whatsappMessage: '¡Hola LAVALAVA! Me gustaría agendar una recolección a domicilio.',
        },
        steps: {
          eyebrow:  '01 — Cómo funciona',
          headline: 'Cuatro pasos.\nCero filas.',
          intro:    'Todo el proceso ocurre por WhatsApp. No hay app que descargar, ni cuenta que crear, ni carrito que llenar.',
          items: [
            {
              number:      '01',
              title:       'Escríbenos',
              description: 'Mándanos un mensaje por WhatsApp con tu colonia y la hora que te acomoda. Te confirmamos la ventana de recolección en minutos, no en días.',
            },
            {
              number:      '02',
              title:       'Pasamos por tu ropa',
              description: 'Llegamos a tu puerta en la ventana acordada. No necesitas pesar, separar ni empacar nada especial — nosotros clasificamos en el taller.',
            },
            {
              number:      '03',
              title:       'La cuidamos',
              description: 'Revisamos prenda por prenda antes de procesar. Lo que va a lavandería por kilo se lava y se seca; lo delicado y lo formal pasa a tintorería con tratamiento individual.',
            },
            {
              number:      '04',
              title:       'Te la devolvemos',
              description: 'Te avisamos por WhatsApp en cuanto está lista y la entregamos en tu puerta, doblada y protegida. Tú no hiciste una sola fila.',
            },
          ],
        },
        coverage: {
          eyebrow:       '02 — Cobertura',
          headline:      'Llegamos a las\n24 colonias del\nDistrito Tec.',
          intro:         'Estas son las colonias donde recogemos y entregamos a domicilio, todas dentro del polígono oficial del Distrito Tec, en Monterrey. Si vives en alguna de ellas, estás dentro de cobertura.',
          featuredLabel: 'Donde más entregamos',
          allLabel:      'Cobertura completa',
          notListed: {
            text:            '¿No ves tu colonia? Escríbenos de todas formas. Atendemos zonas aledañas caso por caso y te confirmamos al momento.',
            cta:             'Preguntar por mi zona →',
            whatsappMessage: '¡Hola LAVALAVA! ¿Tienen cobertura a domicilio en mi colonia?',
          },
        },
        pricing: {
          eyebrow:   '03 — Precios',
          headline:  'Tarifa fija\npor viaje.',
          intro:     'La recolección y la entrega se cobran por separado, cada una con tarifa fija dentro de nuestras colonias de cobertura. Sin cargo por distancia: la tarifa es la misma en las 24 colonias.',
          wasLabel:  'antes',
          promoNote: 'Precio promocional vigente.',
          roundTrip: {
            title: '¿Quieres viaje redondo?',
            text:  'Es recolección más entrega. Escríbenos y te confirmamos el total antes de agendar.',
          },
          disclaimer: 'Estas tarifas cubren el traslado. El lavado, la tintorería o el planchado de tus prendas se cotizan aparte según el servicio y el peso.',
        },
        included: {
          eyebrow:  '04 — Qué incluye',
          headline: 'Lo que viene\nincluido.',
          items: [
            {
              title:       'Tarifa fija, sin cargo por distancia',
              description: 'Vivas en Altavista o en Campus Tec, el traslado cuesta lo mismo. No cobramos por kilómetro ni por piso.',
            },
            {
              title:       'Tú eliges la ventana',
              description: 'Coordinamos la recolección y la entrega en el horario que te funcione, dentro de nuestro horario de servicio.',
            },
            {
              title:       'Aviso por WhatsApp en cada paso',
              description: 'Te escribimos cuando vamos en camino, cuando recibimos tu ropa y cuando está lista. No tienes que preguntar.',
            },
            {
              title:       'Todos nuestros servicios, a domicilio',
              description: 'Lavandería por kilo, tintorería, planchado, colchas y cobertores, tenis y composturas. Lo que hacemos en el local, lo hacemos en tu puerta.',
            },
          ],
        },
        faq: {
          eyebrow:  '05 — Preguntas frecuentes',
          headline: 'Antes de que\npreguntes.',
          items: [
            {
              q: '¿Cuánto cuesta el servicio a domicilio?',
              a: 'La recolección y la entrega se cobran por separado, cada una con tarifa fija dentro de nuestras colonias de cobertura en Distrito Tec. Puedes pedir solo recolección, solo entrega, o las dos. El lavado o la tintorería de tus prendas se cotiza aparte, según el servicio y el peso. Consulta las tarifas vigentes en la sección de precios de esta página.',
            },
            {
              q: '¿Qué pasa si no estoy en casa cuando llegan?',
              a: 'Te avisamos por WhatsApp antes de salir, así que casi nunca ocurre. Si algo se atraviesa, reagendamos la recolección o la entrega para más tarde ese mismo día o para el siguiente, sin cargo.',
            },
            {
              q: '¿Con cuánta anticipación tengo que agendar?',
              a: 'Normalmente el mismo día. Escríbenos por WhatsApp y te confirmamos la ventana de recolección disponible en minutos. Entre más temprano escribas, más opciones de horario tienes.',
            },
            {
              q: '¿Cuánto tarda en regresar mi ropa?',
              a: 'La lavandería por kilo está lista en 24 horas. La tintorería y las prendas delicadas pueden tomar de 48 a 72 horas según el tratamiento que requieran. Te confirmamos el tiempo exacto al recoger.',
            },
            {
              q: '¿Cómo sé dónde está mi ropa?',
              a: 'Por WhatsApp. Te escribimos cuando recogemos, cuando tu pedido entra a proceso y cuando está listo para entrega. Es el mismo chat de principio a fin.',
            },
            {
              q: '¿Tengo que pesar o separar la ropa antes?',
              a: 'No. Entrégala como está. Nosotros pesamos, clasificamos y separamos en el taller, y te decimos el total antes de procesar si tienes dudas.',
            },
            {
              q: '¿Recogen en las residencias del Tec de Monterrey?',
              a: 'Sí. Campus Tec y las residencias estudiantiles están dentro de nuestra zona de cobertura y son de los puntos donde más recolecciones hacemos.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Sigue explorando',
          services: {
            title:       'Todos los servicios',
            description: 'Lavandería por kilo, tintorería, cobertores, tenis y composturas — en detalle.',
            cta:         'Ver servicios →',
          },
          location: {
            title:       'Prefiero pasar al local',
            description: 'Av. Junco de la Vega 2224B, Col. Roma — a minutos caminando del Tec.',
            cta:         'Ver ubicación y horarios →',
          },
        },
      },
    },
    ubicacion: {
      meta: {
        title:       'Lavandería y Tintorería cerca del Tec de Monterrey | LAVALAVA',
        description: 'Estamos en Av. Junco de la Vega 2224B, Col. Roma, Distrito Tec — a minutos del Tec de Monterrey. Consulta horarios, mapa y cómo llegar.',
      },
      // User-visible page copy, authored here. Address, coordinates and hours are NOT in
      // this file — they are fixed facts in lib/seo.ts (BUSINESS) and the shared
      // `location` namespace, so the page, the footer and the JSON-LD cannot disagree.
      content: {
        hero: {
          eyebrow:         'Ubicación',
          headline:        'A unos minutos\ndel Tec.',
          lede:            'Estamos sobre Av. Junco de la Vega, en la Colonia Roma, dentro del Distrito Tec. Si estudias o vives cerca del campus, llegas caminando — y si vienes en coche, estás a unos minutos por Garza Sada.',
          ctaPrimary:      'Cómo llegar',
          ctaSecondary:    'Ver horarios ↓',
        },
        address: {
          eyebrow:     '01 — Dónde estamos',
          headline:    'La dirección,\nen texto.',
          note:        'Somos un local sobre Av. Junco de la Vega. Si el mapa de tu teléfono te deja en la esquina, busca el número 2224B.',
          directions:  'Abrir en Google Maps →',
          whatsappCta: '¿No nos encuentras? Escríbenos →',
          whatsappMessage: '¡Hola LAVALAVA! Estoy cerca pero no los encuentro, ¿me ayudan?',
        },
        hours: {
          eyebrow:  '02 — Horarios',
          headline: 'Cuándo\nabrimos.',
          note:     'Domingo cerrado. Si necesitas algo fuera de horario, mándanos un WhatsApp y lo vemos — leemos los mensajes aunque el local esté cerrado.',
          closedLabel: 'Cerrado',
        },
        visit: {
          eyebrow:  '03 — Tu visita',
          headline: 'Antes de\nvenir.',
          items: [
            {
              title:       'Caminando desde el campus',
              description: 'Estamos dentro del Distrito Tec, a unos minutos a pie desde las residencias y el campus. Es una caminata corta y plana — no necesitas transporte.',
            },
            {
              title:       'No necesitas cita',
              description: 'Puedes llegar directo en horario de servicio y dejar tu ropa. Si quieres adelantar tiempo, escríbenos antes por WhatsApp y te decimos cómo está la carga del día.',
            },
            {
              title:       'Trae tu ropa como esté',
              description: 'No hace falta separarla, pesarla ni empacarla de forma especial. Nosotros revisamos y clasificamos en el mostrador contigo.',
            },
            {
              title:       'O no vengas — vamos nosotros',
              description: 'Si prefieres no salir, recogemos y entregamos en 24 colonias del Distrito Tec. Se agenda por WhatsApp, normalmente para el mismo día.',
            },
          ],
        },
        faq: {
          eyebrow:  '04 — Preguntas frecuentes',
          headline: 'Cómo llegar\ny cuándo.',
          items: [
            {
              q: '¿Dónde están exactamente?',
              a: 'En Av. Junco de la Vega 2224B, Colonia Roma, Distrito Tec, 64700 Monterrey, Nuevo León. Es sobre Junco de la Vega; el número es 2224B. Puedes abrir la ubicación exacta en Google Maps desde el botón de esta página.',
            },
            {
              q: '¿Qué tan cerca están del Tec de Monterrey?',
              a: 'Estamos dentro del Distrito Tec, a unos minutos caminando del campus y de las residencias estudiantiles. Para la mayoría de los estudiantes es una caminata corta, sin necesidad de transporte.',
            },
            {
              q: '¿Cuál es su horario?',
              a: 'Lunes a viernes de 8:00 a 19:30, y sábado de 9:00 a 15:30. Los domingos permanecemos cerrados. Puedes escribirnos por WhatsApp en cualquier momento; respondemos en cuanto abrimos.',
            },
            {
              q: '¿Abren los domingos?',
              a: 'No. Domingo es nuestro día de cierre. Si necesitas tu ropa para el lunes, déjala el sábado antes de las 15:30 y lo coordinamos.',
            },
            {
              q: '¿Necesito hacer cita?',
              a: 'No. Puedes llegar directo dentro del horario de servicio. Si quieres saber cómo está la carga del día antes de venir, escríbenos por WhatsApp y te decimos.',
            },
            {
              q: '¿Y si no puedo ir al local?',
              a: 'Recogemos y entregamos a domicilio en 24 colonias del Distrito Tec. La recolección y la entrega tienen tarifa fija y se agendan por WhatsApp, normalmente para el mismo día.',
            },
          ],
        },
        crossLinks: {
          eyebrow:  'Sigue explorando',
          services: {
            title:       'Qué puedes traer',
            description: 'Lavandería por kilo, tintorería, planchado, cobertores, tenis y composturas — con precios.',
            cta:         'Ver servicios y precios →',
          },
          delivery: {
            title:       'Mejor que vayamos nosotros',
            description: 'Recolección y entrega en 24 colonias del Distrito Tec, con tarifa fija.',
            cta:         'Ver cobertura y tarifas →',
          },
        },
      },
    },
  },
  meta: {
    title:       'LAVALAVA — Lavandería y Tintorería Premium en Distrito Tec, Monterrey',
    description: 'Lavandería y tintorería premium en Distrito Tec, Monterrey. Servicio a domicilio. El cuidado que tu ropa merece.',
    // Used for the LocalBusiness JSON-LD description. Intentionally more
    // keyword-dense than `description` above — it's an AEO surface, not a SERP snippet.
    schemaDescription: 'Lavandería y tintorería premium en Distrito Tec, Monterrey. Servicio a domicilio disponible. Lavado por kilo, tintorería, delicados y cobertores.',
  },
}

export type Translations = typeof es
