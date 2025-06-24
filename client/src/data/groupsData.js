// src/data/groupsData.js - Enhanced with new features
export const groupsData = [
  {
    id: 1,
    name: "Breast Cancer Assessment",
    lastMessage: "AI-powered breast cancer risk evaluation",
    avatar: "🎗️",
    category: "cancer-screening",
    description: "Get personalized breast cancer risk assessment based on your health profile",
    estimatedTime: "5-7 minutes",
    features: ["AI Risk Analysis", "Singapore Guidelines", "Local Resources"]
  },
  {
    id: 2,
    name: "Cervical Cancer Screening",
    lastMessage: "Cervical cancer risk and screening guidance",
    avatar: "🩺",
    category: "cancer-screening", 
    description: "Learn about cervical cancer risk factors and screening recommendations",
    estimatedTime: "4-6 minutes",
    features: ["Pap Test Info", "HPV Screening", "Age-based Guidelines"]
  },
  {
    id: 3,
    name: "Colorectal Cancer Check",
    lastMessage: "Comprehensive colorectal cancer risk assessment",
    avatar: "🔬",
    category: "cancer-screening",
    description: "Evaluate your colorectal cancer risk with lifestyle and genetic factors",
    estimatedTime: "6-8 minutes",
    features: ["FIT Test Info", "Lifestyle Assessment", "Family History"]
  },
  {
    id: 4,
    name: "Singapore Cancer Society Info",
    lastMessage: "Learn about SCS services and support",
    avatar: "🏥",
    category: "information",
    description: "Discover support services, programs, and resources available in Singapore",
    estimatedTime: "3-5 minutes",
    features: ["Support Services", "Educational Programs", "Contact Information"]
  },
  {
    id: 5,
    name: "Prevention Lifestyle Guide",
    lastMessage: "Personalized cancer prevention strategies",
    avatar: "💪",
    category: "prevention",
    description: "Get customized recommendations for reducing cancer risk through lifestyle changes",
    estimatedTime: "8-10 minutes",
    features: ["Diet Recommendations", "Exercise Plans", "Local Resources"]
  },
  {
    id: 6,
    name: "Health Screening Planner",
    lastMessage: "Plan your cancer screening schedule",
    avatar: "📅",
    category: "planning",
    description: "Create a personalized screening schedule based on your age, gender, and risk factors",
    estimatedTime: "5-7 minutes",
    features: ["Screening Calendar", "Reminder Setup", "Clinic Finder"]
  },
  {
    id: 7,
    name: "AI Cancer Risk Assessment",
    lastMessage: "Comprehensive AI-powered health analysis",
    avatar: "🤖",
    isAIQuiz: true,
    category: "ai-assessment",
    description: "Advanced AI assessment combining all cancer types with personalized recommendations",
    estimatedTime: "10-15 minutes",
    features: ["Multi-cancer Analysis", "Ethnicity Adjustments", "Singapore Health Data"],
    isPremium: false,
    difficulty: "Comprehensive"
  },
  {
    id: 8,
    name: "Family Risk Assessment",
    lastMessage: "Evaluate hereditary cancer risks",
    avatar: "👨‍👩‍👧‍👦",
    category: "genetics",
    description: "Assess cancer risk based on family history and genetic predisposition",
    estimatedTime: "7-9 minutes",
    features: ["Genetic Risk Factors", "Family Tree Analysis", "Hereditary Counseling"]
  },
  {
    id: 9,
    name: "Workplace Health Check",
    lastMessage: "Occupation-based cancer risk evaluation",
    avatar: "💼",
    category: "occupational",
    description: "Identify workplace-related cancer risks and prevention strategies",
    estimatedTime: "6-8 minutes",
    features: ["Occupational Risks", "Safety Guidelines", "Corporate Wellness"]
  },
  {
    id: 10,
    name: "Young Adult Health",
    lastMessage: "Cancer awareness for 18-35 age group",
    avatar: "🌟",
    category: "age-specific",
    description: "Early cancer detection and prevention strategies for young adults",
    estimatedTime: "5-7 minutes",
    features: ["Early Warning Signs", "Lifestyle Prevention", "Youth Programs"],
    targetAgeGroup: "18-35"
  }
];

