import fs from 'node:fs';
import path from 'node:path';

const statesDir = path.resolve('src/content/states');
const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json'));

for (const file of stateFiles) {
  const filePath = path.join(statesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  data.demographics = {
    typicalPersonalProperty: data.demographics?.typicalPersonalProperty ?? 30000,
    typicalLiability: data.demographics?.typicalLiability ?? 100000,
    typicalDeductible: data.demographics?.typicalDeductible ?? 500,
    demographicNote: data.demographics?.demographicNote ?? ""
  };
  
  data.riskFactors = (data.riskFactors && data.riskFactors.length > 0) ? data.riskFactors : [
    { icon: "shield", title: "", description: "" },
    { icon: "shield", title: "", description: "" },
    { icon: "shield", title: "", description: "" }
  ];

  data.faqs = (data.faqs && data.faqs.length > 0) ? data.faqs : [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
  ];

  data.blogContent = {
    whyThisRate: data.blogContent?.whyThisRate ?? "",
    howCalculated: data.blogContent?.howCalculated ?? "",
    comparisonNote: data.blogContent?.comparisonNote ?? ""
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

const professionsDir = path.resolve('src/content/professions');
const professionFiles = fs.readdirSync(professionsDir).filter(f => f.endsWith('.json'));

for (const file of professionFiles) {
  const filePath = path.join(professionsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data.industryContext = {
    typicalRevenueTier: data.industryContext?.typicalRevenueTier ?? "0-50k",
    typicalEmployeeCount: data.industryContext?.typicalEmployeeCount ?? (data.typicalEmployeeRange || "1"),
    contextNote: data.industryContext?.contextNote ?? ""
  };

  data.riskFactors = (data.riskFactors && data.riskFactors.length > 0) ? data.riskFactors : [
    { icon: "shield", title: "", description: "" },
    { icon: "shield", title: "", description: "" },
    { icon: "shield", title: "", description: "" }
  ];

  data.faqs = (data.faqs && data.faqs.length > 0) ? data.faqs : [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
  ];

  data.blogContent = {
    whyThisRiskFactor: data.blogContent?.whyThisRiskFactor ?? "",
    howCalculated: data.blogContent?.howCalculated ?? "",
    comparisonNote: data.blogContent?.comparisonNote ?? ""
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

console.log(`Updated ${stateFiles.length} state files and ${professionFiles.length} profession files successfully.`);
