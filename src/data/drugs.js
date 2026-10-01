const drugs = [
  {
    id: 1,
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    drugClass: "Penicillin antibiotic",
    category: "Antibiotics",
    dosageForms: ["Tablet", "Capsule", "Oral suspension"],
    commonUses: [
      "Certain bacterial infections",
    ],
    commonSideEffects: [
      "Nausea",
      "Diarrhea",
      "Rash",
    ],
    studyNotes:
      "Amoxicillin is a beta-lactam antibiotic in the penicillin class.",
  },

  {
    id: 2,
    name: "Paracetamol",
    genericName: "Acetaminophen",
    drugClass: "Analgesic / antipyretic",
    category: "Pain Relief",
    dosageForms: [
      "Tablet",
      "Capsule",
      "Oral suspension",
    ],
    commonUses: [
      "Mild to moderate pain",
      "Fever",
    ],
    commonSideEffects: [
      "Generally well tolerated when used appropriately",
    ],
    studyNotes:
      "Paracetamol is commonly used for pain relief and fever reduction.",
  },

  {
    id: 3,
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    drugClass: "NSAID",
    category: "Pain Relief",
    dosageForms: [
      "Tablet",
      "Capsule",
      "Oral suspension",
    ],
    commonUses: [
      "Pain",
      "Inflammation",
      "Fever",
    ],
    commonSideEffects: [
      "Stomach discomfort",
      "Nausea",
      "Indigestion",
    ],
    studyNotes:
      "Ibuprofen is a non-steroidal anti-inflammatory drug.",
  },

  {
    id: 4,
    name: "Omeprazole",
    genericName: "Omeprazole",
    drugClass: "Proton pump inhibitor",
    category: "Gastrointestinal",
    dosageForms: [
      "Capsule",
      "Tablet",
    ],
    commonUses: [
      "Acid-related conditions",
      "Heartburn",
    ],
    commonSideEffects: [
      "Headache",
      "Nausea",
      "Abdominal discomfort",
    ],
    studyNotes:
      "Omeprazole reduces gastric acid secretion.",
  },

  {
    id: 5,
    name: "Metformin",
    genericName: "Metformin",
    drugClass: "Biguanide",
    category: "Diabetes",
    dosageForms: [
      "Tablet",
      "Extended-release tablet",
    ],
    commonUses: [
      "Type 2 diabetes",
    ],
    commonSideEffects: [
      "Nausea",
      "Diarrhea",
      "Abdominal discomfort",
    ],
    studyNotes:
      "Metformin is commonly used as part of the management of type 2 diabetes.",
  },

  {
    id: 6,
    name: "Amlodipine",
    genericName: "Amlodipine",
    drugClass: "Calcium channel blocker",
    category: "Cardiovascular",
    dosageForms: [
      "Tablet",
    ],
    commonUses: [
      "Hypertension",
      "Certain forms of angina",
    ],
    commonSideEffects: [
      "Headache",
      "Dizziness",
      "Ankle swelling",
    ],
    studyNotes:
      "Amlodipine is a calcium channel blocker used in cardiovascular care.",
  },

  {
    id: 7,
    name: "Cetirizine",
    genericName: "Cetirizine",
    drugClass: "Antihistamine",
    category: "Allergy",
    dosageForms: [
      "Tablet",
      "Oral solution",
    ],
    commonUses: [
      "Allergic rhinitis",
      "Urticaria",
    ],
    commonSideEffects: [
      "Drowsiness",
      "Headache",
      "Dry mouth",
    ],
    studyNotes:
      "Cetirizine is an antihistamine used to relieve symptoms of allergic conditions.",
  },

  {
    id: 8,
    name: "Salbutamol",
    genericName: "Albuterol",
    drugClass: "Short-acting beta-2 agonist",
    category: "Respiratory",
    dosageForms: [
      "Inhaler",
      "Nebulizer solution",
    ],
    commonUses: [
      "Relief of bronchospasm",
      "Asthma symptom relief",
    ],
    commonSideEffects: [
      "Tremor",
      "Headache",
      "Palpitations",
    ],
    studyNotes:
      "Salbutamol is a short-acting bronchodilator used for relief of bronchospasm.",
  },
];

export default drugs;