// Enhanced categories for better organization
export const groupCategories = {
  "cancer-screening": {
    name: "Cancer Screening",
    description: "Risk assessments and screening information",
    icon: "🔬",
    color: "red"
  },
  "prevention": {
    name: "Prevention & Lifestyle", 
    description: "Lifestyle recommendations and prevention strategies",
    icon: "💪",
    color: "green"
  },
  "ai-assessment": {
    name: "AI Assessment",
    description: "Advanced AI-powered comprehensive analysis",
    icon: "🤖", 
    color: "blue"
  },
  "information": {
    name: "Information & Support",
    description: "Educational resources and support services",
    icon: "ℹ️",
    color: "blue"
  },
  "planning": {
    name: "Health Planning",
    description: "Screening schedules and health planning tools",
    icon: "📅",
    color: "purple"
  },
  "genetics": {
    name: "Genetic Assessment",
    description: "Family history and genetic risk evaluation",
    icon: "🧬",
    color: "orange"
  },
  "occupational": {
    name: "Occupational Health",
    description: "Workplace-related health risks and safety",
    icon: "💼",
    color: "gray"
  },
  "age-specific": {
    name: "Age-Specific",
    description: "Targeted assessments for specific age groups",
    icon: "🎯",
    color: "indigo"
  }
};

// Quick action items for dashboard
export const quickHealthActions = [
  {
    id: "check_screening",
    title: "Check Screening Status",
    description: "See which screenings you're due for",
    icon: "📋",
    action: "screening-check",
    priority: "high"
  },
  {
    id: "risk_assessment",
    title: "Quick Risk Check",
    description: "5-minute cancer risk assessment",
    icon: "⚡",
    action: "quick-assessment", 
    priority: "medium"
  },
  {
    id: "book_screening",
    title: "Book Screening",
    description: "Find and book nearby screening appointments",
    icon: "📞",
    action: "book-appointment",
    priority: "high"
  },
  {
    id: "prevention_tips",
    title: "Daily Prevention Tips",
    description: "Get today's cancer prevention recommendation",
    icon: "💡",
    action: "daily-tip",
    priority: "low"
  }
];

// Singapore-specific health resources
export const singaporeHealthResources = [
  {
    id: "scs",
    name: "Singapore Cancer Society",
    type: "Support Organization",
    website: "singaporecancersociety.org.sg",
    phone: "6225-5655",
    services: ["Support groups", "Education", "Financial assistance", "Volunteer programs"],
    description: "Leading cancer support organization in Singapore"
  },
  {
    id: "hpb", 
    name: "Health Promotion Board",
    type: "Government Agency",
    website: "hpb.gov.sg",
    phone: "1800-567-2020",
    services: ["Health education", "Screening programs", "Lifestyle interventions", "Workplace wellness"],
    description: "National health promotion and disease prevention"
  },
  {
    id: "moh",
    name: "Ministry of Health",
    type: "Government Ministry", 
    website: "moh.gov.sg",
    services: ["Health policies", "Healthcare subsidies", "Medical regulations", "Public health"],
    description: "Singapore's health ministry and healthcare policies"
  },
  {
    id: "polyclinics",
    name: "Polyclinics Network",
    type: "Primary Healthcare",
    services: ["Cancer screening", "Health checkups", "Vaccinations", "Chronic disease management"],
    description: "Subsidized primary healthcare across Singapore",
    locations: ["Island-wide", "24 locations", "Extended hours available"]
  }
];

