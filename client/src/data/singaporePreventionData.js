// src/data/singaporePreventionData.js - Comprehensive Singapore Health Data

export const singaporeCancerStatistics = {
    overview: {
      totalCases2022: {
        male: 16303,
        female: 14598,
        total: 30901
      },
      totalDeaths2022: {
        male: 9597,
        female: 7054,
        total: 16651
      },
      preventablePercentage: "30-50%"
    },
    
    topCancers: {
      male: [
        { type: "Colorectal", incidence: 17.4, mortality: 14.3, survival5yr: 63.9 },
        { type: "Lung", incidence: 13.4, mortality: 12.3, survival5yr: 21.9 },
        { type: "Liver", incidence: 7.4, mortality: 7.2, survival5yr: 26.8 },
        { type: "Prostate", incidence: 7.4, mortality: 3.9, survival5yr: 89.2 },
        { type: "Lymphoid neoplasms", incidence: 7.4, mortality: 4.8, survival5yr: 61.7 }
      ],
      female: [
        { type: "Breast", incidence: 29.8, mortality: 17.1, survival5yr: 83.1 },
        { type: "Colorectal", incidence: 12.9, mortality: 13.6, survival5yr: 63.3 },
        { type: "Lung", incidence: 7.6, mortality: 13.1, survival5yr: 37.8 },
        { type: "Ovary", incidence: 7.4, mortality: 3.4, survival5yr: 43.2 },
        { type: "Uterus", incidence: 5.2, mortality: 2.8, survival5yr: 74.0 }
      ]
    },
  
    riskFactors: {
      smoking: {
        impact: "30% of cancer deaths",
        preventable: true,
        riskIncrease: 30,
        singaporeRate: "10.1% adults (2020)"
      },
      obesity: {
        impact: "4.7% of female cancer DALYs",
        preventable: true,
        riskIncrease: 20,
        singaporeRate: "10.5% adults (2020)"
      },
      alcohol: {
        impact: "5.9% male, 5.1% female cancer DALYs",
        preventable: true,
        riskIncrease: 15,
        singaporeRate: "Regular drinkers increasing"
      },
      diet: {
        impact: "5.9% male, 5.1% female cancer DALYs",
        preventable: true,
        riskIncrease: 15,
        singaporeRate: "High sodium, low fiber intake common"
      },
      physicalActivity: {
        impact: "Reduced risk by 20-30%",
        preventable: true,
        riskReduction: 25,
        singaporeRate: "Only 26.8% meet guidelines"
      },
      uvRadiation: {
        impact: "90% of skin cancers preventable",
        preventable: true,
        riskIncrease: 25,
        singaporeRate: "Year-round high UV index"
      }
    }
  };
  
  export const screeningGuidelines = {
    cervical: {
      targetAge: "25-69 years",
      frequency: "3 years (Pap) / 5 years (HPV)",
      currentRate: 45.4,
      targetRate: 70,
      locations: ["Polyclinics", "Private clinics", "Women's clinics"],
      cost: "Subsidized at polyclinics (~$25-50)",
      program: "Singapore Cancer Society screening"
    },
    breast: {
      targetAge: "40-69 years", 
      frequency: "2 years",
      currentRate: 52.3,
      targetRate: 65,
      locations: ["Polyclinics", "Hospitals", "Screening centers"],
      cost: "Subsidized at polyclinics (~$50-80)",
      program: "ScreenIt-Breast program"
    },
    colorectal: {
      targetAge: "50-75 years",
      frequency: "1 year (FIT) / 10 years (Colonoscopy)",
      currentRate: 41.7,
      targetRate: 60,
      locations: ["Polyclinics", "Gastroenterology clinics"],
      cost: "FIT test ~$10 subsidized",
      program: "Screen for Life program"
    }
  };
  
  export const preventionStrategies = {
    diet: {
      singapore_specific: [
        "Choose steamed over fried at hawker centers",
        "Request 'less oil, less salt' when ordering",
        "Opt for brown rice instead of white rice",
        "Include local fruits high in antioxidants (papaya, guava)",
        "Look for Healthier Choice Symbol when shopping",
        "Limit intake of processed meats (bak kwa, luncheon meat)",
        "Choose fresh fruit over sugary drinks",
        "Practice portion control with zi char dishes"
      ],
      general_guidelines: [
        "5+ servings of fruits and vegetables daily",
        "Limit red meat to <500g per week",
        "Avoid processed meats",
        "Choose whole grains over refined grains",
        "Limit alcohol consumption",
        "Stay hydrated with water, not sugary drinks"
      ]
    },
    
    exercise: {
      singapore_specific: [
        "Use park connectors for walking and cycling",
        "Exercise early morning (6-8am) or evening (after 6pm)",
        "Join ActiveSG programs at community centers",
        "Take stairs instead of escalators in MRT",
        "Use fitness facilities at HDB void decks",
        "Try tai chi at community gardens",
        "Swimming at public pools during cooler hours",
        "Indoor activities during haze periods"
      ],
      guidelines: [
        "150 minutes moderate aerobic activity per week",
        "75 minutes vigorous aerobic activity per week", 
        "Muscle strengthening 2+ days per week",
        "Reduce sedentary time",
        "Start slowly and gradually increase"
      ]
    },
    
    lifestyle: {
      singapore_specific: [
        "Manage work stress in fast-paced environment",
        "Get adequate sleep despite 24/7 lifestyle",
        "Use air conditioning wisely - balance comfort and outdoor activity",
        "Take advantage of Singapore's year-round exercise weather",
        "Utilize work-life balance initiatives",
        "Practice stress management in high-pressure society",
        "Take regular breaks from screen time",
        "Use nature parks for mental health breaks"
      ],
      sun_protection: [
        "Use SPF 30+ sunscreen daily (high UV index year-round)",
        "Seek shade during peak hours (10am-3pm)",
        "Wear protective clothing outdoors",
        "Use umbrella for additional shade",
        "Regular skin self-examinations",
        "Annual dermatologist check for high-risk individuals"
      ]
    }
  };
  
  export const localResources = {
    healthcareFacilities: [
      {
        name: "Singapore Cancer Society",
        type: "Support Organization",
        services: ["Support groups", "Educational programs", "Patient assistance", "Screening services"],
        locations: ["15 Enggor Street", "Outreach programs island-wide"],
        contact: "6225-5655",
        website: "singaporecancersociety.org.sg"
      },
      {
        name: "National Cancer Centre Singapore",
        type: "Specialist Hospital",
        services: ["Cancer treatment", "Research", "Prevention programs"],
        location: "11 Hospital Crescent",
        contact: "6436-8000"
      },
      {
        name: "Polyclinics (National Healthcare Group)",
        type: "Primary Healthcare",
        services: ["Screening services", "Health education", "Preventive care"],
        locations: "Island-wide (28 locations)",
        screening_programs: ["ScreenIt-Breast", "Screen for Life", "Cervical screening"]
      }
    ],
    
    fitnessResources: [
      {
        name: "ActiveSG",
        type: "National Fitness Program",
        services: ["Gym access", "Swimming pools", "Sports programs", "Fitness classes"],
        locations: "Island-wide sports centers",
        cost: "$2.50 per facility visit",
        website: "myactivesg.com"
      },
      {
        name: "Park Connectors Network",
        type: "Exercise Infrastructure", 
        services: ["Walking paths", "Cycling routes", "Exercise stations"],
        locations: "300km+ island-wide",
        cost: "Free"
      },
      {
        name: "Community Centers",
        type: "Local Fitness Facilities",
        services: ["Fitness corners", "Exercise classes", "Health programs"],
        locations: "Island-wide (108 centers)",
        cost: "Subsidized rates for residents"
      }
    ],
    
    supportServices: [
      {
        name: "Cancer Helpline",
        type: "Emotional Support",
        services: ["Counseling", "Information", "Referrals"],
        contact: "6225-5655",
        hours: "Monday-Friday 9am-6pm"
      },
      {
        name: "HealthHub",
        type: "Digital Health Platform",
        services: ["Health records", "Appointment booking", "Health info"],
        access: "Mobile app and website",
        website: "healthhub.sg"
      },
      {
        name: "Health Promotion Board",
        type: "Government Agency",
        services: ["Health education", "Disease prevention", "Healthy lifestyle promotion"],
        programs: ["Healthier SG", "Healthy 365", "Nutrition education"]
      }
    ]
  };
  
  export const healthyChoices = {
    hawkerCenterOptions: {
      recommended: [
        { dish: "Steamed fish with rice", benefits: "Low fat, high protein", tips: "Ask for less sauce" },
        { dish: "Chicken rice (steamed)", benefits: "Lean protein", tips: "Skip the fatty skin" },
        { dish: "Yong tau foo (clear soup)", benefits: "Vegetables, lean protein", tips: "Choose more vegetables" },
        { dish: "Ban mian (less oil)", benefits: "Vegetables, moderate carbs", tips: "Request less oil" },
        { dish: "Economic rice (3 veg 1 meat)", benefits: "Balanced nutrition", tips: "Choose steamed/boiled options" }
      ],
      avoid: [
        { dish: "Char kway teow", reason: "High fat, high sodium" },
        { dish: "Fried carrot cake", reason: "High fat, refined carbs" },
        { dish: "Fried rice/noodles", reason: "High fat, high calories" },
        { dish: "Fatty pork dishes", reason: "High saturated fat" }
      ]
    },
    
    supermarketChoices: [
      "Look for Healthier Choice Symbol products",
      "Choose wholemeal bread over white bread",
      "Select lean cuts of meat",
      "Buy fresh/frozen vegetables over canned",
      "Choose low-fat dairy products",
      "Opt for high-fiber cereals",
      "Select nuts and seeds as snacks",
      "Choose olive oil over palm oil"
    ]
  };
  
  export const cancerPreventionCalendar = {
    daily: [
      "Take 10,000 steps",
      "Eat 5 servings of fruits and vegetables",
      "Apply sunscreen before going outdoors",
      "Avoid tobacco and secondhand smoke",
      "Limit alcohol consumption",
      "Practice stress management",
      "Get adequate sleep (7-9 hours)"
    ],
    weekly: [
      "Engage in 150 minutes of moderate exercise",
      "Include 2 days of strength training",
      "Plan healthy meals for the week",
      "Check and maintain healthy weight",
      "Limit processed food consumption",
      "Practice mindfulness or meditation"
    ],
    monthly: [
      "Perform self-examinations (breast, skin)",
      "Review and update health goals",
      "Schedule necessary health screenings",
      "Evaluate stress levels and coping strategies",
      "Assess and improve sleep quality",
      "Review family health history"
    ],
    annually: [
      "Complete age-appropriate cancer screenings",
      "Have comprehensive health check-up", 
      "Update vaccination status",
      "Review and update health insurance",
      "Assess occupational health risks",
      "Participate in community health programs"
    ]
  };
  
  export const riskAssessmentQuestions = {
    demographic: [
      { question: "What is your age?", type: "number", weight: 0.1 },
      { question: "What is your gender?", type: "select", options: ["Male", "Female"], weight: 0.1 },
      { question: "What is your ethnicity?", type: "select", options: ["Chinese", "Malay", "Indian", "Others"], weight: 0.05 }
    ],
    lifestyle: [
      { question: "Do you currently smoke?", type: "boolean", weight: 0.25 },
      { question: "How many cigarettes per day?", type: "number", condition: "smoker", weight: 0.15 },
      { question: "Do you drink alcohol?", type: "select", options: ["Never", "Occasionally", "Regularly", "Heavily"], weight: 0.15 },
      { question: "How many days per week do you exercise?", type: "number", weight: 0.2 },
      { question: "What is your BMI?", type: "number", weight: 0.15 },
      { question: "How would you describe your diet?", type: "select", options: ["Very healthy", "Healthy", "Average", "Poor"], weight: 0.1 }
    ],
    medical: [
      { question: "Do you have a family history of cancer?", type: "boolean", weight: 0.2 },
      { question: "Which family members had cancer?", type: "multiple", options: ["Parent", "Sibling", "Grandparent", "Other"], condition: "family_history", weight: 0.1 },
      { question: "Have you had previous cancer?", type: "boolean", weight: 0.15 },
      { question: "Do you take hormone replacement therapy?", type: "boolean", gender: "female", weight: 0.1 },
      { question: "How often do you get health screenings?", type: "select", options: ["Regularly", "Sometimes", "Rarely", "Never"], weight: 0.15 }
    ],
    environmental: [
      { question: "Are you regularly exposed to secondhand smoke?", type: "boolean", weight: 0.1 },
      { question: "Do you work with chemicals or hazardous materials?", type: "boolean", weight: 0.15 },
      { question: "How often do you use sunscreen?", type: "select", options: ["Always", "Often", "Sometimes", "Never"], weight: 0.1 },
      { question: "Do you live in an area with air pollution?", type: "boolean", weight: 0.05 }
    ]
  };
  
  export default {
    singaporeCancerStatistics,
    screeningGuidelines,
    preventionStrategies,
    localResources,
    healthyChoices,
    cancerPreventionCalendar,
    riskAssessmentQuestions
  };