import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    // srNo: { type: Number },
    category: { type: String, required: true },
    eventTitle: { type: String, required: true },
    eventType: { type: String, required: true },
    institute: { type: String },
    city: { type: String },
    country: { type: String },
    participationType: { type: String },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    designation: { type: String, required: false },
    sponsoredBy: { type: String },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
