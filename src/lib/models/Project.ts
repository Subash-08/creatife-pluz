import mongoose, { Schema, Document } from 'mongoose';

// Your existing schemas...
const GalleryImageSchema = new Schema({
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    alt: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 }
    // REMOVE any index: true from here
});

const ResultSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String }
    // REMOVE any index: true from here
});

const HighlightSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
    // REMOVE any index: true from here
});

const NextProjectSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    title: { type: String, required: true },
    slug: { type: String, required: true }
    // REMOVE any index: true from here
});

const ProjectSchema = new Schema({
    // Basic Info
    title: { type: String, required: true, trim: true },
    slug: {
        type: String,
        required: true,
        unique: true, // Keep unique constraint
        lowercase: true
        // REMOVE index: true if you have it here
    },
    excerpt: { type: String, required: true, maxlength: 200 },
    category: {
        type: String,
        required: true,
        enum: ['Branding', 'Social Media', 'Print', 'Photography', 'Package Design', 'Corporate Display']
    },
    subCategory: { type: String, trim: true },

    // Display Properties
    featured: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 0 },
    size: {
        type: String,
        enum: ['standard', 'large', 'vertical'],
        default: 'standard'
    },
    year: { type: Number, required: true },
    clientName: { type: String, trim: true },

    // Images
    coverImage: {
        url: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        alt: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },

    // Gallery
    gallery: [GalleryImageSchema],

    // Case Study Content
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: [ResultSchema],
    highlights: [HighlightSchema],

    // Meta Information
    duration: { type: String, required: true },
    teamSize: { type: Number, min: 1 },
    tools: [{ type: String, trim: true }],

    // SEO
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true, maxlength: 160 },
    keywords: [{ type: String, trim: true }],

    // Navigation
    nextProject: NextProjectSchema,

    // Status
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: { type: Date }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Define indexes ONCE at the schema level (not in field definitions)
// ProjectSchema.index({ slug: 1 }); // Removed to avoid duplicate with unique: true
ProjectSchema.index({ category: 1, featured: 1, featuredOrder: 1 });
ProjectSchema.index({ status: 1, publishedAt: -1 });
ProjectSchema.index({ year: -1 });

// Virtual for next project population
ProjectSchema.virtual('nextProjectDetails', {
    ref: 'Project',
    localField: 'nextProject.projectId',
    foreignField: '_id',
    justOne: true
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);