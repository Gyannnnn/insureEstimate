import fs from 'node:fs';
import path from 'node:path';

const professionsData = [
  // Creative & Marketing Services (0.8 - 1.1)
  { slug: "freelance-photographer", name: "Freelance Photographer", category: "Creative Services", riskFactor: 1.0, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability", "Equipment Floater", "Professional Liability"] },
  { slug: "videographer", name: "Videographer", category: "Creative Services", riskFactor: 1.05, typicalEmployeeRange: "0-2", recommendedCoverage: ["General Liability", "Commercial Property/Gear", "Errors & Omissions"] },
  { slug: "photographers-assistant", name: "Photographer's Assistant", category: "Creative Services", riskFactor: 0.85, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability"] },
  { slug: "graphic-designer", name: "Graphic Designer", category: "Creative Services", riskFactor: 0.8, typicalEmployeeRange: "0-1", recommendedCoverage: ["Professional Liability (E&O)", "General Liability"] },
  { slug: "web-designer", name: "Web Designer", category: "Creative Services", riskFactor: 0.85, typicalEmployeeRange: "0-2", recommendedCoverage: ["Professional Liability (E&O)", "Cyber Liability", "General Liability"] },
  { slug: "copywriter", name: "Copywriter", category: "Creative Services", riskFactor: 0.8, typicalEmployeeRange: "0-1", recommendedCoverage: ["Professional Liability (E&O)", "General Liability"] },
  { slug: "social-media-manager", name: "Social Media Manager", category: "Creative Services", riskFactor: 0.9, typicalEmployeeRange: "0-2", recommendedCoverage: ["Professional Liability (E&O)", "Cyber Liability"] },
  { slug: "marketing-consultant", name: "Marketing Consultant", category: "Professional Services", riskFactor: 0.95, typicalEmployeeRange: "0-3", recommendedCoverage: ["Professional Liability (E&O)", "General Liability"] },

  // Professional & Management Consulting (0.85 - 1.25)
  { slug: "business-consultant", name: "Business Consultant", category: "Professional Services", riskFactor: 1.0, typicalEmployeeRange: "0-3", recommendedCoverage: ["Errors & Omissions", "General Liability", "Cyber Liability"] },
  { slug: "management-consultant", name: "Management Consultant", category: "Professional Services", riskFactor: 1.05, typicalEmployeeRange: "0-5", recommendedCoverage: ["Errors & Omissions", "General Liability"] },
  { slug: "financial-consultant", name: "Financial Consultant", category: "Professional Services", riskFactor: 1.25, typicalEmployeeRange: "0-5", recommendedCoverage: ["Errors & Omissions (Fiduciary)", "General Liability", "Cyber Risk"] },
  { slug: "hr-consultant", name: "HR Consultant", category: "Professional Services", riskFactor: 0.95, typicalEmployeeRange: "0-2", recommendedCoverage: ["Errors & Omissions", "Employment Practices Liability (EPLI)"] },
  { slug: "it-consultant", name: "IT Consultant", category: "Professional Services", riskFactor: 1.15, typicalEmployeeRange: "0-5", recommendedCoverage: ["Errors & Omissions", "Cyber Liability / Tech E&O"] },
  { slug: "bookkeeper", name: "Bookkeeper", category: "Professional Services", riskFactor: 0.9, typicalEmployeeRange: "0-2", recommendedCoverage: ["Professional Liability (E&O)", "Fidelity / Crime Insurance"] },
  { slug: "virtual-assistant", name: "Virtual Assistant", category: "Professional Services", riskFactor: 0.8, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability", "Cyber Risk"] },
  { slug: "translator", name: "Translator", category: "Professional Services", riskFactor: 0.8, typicalEmployeeRange: "0-1", recommendedCoverage: ["Professional Liability (E&O)"] },
  { slug: "mobile-notary", name: "Mobile Notary", category: "Professional Services", riskFactor: 0.85, typicalEmployeeRange: "0-1", recommendedCoverage: ["Notary Errors & Omissions", "General Liability"] },
  { slug: "real-estate-agent", name: "Real Estate Agent", category: "Professional Services", riskFactor: 1.2, typicalEmployeeRange: "0-3", recommendedCoverage: ["Errors & Omissions (Real Estate)", "General Liability"] },

  // Trade & Field Services (1.5 - 2.2)
  { slug: "general-contractor", name: "General Contractor", category: "Trades & Construction", riskFactor: 2.2, typicalEmployeeRange: "1-10", recommendedCoverage: ["General Liability", "Workers' Compensation", "Commercial Auto", "Tools & Equipment"] },
  { slug: "electrician", name: "Electrician", category: "Trades & Construction", riskFactor: 1.9, typicalEmployeeRange: "1-5", recommendedCoverage: ["General Liability", "Tools Floater", "Workers' Compensation"] },
  { slug: "plumber", name: "Plumber", category: "Trades & Construction", riskFactor: 2.0, typicalEmployeeRange: "1-5", recommendedCoverage: ["General Liability (Water Damage Endorsement)", "Tools & Equipment"] },
  { slug: "hvac-technician", name: "HVAC Technician", category: "Trades & Construction", riskFactor: 1.85, typicalEmployeeRange: "1-5", recommendedCoverage: ["General Liability", "Commercial Auto", "Workers' Compensation"] },
  { slug: "handyman", name: "Handyman", category: "Trades & Construction", riskFactor: 1.6, typicalEmployeeRange: "0-2", recommendedCoverage: ["General Liability", "Tools & Equipment"] },
  { slug: "painter", name: "Painter", category: "Trades & Construction", riskFactor: 1.5, typicalEmployeeRange: "0-3", recommendedCoverage: ["General Liability", "Ladders & Scaffold Endorsement"] },
  { slug: "landscaper", name: "Landscaper", category: "Trades & Construction", riskFactor: 1.65, typicalEmployeeRange: "1-5", recommendedCoverage: ["General Liability", "Commercial Auto", "Equipment Floater"] },

  // Personal Care & Wellness (1.1 - 1.4)
  { slug: "hair-stylist", name: "Hair Stylist", category: "Personal Care & Beauty", riskFactor: 1.1, typicalEmployeeRange: "0-2", recommendedCoverage: ["General Liability", "Professional Liability (Chemical/Styling)"] },
  { slug: "esthetician", name: "Esthetician", category: "Personal Care & Beauty", riskFactor: 1.25, typicalEmployeeRange: "0-2", recommendedCoverage: ["Professional Liability (Medical Spa/Skincare)", "General Liability"] },
  { slug: "massage-therapist", name: "Massage Therapist", category: "Personal Care & Beauty", riskFactor: 1.2, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability", "Professional Liability"] },
  { slug: "personal-trainer", name: "Personal Trainer", category: "Fitness & Wellness", riskFactor: 1.3, typicalEmployeeRange: "0-2", recommendedCoverage: ["General Liability (Bodily Injury)", "Professional Liability"] },
  { slug: "yoga-instructor", name: "Yoga Instructor", category: "Fitness & Wellness", riskFactor: 1.15, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability", "Professional Liability"] },

  // Events & Special Services (1.1 - 1.5)
  { slug: "caterer", name: "Caterer", category: "Food & Hospitality", riskFactor: 1.5, typicalEmployeeRange: "1-8", recommendedCoverage: ["General Liability (Food Contamination)", "Commercial Auto"] },
  { slug: "event-planner", name: "Event Planner", category: "Events & Hospitality", riskFactor: 1.15, typicalEmployeeRange: "0-3", recommendedCoverage: ["General Liability", "Errors & Omissions"] },
  { slug: "cleaning-service-owner", name: "Cleaning Service Owner", category: "Residential & Commercial Services", riskFactor: 1.4, typicalEmployeeRange: "1-5", recommendedCoverage: ["General Liability", "Janitorial Bond / Crime"] },
  { slug: "dog-groomer", name: "Dog Groomer", category: "Pet Services", riskFactor: 1.2, typicalEmployeeRange: "0-2", recommendedCoverage: ["General Liability (Animal Damage Endorsement)", "Bailee's Customer Coverage"] },
  { slug: "tutor", name: "Tutor", category: "Educational Services", riskFactor: 0.85, typicalEmployeeRange: "0-1", recommendedCoverage: ["General Liability", "Professional Liability"] }
];

const targetDir = path.resolve('./src/content/professions');

professionsData.forEach(prof => {
  const filePath = path.join(targetDir, `${prof.slug}.json`);
  const content = {
    slug: prof.slug,
    name: prof.name,
    category: prof.category,
    image: `/images/professions/${prof.slug}.jpg`,
    imageAlt: `${prof.name} performing commercial work`,
    riskFactor: prof.riskFactor,
    typicalEmployeeRange: prof.typicalEmployeeRange,
    recommendedCoverage: prof.recommendedCoverage,
    notes: "",
    intro: "",
    seoTitle: `Business Insurance Cost for ${prof.name}s | PolicyLens`,
    seoDescription: `Calculate estimated business insurance costs for ${prof.name.toLowerCase()} businesses including general liability and professional E&O coverage.`
  };
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
});

console.log(`Successfully generated/updated ${professionsData.length} profession JSON files.`);
