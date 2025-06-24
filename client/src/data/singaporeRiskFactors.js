// src/data/singaporeRiskFactors.js
export const singaporeRiskFactors = {
    ethnicity: {
      chinese: {
        colorectal: { riskMultiplier: 1.2, prevalence: 16.2 },
        breast: { riskMultiplier: 0.9, prevalence: 14.8 },
        liver: { riskMultiplier: 1.5, prevalence: 8.7 }
      },
      malay: {
        colorectal: { riskMultiplier: 0.8, prevalence: 12.1 },
        breast: { riskMultiplier: 1.1, prevalence: 16.2 },
        cervical: { riskMultiplier: 1.3, prevalence: 8.1 }
      },
      indian: {
        colorectal: { riskMultiplier: 0.9, prevalence: 13.8 },
        breast: { riskMultiplier: 1.0, prevalence: 15.1 },
        lung: { riskMultiplier: 0.7, prevalence: 9.2 }
      }
    },
    lifestyle: {
      smoking: {
        prevalence: 8.8,
        riskIncrease: {
          lung: 85,
          colorectal: 30,
          cervical: 50,
          bladder: 70
        }
      },
      alcohol: {
        prevalence: 12.4,
        riskIncrease: {
          liver: 60,
          breast: 20,
          colorectal: 15
        }
      },
      obesity: {
        prevalence: 36.2,
        riskIncrease: {
          colorectal: 25,
          breast: 20,
          liver: 40
        }
      },
      sedentary: {
        prevalence: 44.8,
        riskIncrease: {
          colorectal: 20,
          breast: 15
        }
      }
    }
  };
  
  // src/data/screeningGuidelines.js
  export const screeningGuidelines = {
    cervical: {
      startAge: 25,
      intervals: {
        '25-29': { test: 'Pap test', frequency: 3 },
        '30+': { test: 'HPV test', frequency: 5 }
      },
      locations: [
        'All polyclinics',
        'Women\'s clinics',
        'Private gynecologists'
      ],
      subsidy: 'Available for citizens and PRs at polyclinics'
    },
    colorectal: {
      startAge: 50,
      intervals: {
        '50+': { test: 'FIT', frequency: 1 }
      },
      locations: [
        'All polyclinics',
        'Family medicine clinics'
      ],
      subsidy: 'Free FIT test for eligible residents'
    },
    breast: {
      startAge: 40,
      intervals: {
        '40+': { test: 'Mammogram', frequency: 2 }
      },
      locations: [
        'BreastScreen Singapore',
        'Polyclinics',
        'Private clinics'
      ],
      subsidy: 'Subsidized mammograms available'
    }
  };
  
  // src/data/communityResources.js
  export const communityResources = {
    north: [
      {
        name: "Ang Mo Kio Polyclinic",
        services: ["Cervical screening", "FIT test", "Health counseling"],
        address: "21 Ang Mo Kio Central 2",
        phone: "6355-3000",
        waitTime: "2-3 days",
        coordinates: { lat: 1.3691, lng: 103.8454 }
      },
      {
        name: "Yishun Community Hospital",
        services: ["Comprehensive screening", "Health education"],
        address: "2 Yishun Central 2",
        phone: "6807-8800",
        waitTime: "1-2 weeks",
        coordinates: { lat: 1.4304, lng: 103.8354 }
      }
    ],
    central: [
      {
        name: "Singapore General Hospital",
        services: ["Advanced screening", "Specialist consultation"],
        address: "Outram Road",
        phone: "6222-3322",
        waitTime: "2-4 weeks",
        coordinates: { lat: 1.2813, lng: 103.8357 }
      }
    ],
    // Add other regions...
  };
  
  // src/data/preventionPrograms.js
  export const preventionPrograms = {
    smoking_cessation: {
      title: "I Quit Programme",
      provider: "Health Promotion Board",
      description: "Free smoking cessation support",
      contact: "1800-438-2000",
      locations: "All polyclinics",
      success_rate: 65
    },
    healthy_diet: {
      title: "Healthier Choice Symbol",
      provider: "Health Promotion Board", 
      description: "Healthier food options identification",
      website: "hpb.gov.sg/healthy-living/food-beverage",
      hawker_program: "Healthier Hawker Programme"
    },
    physical_activity: {
      title: "ActiveSG",
      provider: "Sport Singapore",
      description: "Free sports facilities and programs",
      benefits: ["Free swimming", "Gym access", "Sports programs"],
      signup: "ActiveSG app or community centers"
    },
    mental_health: {
      title: "Community Mental Health Support",
      provider: "Institute of Mental Health",
      description: "Mental health support services",
      hotline: "6389-2222",
      services: ["Counseling", "Support groups", "Workplace programs"]
    }
  };