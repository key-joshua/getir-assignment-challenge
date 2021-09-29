import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const recordSchema = new Schema({
  key: { type: String },
  value: { type: String },
  counts: [Number],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Records', recordSchema);
