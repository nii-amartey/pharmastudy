const scenarios = [
  {
    id: 1,
    title: "Patient requests an antibiotic",
    situation:
      "A patient comes to a pharmacy and asks for an antibiotic because they have had a cough for two days. What should be considered first?",
    options: [
      "Assess the symptoms and determine whether referral is appropriate",
      "Give any available antibiotic",
      "Recommend taking two antibiotics together",
      "Tell the patient antibiotics treat every cough",
    ],
    answer:
      "Assess the symptoms and determine whether referral is appropriate",
    explanation:
      "A cough can have many causes. The appropriate response involves assessing the situation and referring the patient when necessary rather than automatically supplying an antibiotic.",
  },

  {
    id: 2,
    title: "Checking a medicine label",
    situation:
      "A student is preparing to dispense a medicine. Which information should be carefully checked before supplying it?",
    options: [
      "Medicine name, strength, dosage instructions and patient details",
      "Only the color of the package",
      "Only the manufacturer's logo",
      "Only the price",
    ],
    answer:
      "Medicine name, strength, dosage instructions and patient details",
    explanation:
      "Checking the medicine, strength, directions and patient information helps reduce dispensing errors.",
  },

  {
    id: 3,
    title: "Unclear prescription",
    situation:
      "A prescription contains an instruction that is difficult to read and could have more than one interpretation. What should the student do?",
    options: [
      "Clarify the instruction with the appropriate healthcare professional",
      "Guess what the prescriber intended",
      "Choose the most expensive medicine",
      "Ignore the unclear instruction",
    ],
    answer:
      "Clarify the instruction with the appropriate healthcare professional",
    explanation:
      "When a prescription is unclear, it should be clarified rather than interpreted by guessing.",
  },

  {
    id: 4,
    title: "Patient asks about side effects",
    situation:
      "A patient asks whether a medicine can cause side effects. What is an appropriate response?",
    options: [
      "Provide appropriate information and advise the patient when to seek further help",
      "Tell the patient medicines never cause side effects",
      "Tell the patient to stop every medicine immediately",
      "Ignore the question",
    ],
    answer:
      "Provide appropriate information and advise the patient when to seek further help",
    explanation:
      "Patients should receive appropriate medicine information and guidance about when professional assessment may be needed.",
  },
];

export default scenarios;