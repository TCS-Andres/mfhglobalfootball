// Builds src/data/world-dots.json, the dotted world map behind the Global Affiliates page.
//
// Run once (or after changing the grid): node scripts/build-world-dots.mjs
//
// Every dot sits on a fixed grid in a Natural Earth projection and is tagged with the ISO
// numeric code of the country it falls in, so the page can light up any country's dots.
// The page re-creates the same projection from the saved scale and translate to place the
// affiliate pins, so pins and dots always line up.

import { readFileSync, writeFileSync } from 'node:fs';
import { geoNaturalEarth1, geoContains, geoBounds, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const WIDTH = 1000;
const STEP = 5; // grid spacing in map units; odd rows shift by half a step

const topo = JSON.parse(readFileSync(new URL('../node_modules/world-atlas/countries-110m.json', import.meta.url)));
const countries = feature(topo, topo.objects.countries).features.filter((f) => f.id !== '010'); // no Antarctica

const fc = { type: 'FeatureCollection', features: countries };
const projection = geoNaturalEarth1().fitWidth(WIDTH, fc);
const [[, y0], [, y1]] = geoPath(projection).bounds(fc);
const height = Math.ceil(y1 - y0 + STEP);
// Shift the map so it starts at the top edge.
const [tx, ty] = projection.translate();
projection.translate([tx, ty - y0 + STEP / 2]);

// Bounding boxes speed up the point-in-country test. Boxes that cross the antimeridian
// (min > max) are skipped by the prefilter and always tested.
const boxes = countries.map((f) => geoBounds(f));
const inBox = ([lng, lat], [[w, s], [e, n]]) => lat >= s && lat <= n && (w > e || (lng >= w && lng <= e));

const dots = [];
for (let row = 0, y = STEP / 2; y < height; row++, y += STEP) {
  for (let x = row % 2 ? STEP : STEP / 2; x < WIDTH; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!ll || Number.isNaN(ll[0])) continue;
    const i = countries.findIndex((f, k) => inBox(ll, boxes[k]) && geoContains(f, ll));
    if (i >= 0) dots.push([x, y, countries[i].id]);
  }
}

const out = {
  width: WIDTH,
  height,
  step: STEP,
  scale: projection.scale(),
  translate: projection.translate(),
  dots,
};
writeFileSync(new URL('../src/data/world-dots.json', import.meta.url), JSON.stringify(out));
console.log(`world-dots.json: ${dots.length} dots, ${WIDTH}x${height}`);
