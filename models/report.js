// models/Report.js
import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Add virtual ID field for frontend compatibility
ReportSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON
ReportSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);