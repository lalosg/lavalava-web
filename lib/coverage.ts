/**
 * Pickup & delivery coverage — the 24 colonias inside the official Distrito Tec polygon.
 *
 * Verified against two official sources:
 *   1. Programa Parcial de Desarrollo Urbano del DistritoTec
 *      (Gaceta Municipal de Monterrey, enero 2021)
 *   2. distritotec's own published district map
 *
 * These names rendered as real text are the single strongest AEO asset on the site —
 * each one is a phrase somebody actually types. Never move this list into an image,
 * and never replace it with a map alone: a map is a complement, not a substitute.
 *
 * NOT bilingual, on purpose. Colonia names are proper nouns and carry one spelling in
 * both locales, which is also how the CMS models them — `catalog.json`'s
 * `business.coverage[]` has a single `name` column (WEBSITE-CMS-PLAN.md §10). Keeping
 * one shared array here mirrors that contract and makes ES/EN drift impossible.
 *
 * `featured` lifts a name into the lead row of the grid. Campus Tec / Residencias is
 * featured because the student residences are the densest concentration of the target
 * customer anywhere in the district; Roma because the store itself is in it.
 */
export interface CoverageArea {
  name: string
  featured?: boolean
}

export const COVERAGE_AREAS: CoverageArea[] = [
  { name: 'Campus Tec / Residencias', featured: true },
  { name: 'Roma', featured: true },
  { name: 'Tecnológico', featured: true },
  { name: 'Altavista' },
  { name: 'Ancón del Huajuco' },
  { name: 'Buenos Aires' },
  { name: 'Cerro de la Silla' },
  { name: 'Fraccionamiento Estadio' },
  { name: 'Fraccionamiento Florida' },
  { name: 'Jardines de Altavista' },
  { name: 'Ladrillera' },
  { name: 'LTH' },
  { name: 'México' },
  { name: 'Narvarte' },
  { name: 'Nueva España' },
  { name: 'Nuevo Sur' },
  { name: 'Plaza Revolución' },
  { name: 'Primavera 1er Sector' },
  { name: 'Primavera 3er Sector' },
  { name: 'Residencial Florida' },
  { name: 'Rincón de Altavista' },
  { name: 'Valle Primavera' },
  { name: 'Villa Estadio' },
  { name: 'Villa Florida' },
]

/** Featured first, then the rest — the render order used by the coverage grid. */
export const COVERAGE_COUNT = COVERAGE_AREAS.length