// Cancer statistics for Singapore (based on latest data)
export const singaporeCancerStats = {
  overall: {
    lifetimeRisk: {
      male: 26.6,
      female: 25.8,
      description: "Percentage chance of developing cancer by age 75"
    },
    leadingCause: {
      rank: 1,
      description: "Cancer is the leading cause of death in Singapore",
      percentage: 27.1
    }
  },
  byType: {
    colorectal: {
      prevalence: 16.2,
      rank: 1,
      genderDifference: "Most common in males, 2nd in females",
      ageStandardizedRate: { male: 37.9, female: 27.0 }
    },
    breast: {
      prevalence: 14.8,
      rank: 2,
      ageStandardizedRate: { female: 63.7 },
      screeningRate: 52.3
    },
    lung: {
      prevalence: 12.3,
      rank: 3,
      smokingRelated: true,
      ageStandardizedRate: { male: 35.4, female: 18.9 }
    },
    liver: {
      prevalence: 8.7,
      rank: 4,
      riskFactors: ["Hepatitis B", "Alcohol", "Fatty liver disease"]
    },
    cervical: {
      prevalence: 6.8,
      rank: 10,
      ageStandardizedRate: { female: 6.8 },
      screeningRate: 45.4,
      preventable: true
    }
  },
  demographics: {
    ethnicity: {
      chinese: { percentage: 74.3, higherRisk: ["colorectal", "liver"] },
      malay: { percentage: 13.5, higherRisk: ["cervical", "breast"] },
      indian: { percentage: 9.0, riskProfile: "varies by cancer type" },
      others: { percentage: 3.2 }
    },
    ageGroups: {
      "0-39": { percentage: 8.2, description: "Lower incidence, focus on prevention" },
      "40-59": { percentage: 35.4, description: "Increasing risk, screening important" },
      "60-79": { percentage: 45.1, description: "Peak incidence period" },
      "80+": { percentage: 11.3, description: "Highest risk group" }
    }
  },
  prevention: {
    preventablePercentage: "30-50%",
    keyFactors: [
      { factor: "Smoking", impact: "Highest", preventable: true },
      { factor: "Diet", impact: "High", preventable: true },
      { factor: "Physical activity", impact: "Medium", preventable: true },
      { factor: "Alcohol", impact: "Medium", preventable: true },
      { factor: "Obesity", impact: "Medium", preventable: true }
    ]
  },
  screening: {
    cervical: {
      targetAge: "25-69",
      frequency: "3-5 years",
      currentRate: 45.4,
      targetRate: 70
    },
    breast: {
      targetAge: "40-69", 
      frequency: "2 years",
      currentRate: 52.3,
      targetRate: 65
    },
    colorectal: {
      targetAge: "50-75",
      frequency: "1 year (FIT)",
      currentRate: 41.7,
      targetRate: 60
    }
  }
};

// Health tips specifically for Singapore context
export const singaporeHealthTips = [
  {
    category: "Diet",
    tips: [
      "Choose steamed over fried options at hawker centers",
      "Request for less salt and oil when ordering",
      "Opt for brown rice instead of white rice",
      "Include more local fruits like papaya and guava (high in antioxidants)",
      "Look for Healthier Choice Symbol when grocery shopping"
    ]
  },
  {
    category: "Exercise",
    tips: [
      "Use park connectors for walking and cycling",
      "Take stairs instead of escalators in MRT stations",
      "Join ActiveSG sports programs and facilities",
      "Exercise early morning or evening to avoid heat",
      "Use community center fitness facilities"
    ]
  },
  {
    category: "Lifestyle",
    tips: [
      "Manage work stress common in Singapore's fast-paced environment",
      "Get adequate sleep despite busy schedules",
      "Stay hydrated in tropical climate",
      "Limit air-conditioned environment exposure when possible",
      "Take regular breaks from screen time"
    ]
  },
  {
    category: "Healthcare",
    tips: [
      "Utilize subsidized screening at polyclinics",
      "Keep track of screening schedules",
      "Use HealthHub app for health records",
      "Know your family medical history",
      "Build relationship with family doctor"
    ]
  }
];

export default groupsData;