export interface ProviderCard {
  id: string;
  title: string;
  image: string;
  isHot: boolean;
  isNew: boolean;
}

function providerImage(file: string) {
  return `/game%20proveider/${encodeURIComponent(file)}`;
}

function provider(id: string, title: string, file: string, isNew = false): ProviderCard {
  return {
    id: `provider-${id}`,
    title,
    image: providerImage(file),
    isHot: !isNew,
    isNew,
  };
}

export const PROVIDER_CARDS_BY_CATEGORY: Record<string, ProviderCard[]> = {
  Slot: [
    provider('jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('pragmatic', 'Pragmatic Play', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (2).jpeg'),
    provider('pp-pop', 'PP POP', 'WhatsApp Image 2026-08-25 at 1.03.30 AM (1).jpeg'),
    provider('pg-soft', 'PG Soft', 'WhatsApp Image 2026-08-25 at 1.03.28 AM (3).jpeg'),
    provider('playtech', 'PlayTech', 'WhatsApp Image 2026-08-25 at 1.03.30 AM.jpeg', true),
    provider('netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.22 AM.jpeg'),
    provider('booongo', 'Booongo', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (2).jpeg'),
    provider('jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.31 AM (1).jpeg'),
    provider('spade', 'Spade Gaming', 'WhatsApp Image 2026-08-25 at 1.03.23 AM.jpeg'),
    provider('red-tiger', 'Red Tiger', 'WhatsApp Image 2026-08-25 at 1.03.19 AM.jpeg'),
    provider('playngo', "Play N' Go", 'WhatsApp Image 2026-08-25 at 1.03.18 AM (1).jpeg'),
    provider('fachai', 'Fachai', 'WhatsApp Image 2026-08-25 at 1.03.30 AM (2).jpeg'),
    provider('microgaming', 'Microgaming', 'WhatsApp Image 2026-08-25 at 1.03.20 AM.jpeg'),
  ],
  Cricket: [
    provider('betswiz', 'BetSwiz', 'betswiz.webp'),
    provider('9wicket', '9Wicket', 'wicketspro.webp'),
  ],
  Casino: [
    provider('casino-pragmatic', 'Pragmatic Play', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (2).jpeg'),
    provider('evolution', 'Evolution Gaming', 'WhatsApp Image 2026-08-25 at 1.03.23 AM (1).jpeg'),
    provider('ezugi', 'Ezugi', 'WhatsApp Image 2026-08-25 at 1.03.32 AM (2).jpeg'),
    provider('casino-playtech', 'PlayTech', 'WhatsApp Image 2026-08-25 at 1.03.25 AM.jpeg', true),
    provider('casino-netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.24 AM.jpeg'),
    provider('sexy', 'Sexy Casino', 'WhatsApp Image 2026-08-25 at 1.03.33 AM.jpeg'),
  ],
  Crash: [
    provider('crash-pragmatic', 'Pragmatic Play', 'WhatsApp Image 2026-08-25 at 1.03.19 AM (1).jpeg'),
    provider('aviator', 'Aviator Studio', 'WhatsApp Image 2026-08-25 at 1.03.27 AM (3).jpeg'),
    provider('crash-evolution', 'Evolution Gaming', 'WhatsApp Image 2026-08-25 at 1.03.23 AM (1).jpeg'),
    provider('spribe', 'SPRIBE', 'WhatsApp Image 2026-08-25 at 1.03.21 AM (1).jpeg'),
    provider('crash-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (1).jpeg'),
    provider('aviatrix', 'AVIATRIX', 'WhatsApp Image 2026-08-25 at 1.03.31 AM.jpeg'),
    provider('crash-jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.31 AM (1).jpeg'),
    provider('smartsoft', 'SMART', 'WhatsApp Image 2026-08-25 at 1.03.21 AM.jpeg'),
    provider('crash-microgaming', 'Microgaming', 'WhatsApp Image 2026-08-25 at 1.03.29 AM.jpeg'),
  ],
  'Table Games': [
    provider('table-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('table-pp', 'Pragmatic Play', 'WhatsApp Image 2026-08-25 at 1.03.32 AM.jpeg'),
    provider('table-spribe', 'Spribe', 'WhatsApp Image 2026-08-25 at 1.03.33 AM (1).jpeg'),
    provider('table-playtech', 'PlayTech', 'WhatsApp Image 2026-08-25 at 1.03.32 AM (1).jpeg', true),
    provider('table-netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.33 AM (2).jpeg'),
    provider('table-king-midas', 'AE King Midas', 'WhatsApp Image 2026-08-25 at 1.03.19 AM (2).jpeg'),
    provider('table-jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.22 AM (2).jpeg'),
    provider('table-red-tiger', 'Red Tiger', 'WhatsApp Image 2026-08-25 at 1.03.28 AM (1).jpeg'),
    provider('table-playngo', "Play N' Go", 'WhatsApp Image 2026-08-25 at 1.03.18 AM (1).jpeg'),
    provider('table-fachai', 'Fachai', 'WhatsApp Image 2026-08-25 at 1.03.30 AM (2).jpeg'),
  ],
  Sports: [
    provider('sports-betswiz', 'BetSwiz', 'betswiz.webp'),
    provider('sports-9wicket', '9Wicket', 'wicketspro.webp'),
  ],
  Fishing: [
    provider('fishing-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('fishing-spade', 'Spade Gaming', 'WhatsApp Image 2026-08-25 at 1.03.23 AM.jpeg'),
  ],
};
