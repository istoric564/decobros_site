# Asset requirements

The owner supplies all photographs. Do not use stock, AI or random images.
Put each file in `src/assets/photos/` and name it with the ID (for example `H01.jpg`).
Gallery files go in `src/assets/photos/gallery/`. Portraits and course or expedition images use the `image` / `portrait` name from the data files.
Send alt text with each photo. Status values: MISSING, RECEIVED, APPROVED, IMPLEMENTED.
Format: high-quality JPEG, PNG or AVIF source. The build creates AVIF and WebP.

# Home

| ID  | Section       | Orientation   | Min size    | Composition                                                                         | Status  |
| --- | ------------- | ------------- | ----------- | ----------------------------------------------------------------------------------- | ------- |
| H01 | Hero          | Landscape 3:2 | 2400 × 1600 | Dark underwater scene. Diver on the right. Free space on the left for the headline. | RECEIVED |
| H02 | Philosophy    | Landscape 2:1 | 2400 × 1200 | Wide scene: surface with boat, divers below (as in mockup). Text sits on the left.  | RECEIVED |
| H03 | SDI block     | Landscape 6:5 | 1800 × 1500 | Diver or cave scene. Subject on the right.                                          | RECEIVED |
| H04 | TDI block     | Landscape 6:5 | 1800 × 1500 | Technical diver. Subject on the right.                                              | RECEIVED |
| H05 | Meet the Crew | Wide 5:2      | 2400 × 960  | Real team photo (for example divers at the shore).                                  | RECEIVED |

# Training

| ID  | Section       | Orientation   | Min size    | Composition                                   | Status  |
| --- | ------------- | ------------- | ----------- | --------------------------------------------- | ------- |
| T01 | Hero          | Landscape 3:2 | 2400 × 1600 | Dark underwater scene. Space on the left.     | RECEIVED |
| —   | Course images | Landscape 4:3 | 1600 × 1200 | One per real course (if the design needs it). | MISSING |

# Expeditions

| ID  | Section          | Orientation   | Min size    | Composition                               | Status  |
| --- | ---------------- | ------------- | ----------- | ----------------------------------------- | ------- |
| E01 | Hero             | Landscape 3:2 | 2400 × 1600 | Real expedition scene. Space on the left. | RECEIVED |
| —   | Expedition cards | Landscape 4:3 | 1600 × 1200 | One per real expedition.                  | MISSING |

# Crew

| ID  | Section   | Orientation   | Min size    | Composition                    | Status  |
| --- | --------- | ------------- | ----------- | ------------------------------ | ------- |
| C01 | Hero      | Landscape 3:2 | 2400 × 1600 | Team photo. Space on the left. | RECEIVED |
| —   | Portraits | Portrait 4:5  | 1200 × 1500 | One per person.                | MISSING |

# Gallery

| ID  | Section     | Orientation   | Min size             | Composition                                                                 | Status  |
| --- | ----------- | ------------- | -------------------- | --------------------------------------------------------------------------- | ------- |
| G01 | Hero        | Landscape 3:2 | 2400 × 1600          | Underwater scene. Space on the left.                                        | RECEIVED |
| —   | Gallery set | Mixed         | 2000 px on long side | Minimum 12 photos. Categories: Training, Expeditions, Underwater, The Crew. | MISSING |

# Names used by the demo content
Put files in `src/assets/photos/`. Expedition images: 4:3, 1600 × 1200 px or more. Crew portraits: 4:5, 1200 × 1500 px or more.

| ID | Use | Status |
|----|-----|--------|
| EXP-red-sea | Red Sea Wreck Expedition | MISSING |
| EXP-mexico-cenotes | Mexico Cenotes | MISSING |
| EXP-maldives | Maldives Liveaboard | MISSING |
| EXP-philippines | Philippines Expedition | MISSING |
| CREW-alexey-volkov | Portrait | MISSING |
| CREW-maria-sokolova | Portrait | MISSING |
| CREW-dmitry-orlov | Portrait | MISSING |
| CREW-anna-lebedeva | Portrait | MISSING |
| OG01 | Open Graph image 1200 × 630 | MISSING (H01 crop used) |
