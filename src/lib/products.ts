import { Product } from './types';

function createId(name: string): string {
  return name
    .toLowerCase()
    .replace(/ \/ /g, '-')
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}
export const products: Product[] = [

  {
    id: createId("3Ltr PVD GOLD HANDI CHAFER"),
    name: "3Ltr PVD GOLD HANDI CHAFER",
    image: "/images/3ltr-pvd-gold-handi-chafer.png",
    category: "Chafers",
    sizes: ["3 Ltr"]
  },
  {
    id: createId("SS PANI PURI MATKA WITH STAND"),
    name: "SS PANI PURI MATKA WITH STAND",
    image: "/images/ss-pani-puri-matka-with-stand.png",
    category: "Serving",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD OBLIQUE BOWL 14/18/22 CM"),
    name: "PVD GOLD OBLIQUE BOWL 14/18/22 CM",
    image: "/images/pvd-gold-oblique-bowl-14-18-22-cm.png",
    category: "Bowls",
    sizes: ["14 cm", "18 cm", "22 cm"]
  },
  {
    id: createId("PVD GOLD TABLE DECORATIVES"),
    name: "PVD GOLD TABLE DECORATIVES",
    image: "/images/pvd-gold-table-decoratives.png",
    category: "Decoratives",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD 6 SLOT CHAAT STAND"),
    name: "PVD GOLD 6 SLOT CHAAT STAND",
    image: "/images/pvd-gold-6-slot-chaat-stand.png",
    category: "Stands",
    sizes: ["6 Slot"]
  },
  {
    id: createId("PVD GOLD PLATTERS"),
    name: "PVD GOLD PLATTERS",
    image: "/images/pvd-gold-platters.png",
    category: "Platters",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD CUTLERY"),
    name: "PVD GOLD CUTLERY",
    image: "/images/pvd-gold-cutlery.png",
    category: "Cutlery",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD SERVING LADELS"),
    name: "PVD GOLD SERVING LADELS",
    image: "/images/pvd-gold-serving-ladels.png",
    category: "Cutlery",
    sizes: ["Standard"]
  },
  {
    id: createId("FnS CUTLERY"),
    name: "FnS CUTLERY",
    image: "/images/fns-cutlery.png",
    category: "Cutlery",
    sizes: ["Standard"]
  },
  {
    id: createId("2 SLOT / 3 SLOT PANI PURI MATKA"),
    name: "2 SLOT / 3 SLOT PANI PURI MATKA",
    image: "/images/2-slot-3-slot-pani-puri-matka.png",
    category: "Serving",
    sizes: ["2 Slot", "3 Slot"]
  },
  {
    id: createId("SS SNACK WARMER"),
    name: "SS SNACK WARMER",
    image: "/images/ss-snack-warmer.png",
    category: "Warmers",
    sizes: ["Standard"]
  },
  {
    id: createId("ROSE GOLD SNACK WARMER"),
    name: "ROSE GOLD SNACK WARMER",
    image: "/images/rose-gold-snack-warmer.png",
    category: "Warmers",
    sizes: ["Standard"]
  },
  {
    id: createId("TWO TIER SALAD STAND"),
    name: "TWO TIER SALAD STAND",
    image: "/images/two-tier-salad-stand.png",
    category: "Stands",
    sizes: ["Standard"]
  },
  {
    id: createId("KANGAROO BOWL 3 SIZES"),
    name: "KANGAROO BOWL 3 SIZES",
    image: "/images/kangaroo-bowl-3-sizes.png",
    category: "Bowls",
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: createId("SS PVD GOLD RISER"),
    name: "SS PVD GOLD RISER",
    image: "/images/ss-pvd-gold-riser.png",
    category: "Risers",
    sizes: ["Standard"]
  },
  {
    id: createId("SILVER RISER"),
    name: "SILVER RISER",
    image: "/images/silver-riser.png",
    category: "Risers",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD RISERS"),
    name: "PVD GOLD RISERS",
    image: "/images/pvd-gold-risers.png",
    category: "Risers",
    sizes: ["Standard"]
  },
  {
    id: createId("SS PVD GOLD PLATE STAND"),
    name: "SS PVD GOLD PLATE STAND",
    image: "/images/ss-pvd-gold-plate-stand.png",
    category: "Stands",
    sizes: ["Standard"]
  },
  {
    id: createId("SS PVD GOLD PLATE & BOWL STAND"),
    name: "SS PVD GOLD PLATE & BOWL STAND",
    image: "/images/ss-pvd-gold-plate-bowl-stand.png",
    category: "Stands",
    sizes: ["Standard"]
  },
  {
    id: createId("PVD GOLD HEXAGON CHAFER 5LTR"),
    name: "PVD GOLD HEXAGON CHAFER 5LTR",
    image: "/images/pvd-gold-hexagon-chafer-5ltr.png",
    category: "Chafers",
    sizes: ["5 Ltr"]
  },
  {
    id: createId("PVD GOLD MAHARAJA CHAFER 6LTR"),
    name: "PVD GOLD MAHARAJA CHAFER 6LTR",
    image: "/images/pvd-gold-maharaja-chafer-6ltr.png",
    category: "Chafers",
    sizes: ["6 Ltr"]
  },
  {
    id: createId("ROSE GOLD HANDI CHAFER 8LTR"),
    name: "ROSE GOLD HANDI CHAFER 8LTR",
    image: "/images/rose-gold-handi-chafer-8ltr.png",
    category: "Chafers",
    sizes: ["8 Ltr"]
  },
  {
    id: createId("DIAMOND MOONLEG CHAFER 8LTR"),
    name: "DIAMOND MOONLEG CHAFER 8LTR",
    image: "/images/diamond-moonleg-chafer-8ltr.png",
    category: "Chafers",
    sizes: ["8 Ltr"]
  },
  {
    id: createId("MOONLEG CHAFER 8LTR"),
    name: "MOONLEG CHAFER 8LTR",
    image: "/images/moonleg-chafer-8ltr.png",
    category: "Chafers",
    sizes: ["8 Ltr"]
  },
  {
    id: createId("6ltr Pvd Gold Yodha Chafing Dish"),
    name: "6ltr Pvd Gold Yodha Chafing Dish",
    image: "/images/6ltr-pvd-gold-yodha-chafing-dish.png",
    category: "Chafers",
    sizes: ["6 Ltr"]
  },
  {
    id: createId("3LTR APPU CHAFER WITH STAND"),
    name: "3LTR APPU CHAFER WITH STAND",
    image: "/images/3ltr-appu-chafer-with-stand.png",
    category: "Chafers",
    sizes: ["3 Ltr"]
  },
  {
    id: createId("4LTR MITHAI DONGA GOLD"),
    name: "4LTR MITHAI DONGA GOLD",
    image: "/images/4ltr-mithai-donga-gold.png",
    category: "Bowls",
    sizes: ["4 Ltr"]
  },
  {
    id: createId("5 Ltr Gujrati Chafer"),
    name: "5 Ltr Gujrati Chafer",
    image: "/images/5ltr-gujrati-chafer.png",
    category: "Chafers",
    sizes: ["5 Ltr"]
  },
  {
    id: createId("5LTR Hammered Gujrati Chafer"),
    name: "5LTR Hammered Gujrati Chafer",
    image: "/images/5ltr-hammered-gujrati-chafer.png",
    category: "Chafers",
    sizes: ["5 Ltr"]
  },
  {
    id: createId("RIBBED SOUP TUREEN 10 LTR"),
    name: "RIBBED SOUP TUREEN 10 LTR",
    image: "/images/ribbed-soup-tureen-10ltr.png",
    category: "Soupware",
    sizes: ["10 Ltr"]
  }
];

