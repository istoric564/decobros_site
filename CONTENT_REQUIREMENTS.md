# Content status

## Demo content in the project (replace before launch)
Set `DEMO_CONTENT = false` in `src/data/site.ts` when all demo content is replaced. This removes the DEMO CONTENT badges.

- Courses: `src/data/training.ts` (demo SDI/TDI courses).
- Expeditions: `src/data/expeditions.ts` (demo trips and dates).
- Crew: `src/data/crew.ts` (demo people, all values are test values).
- Contacts: `src/data/site.ts` (`hello@example.com`, `https://t.me/example`). WhatsApp is empty and shows [CONTENT REQUIRED].
- Operator and privacy data: `src/data/site.ts` (`legalEntity`, `privacyInfrastructure`).
- Domain: `https://decobroscrew.example` in `astro.config.mjs` (or `SITE_URL`) and `public/robots.txt`.
- Open Graph image: a crop of H01 is used. Provide `OG01` (1200 × 630) in `src/assets/photos/` to replace it.

## Still required from the owner
- Real contacts: Telegram, WhatsApp, email.
- Production domain and hosting provider.
- Hosting log fields and log retention (do not state a period until checked).
- Real legal data: operator, address, registration data, privacy contact. Pages: `/legal`, `/privacy`. Legal review required.
- Confirmation of the club status with SDI and TDI. The site only says "SDI · TDI Training" and does not claim an official partner status.
- Real course, expedition and crew content, and approval of the font (Inter is temporary).
- Photos for expeditions (`EXP-red-sea`, `EXP-mexico-cenotes`, `EXP-maldives`, `EXP-philippines`) and crew portraits (`CREW-alexey-volkov`, `CREW-maria-sokolova`, `CREW-dmitry-orlov`, `CREW-anna-lebedeva`). See ASSET_REQUIREMENTS.md.
