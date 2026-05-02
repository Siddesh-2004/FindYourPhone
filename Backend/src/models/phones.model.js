import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true},
    price:          { type: Number, default: null },
    rating:         { type: Number, default: null },
    specs_score:    { type: Number, default: null },
    img:            { type: String, default: null },
    sim:            { type: String, default: null },
    processor:      { type: String, default: null },
    company:        { type: String, default: null },
    "4G":           { type: Boolean, default: false },
    "5G":           { type: Boolean, default: false },
    NFC:            { type: Boolean, default: false },
    VoLTE:          { type: Boolean, default: false },
    core:           { type: String, default: null },
    frequency:      { type: Number, default: null },
    ram_inbuilt:    { type: String, default: null },
    ram:            { type: Number, default: null },
    fast_charging:  { type: Number, default: null },
    battery:        { type: Number, default: null },
    display_size:   { type: Number, default: null },
    display_pixels: { type: String, default: null },
    display_hz:     { type: Number, default: null },
    punch_hole:     { type: Boolean, default: false },
    front_camera:   { type: String, default: null },
    rear_camera:    { type: String, default: null },
    extended_upto:  { type: Number, default: null },
    memory_card:    { type: String, default: null },
    os_version:     { type: String, default: null },
    os_brand:       { type: String, default: null },
  },
  {
    collection: "phones",   // explicit collection name
    versionKey: false,      // no __v field
  }
);

// Indexes
phoneSchema.index({ name: 1 });
phoneSchema.index({ price: 1 });
phoneSchema.index({ "5G": 1 });
phoneSchema.index({ NFC: 1 });
phoneSchema.index({ os_brand: 1 });

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;