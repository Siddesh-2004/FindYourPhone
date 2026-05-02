import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { MongoClient } from "mongodb";

const MONGO_URI ="mongodb+srv://siddeshpoojary2004_db_user:dCNn1uwW7OIsAYh8@cluster0.b5tkfvz.mongodb.net";
const DB_NAME   = "recommender";
const COLLECTION = "phones";
const CSV_PATH  = process.argv[2]; // node seedPhones.js ./phones.csv

if (!CSV_PATH) {
  console.error("Usage: node seedPhones.js <path-to-csv>");
  process.exit(1);
}

function parseNum(val) {
  if (val === undefined || val === null || val === "") return null;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
}

function parseBool(val) {
  if (val === undefined || val === null || val === "") return false;
  return String(val).trim().toLowerCase() === "true";
}

function transform(row) {
  return {
    name:           row["name"]?.trim()             || null,
    price:          parseNum(row["price"]),
    rating:         parseNum(row["rating"]),
    specs_score:    parseNum(row["specs_score"]),
    img:            row["img"]?.trim()              || null,
    sim:            row["sim"]?.trim()              || null,
    processor:      row["processor"]?.trim()        || null,
    company:        row["company"]?.trim()          || null,
    "4G":           parseBool(row["4G"]),
    "5G":           parseBool(row["5G"]),
    NFC:            parseBool(row["NFC"]),
    VoLTE:          parseBool(row["VoLTE"]),
    core:           row["core"]?.trim()             || null,
    frequency:      parseNum(row["frequency"]),
    ram_inbuilt:    row["ram (inbuilt)"]?.trim()    || null,
    ram:            parseNum(row["ram"]),
    fast_charging:  parseNum(row["fast charging"]),
    battery:        parseNum(row["battery (in mAh)"]),
    display_size:   parseNum(row["display size"]),
    display_pixels: row["display pixels"]?.trim()   || null,
    display_hz:     parseNum(row["display frequency (in Hz)"]),
    punch_hole:     parseBool(row["Punch Hole"]),
    front_camera:   row["front_camera"]?.trim()     || null,
    rear_camera:    row["rear_camera"]?.trim()      || null,
    extended_upto:  parseNum(row["extended_upto"]),
    memory_card:    row["memory_card"]?.trim()      || null,
    os_version:     row["os_version"]?.trim()       || null,
    os_brand:       row["os_brand"]?.trim()         || null,
  };
}

async function seed() {
  const raw = fs.readFileSync(path.resolve(CSV_PATH));
  const rows = parse(raw, { columns: true, skip_empty_lines: true, trim: true });

  const docs = rows.map(transform).filter(d => d.name); // skip rows with no name

  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const col = client.db(DB_NAME).collection(COLLECTION);

  // Drop existing data and re-seed
  await col.deleteMany({});
  await col.insertMany(docs);

  // Indexes — name for enrichment lookup, price + 5G + NFC for filtering
  await col.createIndex({ name: 1 });
  await col.createIndex({ price: 1 });
  await col.createIndex({ "5G": 1 });
  await col.createIndex({ NFC: 1 });
  await col.createIndex({ os_brand: 1 });

  console.log(`✓ Seeded ${docs.length} phones into ${DB_NAME}.${COLLECTION}`);
  await client.close();
}

seed().catch(err => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});