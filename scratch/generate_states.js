import fs from 'node:fs';
import path from 'node:path';

const statesData = [
  { slug: "alabama", name: "Alabama", abbreviation: "AL", region: "South", baseRate: 195, avgRent: 1150 },
  { slug: "alaska", name: "Alaska", abbreviation: "AK", region: "West", baseRate: 155, avgRent: 1350 },
  { slug: "arizona", name: "Arizona", abbreviation: "AZ", region: "West", baseRate: 165, avgRent: 1550 },
  { slug: "arkansas", name: "Arkansas", abbreviation: "AR", region: "South", baseRate: 210, avgRent: 1050 },
  { slug: "california", name: "California", abbreviation: "CA", region: "West", baseRate: 185, avgRent: 1950 },
  { slug: "colorado", name: "Colorado", abbreviation: "CO", region: "West", baseRate: 160, avgRent: 1750 },
  { slug: "connecticut", name: "Connecticut", abbreviation: "CT", region: "Northeast", baseRate: 165, avgRent: 1600 },
  { slug: "delaware", name: "Delaware", abbreviation: "DE", region: "South", baseRate: 160, avgRent: 1450 },
  { slug: "florida", name: "Florida", abbreviation: "FL", region: "South", baseRate: 235, avgRent: 1850 },
  { slug: "georgia", name: "Georgia", abbreviation: "GA", region: "South", baseRate: 205, avgRent: 1500 },
  { slug: "hawaii", name: "Hawaii", abbreviation: "HI", region: "West", baseRate: 175, avgRent: 2100 },
  { slug: "idaho", name: "Idaho", abbreviation: "ID", region: "West", baseRate: 140, avgRent: 1300 },
  { slug: "illinois", name: "Illinois", abbreviation: "IL", region: "Midwest", baseRate: 170, avgRent: 1450 },
  { slug: "indiana", name: "Indiana", abbreviation: "IN", region: "Midwest", baseRate: 175, avgRent: 1100 },
  { slug: "iowa", name: "Iowa", abbreviation: "IA", region: "Midwest", baseRate: 145, avgRent: 1000 },
  { slug: "kansas", name: "Kansas", abbreviation: "KS", region: "Midwest", baseRate: 185, avgRent: 1100 },
  { slug: "kentucky", name: "Kentucky", abbreviation: "KY", region: "South", baseRate: 180, avgRent: 1100 },
  { slug: "louisiana", name: "Louisiana", abbreviation: "LA", region: "South", baseRate: 245, avgRent: 1200 },
  { slug: "maine", name: "Maine", abbreviation: "ME", region: "Northeast", baseRate: 145, avgRent: 1350 },
  { slug: "maryland", name: "Maryland", abbreviation: "MD", region: "South", baseRate: 170, avgRent: 1650 },
  { slug: "massachusetts", name: "Massachusetts", abbreviation: "MA", region: "Northeast", baseRate: 160, avgRent: 2000 },
  { slug: "michigan", name: "Michigan", abbreviation: "MI", region: "Midwest", baseRate: 180, avgRent: 1250 },
  { slug: "minnesota", name: "Minnesota", abbreviation: "MN", region: "Midwest", baseRate: 165, avgRent: 1400 },
  { slug: "mississippi", name: "Mississippi", abbreviation: "MS", region: "South", baseRate: 225, avgRent: 1000 },
  { slug: "missouri", name: "Missouri", abbreviation: "MO", region: "Midwest", baseRate: 190, avgRent: 1150 },
  { slug: "montana", name: "Montana", abbreviation: "MT", region: "West", baseRate: 150, avgRent: 1250 },
  { slug: "nebraska", name: "Nebraska", abbreviation: "NE", region: "Midwest", baseRate: 165, avgRent: 1100 },
  { slug: "nevada", name: "Nevada", abbreviation: "NV", region: "West", baseRate: 175, avgRent: 1500 },
  { slug: "new-hampshire", name: "New Hampshire", abbreviation: "NH", region: "Northeast", baseRate: 145, avgRent: 1550 },
  { slug: "new-jersey", name: "New Jersey", abbreviation: "NJ", region: "Northeast", baseRate: 165, avgRent: 1800 },
  { slug: "new-mexico", name: "New Mexico", abbreviation: "NM", region: "West", baseRate: 180, avgRent: 1200 },
  { slug: "new-york", name: "New York", abbreviation: "NY", region: "Northeast", baseRate: 195, avgRent: 2100 },
  { slug: "north-carolina", name: "North Carolina", abbreviation: "NC", region: "South", baseRate: 185, avgRent: 1400 },
  { slug: "north-dakota", name: "North Dakota", abbreviation: "ND", region: "Midwest", baseRate: 140, avgRent: 1050 },
  { slug: "ohio", name: "Ohio", abbreviation: "OH", region: "Midwest", baseRate: 165, avgRent: 1150 },
  { slug: "oklahoma", name: "Oklahoma", abbreviation: "OK", region: "South", baseRate: 230, avgRent: 1050 },
  { slug: "oregon", name: "Oregon", abbreviation: "OR", region: "West", baseRate: 160, avgRent: 1600 },
  { slug: "pennsylvania", name: "Pennsylvania", abbreviation: "PA", region: "Northeast", baseRate: 165, avgRent: 1350 },
  { slug: "rhode-island", name: "Rhode Island", abbreviation: "RI", region: "Northeast", baseRate: 165, avgRent: 1500 },
  { slug: "south-carolina", name: "South Carolina", abbreviation: "SC", region: "South", baseRate: 195, avgRent: 1350 },
  { slug: "south-dakota", name: "South Dakota", abbreviation: "SD", region: "Midwest", baseRate: 145, avgRent: 1050 },
  { slug: "tennessee", name: "Tennessee", abbreviation: "TN", region: "South", baseRate: 190, avgRent: 1350 },
  { slug: "texas", name: "Texas", abbreviation: "TX", region: "South", baseRate: 220, avgRent: 1500 },
  { slug: "utah", name: "Utah", abbreviation: "UT", region: "West", baseRate: 145, avgRent: 1550 },
  { slug: "vermont", name: "Vermont", abbreviation: "VT", region: "Northeast", baseRate: 140, avgRent: 1400 },
  { slug: "virginia", name: "Virginia", abbreviation: "VA", region: "South", baseRate: 165, avgRent: 1600 },
  { slug: "washington", name: "Washington", abbreviation: "WA", region: "West", baseRate: 160, avgRent: 1750 },
  { slug: "west-virginia", name: "West Virginia", abbreviation: "WV", region: "South", baseRate: 175, avgRent: 950 },
  { slug: "wisconsin", name: "Wisconsin", abbreviation: "WI", region: "Midwest", baseRate: 150, avgRent: 1200 },
  { slug: "wyoming", name: "Wyoming", abbreviation: "WY", region: "West", baseRate: 140, avgRent: 1100 }
];

const targetDir = path.resolve('./src/content/states');

statesData.forEach(st => {
  const filePath = path.join(targetDir, `${st.slug}.json`);
  const content = {
    slug: st.slug,
    name: st.name,
    abbreviation: st.abbreviation,
    region: st.region,
    image: `/images/states/${st.slug}.jpg`,
    imageAlt: `${st.name} state outline`,
    baseRate: st.baseRate,
    avgRent: st.avgRent,
    requirementsNote: `${st.name} state law does not mandate renters insurance, but property managers frequently require proof of coverage in standard rental agreements.`,
    intro: "",
    seoTitle: `${st.name} Renters Insurance Cost Calculator`,
    seoDescription: `Estimate renters insurance costs in ${st.name} based on personal property, liability limits, and deductible options.`
  };
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
});

console.log(`Successfully generated/updated ${statesData.length} state JSON files.`);
