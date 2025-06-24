// src/data/communityResources.js
export const communityResources = {
    central: [
      {
        id: "sgh",
        name: "Singapore General Hospital",
        type: "Public Hospital",
        services: ["Cancer screening", "Oncology", "Advanced diagnostics", "Emergency care"],
        address: "Outram Road, Singapore 169608",
        phone: "6222-3322",
        website: "sgh.com.sg",
        waitTime: "2-4 weeks for specialist",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.2813, lng: 103.8357 },
        subsidyInfo: "Subsidies available for citizens and PRs",
        specialties: ["Breast cancer screening", "Colorectal cancer", "Lung cancer"],
        rating: 4.5,
        reviews: 1250
      },
      {
        id: "outram_polyclinic",
        name: "Outram Polyclinic",
        type: "Polyclinic",
        services: ["Cervical screening", "FIT test", "Health checkups", "Chronic disease management"],
        address: "3 Second Hospital Avenue, Singapore 168937",
        phone: "6355-3000",
        website: "nhgp.com.sg",
        waitTime: "3-5 days",
        operatingHours: "8am-12:30pm, 2pm-5:30pm (Mon-Fri), 8am-12:30pm (Sat)",
        coordinates: { lat: 1.2798, lng: 103.8372 },
        subsidyInfo: "Free FIT test, subsidized screening for eligible residents",
        languages: ["English", "Mandarin", "Malay", "Tamil"],
        rating: 4.2,
        reviews: 890
      },
      {
        id: "raffles_hospital",
        name: "Raffles Hospital",
        type: "Private Hospital",
        services: ["Executive health screening", "Cancer screening", "Preventive care"],
        address: "585 North Bridge Road, Singapore 188770",
        phone: "6311-1111",
        website: "rafflesmedicalgroup.com",
        waitTime: "1-2 weeks",
        operatingHours: "24/7",
        coordinates: { lat: 1.3006, lng: 103.8581 },
        subsidyInfo: "Insurance claimable, Medisave eligible",
        specialties: ["Comprehensive health screening", "Executive packages"],
        rating: 4.7,
        reviews: 567
      },
      {
        id: "singapore_cancer_society",
        name: "Singapore Cancer Society",
        type: "Support Organization",
        services: ["Support groups", "Education", "Financial assistance", "Counseling"],
        address: "15 Enggor Street, #04-01, Singapore 079716",
        phone: "6225-5655",
        website: "singaporecancersociety.org.sg",
        waitTime: "1-3 days for support services",
        operatingHours: "9am-6pm (Mon-Fri), 9am-1pm (Sat)",
        coordinates: { lat: 1.2839, lng: 103.8416 },
        subsidyInfo: "Free support services, financial aid available",
        languages: ["English", "Mandarin", "Malay", "Tamil", "Hokkien"],
        programs: ["CanHope", "Relay For Life", "Cancer education"],
        rating: 4.8,
        reviews: 324
      }
    ],
  
    north: [
      {
        id: "amk_polyclinic",
        name: "Ang Mo Kio Polyclinic",
        type: "Polyclinic",
        services: ["Cervical screening", "FIT test", "Health counseling", "Mammography referrals"],
        address: "21 Ang Mo Kio Central 2, #01-01, Singapore 569666",
        phone: "6355-3000",
        website: "nhgp.com.sg",
        waitTime: "2-3 days",
        operatingHours: "8am-12:30pm, 2pm-5:30pm (Mon-Fri), 8am-12:30pm (Sat)",
        coordinates: { lat: 1.3691, lng: 103.8454 },
        subsidyInfo: "Free FIT test for eligible residents, subsidized screening",
        languages: ["English", "Mandarin", "Malay"],
        parking: "Available with fees",
        rating: 4.3,
        reviews: 756
      },
      {
        id: "yishun_community_hospital",
        name: "Yishun Community Hospital",
        type: "Community Hospital",
        services: ["Health screening", "Chronic disease management", "Rehabilitation"],
        address: "2 Yishun Central 2, Singapore 768024",
        phone: "6807-8800",
        website: "yishuncommunityhospital.com.sg",
        waitTime: "1-2 weeks",
        operatingHours: "8am-6pm (Mon-Fri), 8am-1pm (Sat)",
        coordinates: { lat: 1.4304, lng: 103.8354 },
        subsidyInfo: "Community health programs, subsidies available",
        specialties: ["Preventive care", "Community health education"],
        rating: 4.1,
        reviews: 423
      },
      {
        id: "khoo_teck_puat",
        name: "Khoo Teck Puat Hospital",
        type: "Public Hospital",
        services: ["Cancer screening", "Oncology", "Specialist care", "Emergency"],
        address: "90 Yishun Central, Singapore 768828",
        phone: "6555-8000",
        website: "ktph.com.sg",
        waitTime: "2-3 weeks for specialist",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.4288, lng: 103.8370 },
        subsidyInfo: "Subsidies available for citizens and PRs",
        specialties: ["Breast cancer center", "Colorectal screening"],
        rating: 4.4,
        reviews: 892
      }
    ],
  
    south: [
      {
        id: "nuh",
        name: "National University Hospital",
        type: "Public Hospital",
        services: ["Cancer center", "Advanced screening", "Research trials", "Specialist care"],
        address: "5 Lower Kent Ridge Road, Singapore 119074",
        phone: "6779-5555",
        website: "nuh.com.sg",
        waitTime: "3-4 weeks for specialist",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.2959, lng: 103.7831 },
        subsidyInfo: "Public hospital subsidies, research trial opportunities",
        specialties: ["National University Cancer Institute", "Clinical trials"],
        rating: 4.6,
        reviews: 1156
      },
      {
        id: "jurong_polyclinic",
        name: "Jurong Polyclinic",
        type: "Polyclinic",
        services: ["Cancer screening", "Health checkups", "Chronic care", "Women's health"],
        address: "190 Jurong East Avenue 1, Singapore 609788",
        phone: "6355-3000",
        website: "nhgp.com.sg",
        waitTime: "3-4 days",
        operatingHours: "8am-12:30pm, 2pm-5:30pm (Mon-Fri), 8am-12:30pm (Sat)",
        coordinates: { lat: 1.3329, lng: 103.7305 },
        subsidyInfo: "Subsidized screening, free FIT test",
        languages: ["English", "Mandarin", "Malay"],
        rating: 4.0,
        reviews: 634
      },
      {
        id: "ng_teng_fong",
        name: "Ng Teng Fong General Hospital",
        type: "Public Hospital",
        services: ["Cancer screening", "Women's health", "Specialist care"],
        address: "1 Jurong East Street 21, Singapore 609606",
        phone: "6716-2000",
        website: "ntfgh.com.sg",
        waitTime: "2-3 weeks",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.3368, lng: 103.7439 },
        subsidyInfo: "Public hospital rates, insurance claimable",
        specialties: ["Women's Tower", "Integrated care"],
        rating: 4.3,
        reviews: 723
      }
    ],
  
    east: [
      {
        id: "changi_general",
        name: "Changi General Hospital",
        type: "Public Hospital",
        services: ["Cancer screening", "Oncology", "Specialist consultations"],
        address: "2 Simei Street 3, Singapore 529889",
        phone: "6788-8833",
        website: "cgh.com.sg",
        waitTime: "2-3 weeks",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.3403, lng: 103.9496 },
        subsidyInfo: "Public hospital subsidies available",
        specialties: ["Cancer center", "Minimally invasive surgery"],
        rating: 4.5,
        reviews: 967
      },
      {
        id: "bedok_polyclinic",
        name: "Bedok Polyclinic",
        type: "Polyclinic",
        services: ["Cervical screening", "FIT test", "Health education", "Chronic care"],
        address: "11 Bedok North Street 1, #01-01, Singapore 469662",
        phone: "6355-3000",
        website: "nhgp.com.sg",
        waitTime: "2-4 days",
        operatingHours: "8am-12:30pm, 2pm-5:30pm (Mon-Fri), 8am-12:30pm (Sat)",
        coordinates: { lat: 1.3255, lng: 103.9305 },
        subsidyInfo: "Free screening for eligible residents",
        languages: ["English", "Mandarin", "Malay"],
        rating: 4.1,
        reviews: 543
      },
      {
        id: "eastern_health_alliance",
        name: "Eastern Health Alliance Community Health Center",
        type: "Community Health",
        services: ["Preventive care", "Health screening", "Community programs"],
        address: "8 Simei Street 1, Singapore 529877",
        phone: "6788-9000",
        website: "eha.org.sg",
        waitTime: "1-2 weeks",
        operatingHours: "8am-6pm (Mon-Fri), 8am-1pm (Sat)",
        coordinates: { lat: 1.3432, lng: 103.9523 },
        subsidyInfo: "Community health programs, sliding scale fees",
        programs: ["Health education", "Screening drives", "Support groups"],
        rating: 4.2,
        reviews: 287
      }
    ],
  
    west: [
      {
        id: "alexandra_hospital",
        name: "Alexandra Hospital",
        type: "Public Hospital",
        services: ["Cancer screening", "Day surgery", "Specialist clinics"],
        address: "378 Alexandra Road, Singapore 159964",
        phone: "6472-2000",
        website: "ah.com.sg",
        waitTime: "2-3 weeks",
        operatingHours: "24/7 emergency, 8am-5pm clinics",
        coordinates: { lat: 1.2885, lng: 103.8007 },
        subsidyInfo: "Public hospital subsidies",
        specialties: ["Ambulatory care", "Day procedures"],
        rating: 4.2,
        reviews: 612
      },
      {
        id: "clementi_polyclinic",
        name: "Clementi Polyclinic",
        type: "Polyclinic",
        services: ["Cancer screening", "Women's health", "Health checkups"],
        address: "451 Clementi Avenue 3, #02-323, Singapore 120451",
        phone: "6355-3000",
        website: "nhgp.com.sg",
        waitTime: "3-5 days",
        operatingHours: "8am-12:30pm, 2pm-5:30pm (Mon-Fri), 8am-12:30pm (Sat)",
        coordinates: { lat: 1.3115, lng: 103.7644 },
        subsidyInfo: "Subsidized care for residents",
        languages: ["English", "Mandarin", "Malay"],
        rating: 4.0,
        reviews: 456
      },
      {
        id: "national_cancer_centre",
        name: "National Cancer Centre Singapore",
        type: "Specialist Center",
        services: ["Cancer treatment", "Screening", "Research", "Support services"],
        address: "11 Hospital Crescent, Singapore 169610",
        phone: "6436-8000",
        website: "nccs.com.sg",
        waitTime: "3-4 weeks for consultation",
        operatingHours: "8am-6pm (Mon-Fri), 8am-1pm (Sat)",
        coordinates: { lat: 1.2802, lng: 103.8353 },
        subsidyInfo: "Specialist center rates, research programs",
        specialties: ["All cancer types", "Clinical trials", "Precision medicine"],
        rating: 4.8,
        reviews: 1834
      }
    ]
  };
  
  // Support organizations and programs available Singapore-wide
  export const nationalHealthPrograms = {
    hpb: {
      name: "Health Promotion Board",
      type: "Government Agency",
      services: ["I Quit Programme", "Weight management", "Healthy eating", "Workplace wellness"],
      phone: "1800-567-2020",
      website: "hpb.gov.sg",
      programs: [
        {
          name: "I Quit Programme",
          description: "Free smoking cessation support",
          eligibility: "All smokers",
          contact: "1800-438-2000"
        },
        {
          name: "Healthier Choice Symbol",
          description: "Identify healthier food options",
          description_detail: "Look for the symbol when shopping"
        },
        {
          name: "Workplace Health Promotion",
          description: "Corporate wellness programs",
          contact: "worksite@hpb.gov.sg"
        }
      ]
    },
    
    scs: {
      name: "Singapore Cancer Society",
      type: "Non-profit Organization",
      services: ["Support groups", "Financial assistance", "Education", "Counseling"],
      phone: "6225-5655",
      website: "singaporecancersociety.org.sg",
      programs: [
        {
          name: "CanHope",
          description: "Comprehensive cancer support service",
          services: ["Counseling", "Support groups", "Practical assistance"]
        },
        {
          name: "Relay For Life",
          description: "Community fundraising and awareness event",
          when: "Annual event"
        },
        {
          name: "Financial Assistance",
          description: "Support for cancer patients in need",
          eligibility: "Means-tested"
        }
      ]
    },
  
    activesg: {
      name: "ActiveSG",
      type: "National Sports Agency",
      services: ["Sports facilities", "Fitness programs", "Swimming", "Gym access"],
      website: "myactivesg.com",
      programs: [
        {
          name: "Free Swimming",
          description: "Free access to public swimming pools",
          eligibility: "All residents"
        },
        {
          name: "Gym Access",
          description: "Affordable gym facilities island-wide",
          cost: "From $2.50 per entry"
        },
        {
          name: "Sports Programs",
          description: "Learn new sports and activities",
          locations: "Community centers and sports hubs"
        }
      ]
    }
  };
  
  // Emergency and crisis support
  export const emergencyContacts = {
    medical: {
      emergency: "995",
      description: "Police, Fire, Ambulance emergency"
    },
    health_hotline: {
      number: "1800-567-2020",
      description: "HPB Health Hotline",
      hours: "8:30am-5:30pm (Mon-Fri)"
    },
    mental_health: {
      number: "6389-2222",
      description: "Institute of Mental Health Hotline",
      hours: "24/7"
    },
    cancer_helpline: {
      number: "6225-5655",
      description: "Singapore Cancer Society",
      hours: "9am-6pm (Mon-Fri)"
    },
    suicide_prevention: {
      number: "1800-221-4444",
      description: "Samaritans of Singapore",
      hours: "24/7"
    }
  };
  
  // Health screening locations by type
  export const screeningLocations = {
    mammography: [
      {
        name: "BreastScreen Singapore",
        locations: ["Outram", "Bedok", "Jurong", "Woodlands"],
        phone: "6594-3422",
        cost: "Subsidized rates available",
        booking: "Online or phone"
      },
      {
        name: "Polyclinics with Mammography",
        locations: ["Selected polyclinics island-wide"],
        phone: "6355-3000",
        cost: "Subsidized for eligible residents"
      }
    ],
    
    cervical: [
      {
        name: "All Polyclinics",
        count: "24 locations island-wide",
        phone: "6355-3000",
        tests: ["Pap test", "HPV test"],
        cost: "Free/subsidized for eligible women"
      },
      {
        name: "Women's Clinics",
        locations: ["Private and hospital-based"],
        tests: ["Pap test", "HPV test", "Comprehensive gynecological"],
        cost: "Insurance claimable"
      }
    ],
    
    colorectal: [
      {
        name: "FIT Test - All Polyclinics",
        description: "Free FIT test for eligible residents aged 50-75",
        phone: "6355-3000",
        followup: "Colonoscopy if positive result"
      },
      {
        name: "Colonoscopy Centers",
        locations: ["Major hospitals and specialist centers"],
        description: "Direct colonoscopy screening",
        cost: "Subsidized at public hospitals"
      }
    ]
  };
  
  // Community health events and activities
  export const communityEvents = {
    regular: [
      {
        name: "Health Screening Drives",
        frequency: "Monthly at various locations",
        organizer: "Polyclinics and community centers",
        services: ["Basic health checks", "Blood pressure", "BMI", "Health education"]
      },
      {
        name: "Cancer Awareness Talks",
        frequency: "Quarterly",
        organizer: "Singapore Cancer Society",
        topics: ["Prevention", "Early detection", "Treatment options"]
      },
      {
        name: "Healthy Cooking Workshops",
        frequency: "Monthly",
        organizer: "HPB and community centers",
        focus: ["Heart-healthy recipes", "Cancer prevention diet", "Local ingredients"]
      }
    ],
    
    annual: [
      {
        name: "World Cancer Day",
        date: "February 4",
        activities: ["Awareness campaigns", "Free screenings", "Educational seminars"]
      },
      {
        name: "Pink October - Breast Cancer Awareness",
        date: "October",
        activities: ["Mammography drives", "Fundraising", "Support group meetings"]
      },
      {
        name: "Movember - Men's Health",
        date: "November",
        activities: ["Prostate cancer awareness", "Men's health screenings"]
      }
    ]
  };
  
  export default communityResources;