// 1. Ensure these names are EXACTLY what you want to show on the site
export const categories = [
  "Bowls", 
  "Chafers", 
  "Cutlery", 
  "Decoratives", 
  "Platters", 
  "Risers", 
  "Serving", 
  "Soupware"
];

// 2. Map those exact names to the new image paths
export const categoryImages: { [key: string]: string } = {
  "Spoons": "/images/fns-cutlery.png",
  "Bowls": "/images/lissome-bowl.png", // Ensure this file exists in public/images/
  "Plates": "/images/square-round-plates.png",
  "Chafers": "/images/3ltr-pvd-gold-handi-chafer.png",
  "Cutlery": "/images/pvd-gold-cutlery.png",
  "Decoratives": "/images/pvd-gold-table-decoratives.png",
  
  // ADD OR UPDATE THESE SPECIFICALLY:
  "Platters": "/images/pvd-gold-platters.png",
  "Risers": "/images/pvd-gold-risers.png",
  "Serving": "/images/new-serving-image.png",
  "Soupware": "/images/ribbed-soup-tureen-10ltr.png"
};
// ===============================================

export const pdfCatalogues = [
  {
    name: "Antique Glassware",
    pdfUrl: "/catalogues/Antique Glassware.pdf",
    image: "/images/3ltr-pvd-gold-handi-chafer.png"
  },
  {
    name: "Melamine & HoReCa Range",
    pdfUrl: "/catalogues/Ariane Digital Crockery.pdf",
    image: "/images/lissome-bowl.png"
  }
];