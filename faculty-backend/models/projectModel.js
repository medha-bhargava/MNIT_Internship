import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  role: { type: String, required: true },
  projectLevel: { type: String, required: true },
  projectType: { type: String, required: true },
  projectTitle: { type: String, required: true },
  fundingAgency: { type: String, required: true },
  yearFrom: { type: Number, required: true },
  yearTo: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Completed', 'Ongoing'], required: true },
  erpId: { type: String, required: true },
  coInvestigators: { type: [String], default: [] },
});


const Project = model('Project', projectSchema);

export default Project;
