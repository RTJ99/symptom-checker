export const symptoms = [
  {label: 'Fever', value: 'Fever'},
  {label: 'Cough', value: 'cough'},
  {label: 'Sore throat', value: 'soreThroat'},
  {label: 'Shortness of breath', value: 'shortnessOfBreath'},
  {label: 'Fatigue', value: 'fatigue'},
  {label: 'Headache', value: 'headache'},
  {label: 'Muscle aches', value: 'muscleAches'},
  {label: 'Runny nose', value: 'runnyNose'},
  {label: 'Loss of taste or smell', value: 'lossOfTasteOrSmell'},
  {label: 'Nausea', value: 'nausea'},
  {label: 'Vomiting', value: 'vomiting'},
  {label: 'Diarrhea', value: 'diarrhea'},
  {label: 'Abdominal pain', value: 'abdominalPain'},
  {label: 'Joint pain', value: 'jointPain'},
  {label: 'Skin rash', value: 'skinRash'},
  {label: 'Itchy eyes', value: 'itchyEyes'},
  {label: 'Chest pain', value: 'chestPain'},
  {label: 'Dizziness', value: 'dizziness'},
  {label: 'Confusion', value: 'confusion'},
  {label: 'Swollen lymph nodes', value: 'swollenLymphNodes'},
  {label: 'Nervousness', value: 'Nervousness'},
];

export const conditions = [
  {
    name: 'COVID-19',
    symptoms: [
      'fever',
      'cough',
      'shortnessOfBreath',
      'fatigue',
      'lossOfTasteOrSmell',
    ],
    treatments: [
      'Rest and self-isolation',
      'Fluids and electrolyte replacement',
      'Pain relievers (e.g. acetaminophen) for fever and muscle aches',
      'Cough suppressants or expectorants for cough',
      'In severe cases, hospitalization and oxygen therapy may be needed',
    ],
  },
  {
    name: 'Common cold',
    symptoms: ['cough', 'soreThroat', 'runnyNose'],
    treatments: [
      'Rest and hydration',
      'Over-the-counter pain relievers (e.g. acetaminophen, ibuprofen)',
      'Decongestants or antihistamines for runny nose and congestion',
      'Cough suppressants or expectorants for cough',
      'Throat lozenges or sprays for sore throat',
    ],
  },
  {
    name: 'Flu',
    symptoms: ['fever', 'cough', 'fatigue', 'muscleAches', 'headache'],
    treatments: [
      'Rest and hydration',
      'Over-the-counter pain relievers (e.g. acetaminophen, ibuprofen)',
      'Antiviral drugs (e.g. oseltamivir) if started within 48 hours of symptom onset',
      'Cough suppressants or expectorants for cough',
      'In severe cases, hospitalization and supportive care may be needed',
    ],
  },
  {
    name: 'Pneumonia',
    symptoms: ['fever', 'cough', 'shortnessOfBreath', 'fatigue'],
    treatments: [
      'Antibiotics for bacterial pneumonia',
      'Rest and hydration',
      'Pain relievers (e.g. acetaminophen) for fever and muscle aches',
      'Cough suppressants or expectorants for cough',
      'In severe cases, hospitalization and oxygen therapy may be needed',
    ],
  },
  {
    name: 'Migraine',
    symptoms: ['headache', 'nausea'],
    treatments: [
      'Over-the-counter pain relievers (e.g. acetaminophen, ibuprofen)',
      'Prescription migraine medications (e.g. triptans)',
      'Rest in a quiet, dark room',
      'Hydration',
      'Avoiding triggers (e.g. certain foods, stress)',
    ],
  },
  {
    name: 'Asthma',
    symptoms: ['shortnessOfBreath', 'wheezing'],
    treatments: [
      'Inhaler medications (e.g. bronchodilators, steroids)',
      'Allergy testing and avoidance of triggers',
      'Monitoring lung function with a peak flow meter',
      'In severe cases, hospitalization and oxygen therapy may be needed',
      'Regular follow-up with a healthcare provider',
    ],
  },
  {
    name: 'Allergies',
    symptoms: ['runnyNose', 'itchyEyes'],
    treatments: [
      'Allergy testing and avoidance of triggers',
      'Over-the-counter antihistamines or decongestants',
      'Prescription allergy medications (e.g. nasal corticosteroids)',
      'Allergy shots (immunotherapy)',
      'In severe cases, hospitalization and supportive care may be needed',
    ],
  },
  {
    name: 'Anxiety',
    symptoms: ['nervousness', 'fear', 'panic attacks'],
    treatments: [
      'Cognitive-behavioral therapy (CBT)',
      'Medications such as antidepressants or benzodiazepines',
      'Relaxation techniques (e.g. deep breathing, meditation)',
      'Exercise and a healthy diet',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
  {
    name: 'Depression',
    symptoms: ['loss of interest', 'sadness', 'fatigue'],
    treatments: [
      'Psychotherapy (e.g. CBT)',
      'Medications such as antidepressants',
      'Exercise and a healthy diet',
      'Avoiding alcohol and drugs',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
  {
    name: 'Diabetes',
    symptoms: ['frequent urination', 'excessive thirst', 'fatigue'],
    treatments: [
      'Blood sugar monitoring and management',
      'Insulin injections or other diabetes medications',
      'Healthy diet and exercise',
      'Regular check-ups with a healthcare provider',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
  {
    name: 'Hypertension (High blood pressure)',
    symptoms: ['headache', 'chest pain', 'shortness of breath'],
    treatments: [
      'Lifestyle changes (e.g. healthy diet, exercise)',
      'Medications such as ACE inhibitors or diuretics',
      'Regular check-ups with a healthcare provider',
      'Avoiding smoking and excessive alcohol consumption',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
  {
    name: 'Insomnia',
    symptoms: [
      'difficulty falling asleep',
      'waking up frequently',
      'daytime sleepiness',
    ],
    treatments: [
      'Sleep hygiene practices (e.g. avoiding screens before bed)',
      'Cognitive-behavioral therapy for insomnia (CBT-I)',
      'Medications such as sedatives or hypnotics',
      'Relaxation techniques (e.g. deep breathing, meditation)',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
  {
    name: 'Meningitis',
    symptoms: ['fever', 'headache', 'stiff neck'],
    treatments: [
      'Antibiotics or antiviral medications',
      'Pain relievers (e.g. acetaminophen)',
      'Hospitalization and supportive care (e.g. fluids, oxygen therapy)',
      'Meningococcal vaccination for prevention',
      'In severe cases, hospitalization and intensive treatment may be needed',
    ],
  },
];
