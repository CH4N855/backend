import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

const HomeSchema = new mongoose.Schema({
  name: String, tagline: String, description: String,
  statusBadge: String, yearsExp: String, projectsDone: String,
  happyClients: String, availableForWork: Boolean,
  avatar: String, badges: [String],
});
export const Home = mongoose.models.Home || mongoose.model('Home', HomeSchema);

const AboutSchema = new mongoose.Schema({
  bio1: String, bio2: String, name: String, role: String,
  location: String, availability: String,
  skills: [String], avatar: String,
});
export const About = mongoose.models.About || mongoose.model('About', AboutSchema);

const ExperienceSchema = new mongoose.Schema({
  date: String, company: String, role: String,
  desc: String, tags: [String], order: { type: Number, default: 0 },
}, { timestamps: true });
export const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

const ProjectSchema = new mongoose.Schema({
  num: String, icon: String, name: String, desc: String,
  stack: [String], href: String, image: String, order: { type: Number, default: 0 },
}, { timestamps: true });
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const StudySchema = new mongoose.Schema({
  year: String, degree: String, school: String,
  detail: String, order: { type: Number, default: 0 },
}, { timestamps: true });
export const Study = mongoose.models.Study || mongoose.model('Study', StudySchema);

const CertSchema = new mongoose.Schema({
  icon: String, name: String, issuer: String, order: { type: Number, default: 0 },
}, { timestamps: true });
export const Cert = mongoose.models.Cert || mongoose.model('Cert', CertSchema);
