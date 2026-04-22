function imgs(folder: string, files: string[]): string[] {
  return files.map(f => `/img/${folder}/${encodeURIComponent(f)}`);
}

export const productGallery: Record<string, string[]> = {
  'marmara-white': imgs('bloklar/marmara-white', [
    'awsd123.jpeg',
    'asdasdasd.jpeg',
    'asdasdasdasd.jpeg',
    'WhatsApp Image 2026-2412404-22 at 12.07.39 PM.jpeg',
    'WhatsApp Image 2026123123-04-22 at 12.07.39 PM.jpeg',
    'WhatsApp Image 2026213123-04-22 at 12.07.39 PM.jpeg',
  ]),

  'carrara-white': [
    ...imgs('bloklar/blanco-ibiza-quarry', [
      'WhatsApp Video 2026-04-22 at 12.31.16 PM.mp4',
    ]),
    ...imgs('plakalar/blanco-white-cut-size', [
      'z1.jpeg', 'z2.jpeg', 'z3.jpeg', 'z23.jpeg',
      '1233123.jpeg', 'aasxdasd.jpeg', 'ase21.jpeg', 'axsdasdx.jpeg',
      'WhatsApp Image 2026-04-22 at 12.29.23 PM.jpeg',
    ]),
  ],

  'pearl-travertine': imgs('plakalar/pearl-travertine', [
    '2.jpeg',
    '5.jpeg',
    'WhatsApp Image 2026-04-22 at 11.04.06 AM.jpeg',
    '3bd261dd-9677-4803-86c0-55b57011b3ad.JPG',
    'c1ccf77f-bbd2-4bea-91a4-0e16bfc022be.JPG',
    '6879c365-28c8-4b1f-b333-f42bacfdfc4a.MP4',
  ]),

  'denizli-travertine': [
    ...imgs('bloklar/denizli-travertine', [
      '123123.jpeg',
      'WhatsApp Image 2026-04-22 at 12.09.10 PM.jpeg',
      'WhatsApp Image 2026-04-22 at 12.10.52 PM.jpeg',
      'WhatsApp Image 2026-04-22 at 12.10.55 PM.jpeg',
    ]),
    ...imgs('plakalar/denizli-travertine', [
      '3.jpeg', '4.jpeg',
      '10a9d007-c2bd-4d6d-a078-a3512d0948e1.JPG',
      '2cc13b77-dfc8-47a0-ae69-b01c7f5235a2.JPG',
      'a5729452-c251-41d2-9909-ae4207bb421b.JPG',
      'bf56ac90-4f28-4ffd-a735-38b6077161c4.JPG',
      'f0365ecd-76ab-44b4-8f0b-1a9e1e3e6b26.JPG',
      'f6fe5053-51f4-4479-b2d4-cab187e7d0b7.JPG',
    ]),
  ],

  'vanilla-ice': imgs('bloklar/vanilla-ice', [
    '123.jpeg',
    'WhatsApp Image 2026-04-22 at 12.00.15 PM.jpeg',
    '214.00.15 PM.jpeg',
    'W2142140.15 PM.jpeg',
    'W215412.00.15 PM.jpeg',
    'Wh32523522 at 12.00.15 PM.jpeg',
    'WhatsApp I32532w5325-22 at 12.00.15 PM.jpeg',
  ]),

  'lioz-turca': imgs('bloklar/lioz-turca', [
    'asd.jpeg',
    'asdasd.jpeg',
    'WhatsApp Image 2026-04-22 at 12.21.21 PM.jpeg',
  ]),
};
