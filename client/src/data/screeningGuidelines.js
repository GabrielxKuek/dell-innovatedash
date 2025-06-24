// src/data/screeningGuidelines.js
// Based on Singapore Ministry of Health (MOH) and Singapore Cancer Society guidelines

export const screeningGuidelines = {
    cervical: {
      name: "Cervical Cancer Screening",
      description: "Regular screening to detect precancerous changes and early cervical cancer",
      targetPopulation: "Women aged 25-69 years who have been sexually active",
      
      ageGroups: {
        "25-29": {
          recommendedTest: "Pap test",
          frequency: 3, // years
          frequencyText: "Every 3 years",
          description: "Pap test recommended for younger women to detect cellular changes"
        },
        "30-69": {
          recommendedTest: "HPV test",
          frequency: 5, // years
          frequencyText: "Every 5 years",
          description: "HPV test is more effective for women 30 and above",
          alternativeTest: {
            name: "Pap test",
            frequency: 3,
            frequencyText: "Every 3 years if HPV test not available"
          }
        }
      },
  
      eligibilityCriteria: {
        include: [
          "Women aged 25-69 years",
          "Sexually active women",
          "Women with intact cervix"
        ],
        exclude: [
          "Women who have had total hysterectomy for benign reasons",
          "Women with life expectancy < 10 years",
          "Pregnant women (defer until 6 weeks postpartum)"
        ]
      },
  
      riskFactors: [
        "Multiple sexual partners",
        "Early age at first sexual intercourse",
        "History of sexually transmitted infections",
        "HPV infection",
        "Smoking",
        "Long-term oral contraceptive use",
        "Immunocompromised state"
      ],
  
      testTypes: {
        pap: {
          name: "Pap Test (Cervical Cytology)",
          description: "Microscopic examination of cervical cells",
          sensitivity: "60-80%",
          specificity: "95-98%",
          procedure: "Cervical cell sample collected during pelvic examination",
          results: {
            normal: "Continue routine screening",
            abnormal: "Further investigation with colposcopy or repeat testing"
          }
        },
        hpv: {
          name: "HPV DNA Test",
          description: "Detection of high-risk HPV types",
          sensitivity: "95-100%",
          specificity: "85-95%",
          procedure: "Cervical sample tested for HPV DNA",
          hpvTypes: ["HPV 16", "HPV 18", "Other high-risk types"],
          results: {
            negative: "Continue routine screening",
            positive: "Reflex cytology or colposcopy depending on protocol"
          }
        }
      },
  
      locations: [
        "All 24 polyclinics island-wide",
        "Women's health clinics",
        "Private gynecology practices",
        "Hospital outpatient clinics"
      ],
  
      cost: {
        polyclinic: {
          citizens: "Free for eligible women",
          residents: "Subsidized rates",
          eligibility: "Women aged 25-69 with valid NRIC"
        },
        private: {
          range: "$50-150",
          insurance: "Many insurance plans cover screening",
          medisave: "Can use Medisave for certain tests"
        }
      },
  
      followUp: {
        normal: "Continue routine screening as per age group",
        abnormal: "Colposcopy within 4-6 weeks",
        hpvPositive: "Repeat test in 12 months or immediate colposcopy"
      }
    },
  
    breast: {
      name: "Breast Cancer Screening",
      description: "Regular mammography to detect early breast cancer",
      targetPopulation: "Women aged 40-69 years",
  
      ageGroups: {
        "40-49": {
          recommendedTest: "Mammography",
          frequency: 2, // years
          frequencyText: "Every 2 years",
          description: "Biennial screening for women in their 40s",
          considerations: "Higher breast density may affect accuracy"
        },
        "50-69": {
          recommendedTest: "Mammography",
          frequency: 2, // years
          frequencyText: "Every 2 years",
          description: "Standard biennial screening for this age group",
          effectiveness: "Most effective age group for screening"
        }
      },
  
      eligibilityCriteria: {
        include: [
          "Women aged 40-69 years",
          "Asymptomatic women",
          "Women at average risk"
        ],
        exclude: [
          "Women with current breast symptoms",
          "Women already under specialist care",
          "Pregnant or breastfeeding women"
        ],
        highRisk: [
          "BRCA1/BRCA2 gene mutations",
          "Strong family history",
          "Previous chest radiation",
          "Personal history of breast cancer"
        ]
      },
  
      riskFactors: {
        nonModifiable: [
          "Age (risk increases with age)",
          "Gender (female)",
          "Family history of breast/ovarian cancer",
          "Genetic mutations (BRCA1, BRCA2)",
          "Personal history of breast disease",
          "Early menarche, late menopause"
        ],
        modifiable: [
          "Hormone replacement therapy",
          "Alcohol consumption",
          "Obesity (postmenopausal)",
          "Physical inactivity",
          "Late pregnancy or nulliparity"
        ]
      },
  
      testTypes: {
        mammography: {
          name: "Mammography",
          description: "Low-dose X-ray examination of the breast",
          types: ["2D Digital Mammography", "3D Tomosynthesis (where available)"],
          sensitivity: "85-90%",
          specificity: "90-95%",
          procedure: "Breast compression and X-ray imaging",
          duration: "15-20 minutes"
        },
        clinicalExam: {
          name: "Clinical Breast Examination",
          description: "Physical examination by healthcare provider",
          frequency: "Annual",
          sensitivity: "40-69%",
          role: "Adjunct to mammography, not replacement"
        },
        selfExam: {
          name: "Breast Self-Examination",
          description: "Self-examination for breast awareness",
          frequency: "Monthly",
          role: "Breast awareness, not screening tool",
          instruction: "Know your normal breast tissue"
        }
      },
  
      locations: [
        {
          name: "BreastScreen Singapore",
          locations: ["Outram", "Bedok", "Jurong", "Woodlands"],
          type: "Mobile and fixed screening units",
          booking: "Online at breastscreen.com.sg or phone 6594-3422"
        },
        {
          name: "Polyclinics with Mammography",
          count: "Selected polyclinics",
          booking: "Through polyclinic appointment system"
        },
        {
          name: "Hospital Radiology Departments",
          locations: "All major hospitals",
          type: "Fixed units with specialist radiologists"
        },
        {
          name: "Private Imaging Centers",
          locations: "Island-wide",
          features: "Often same-day results, premium service"
        }
      ],
  
      cost: {
        breastScreen: {
          citizens: "Free for eligible women aged 50-69",
          subsidized: "Subsidized rates for 40-49 and 70+",
          eligibility: "Singapore citizens and permanent residents"
        },
        polyclinic: {
          subsidized: "Subsidized rates for residents",
          range: "$50-100"
        },
        private: {
          range: "$150-400",
          insurance: "Most insurance plans cover screening",
          medisave: "Can use Medisave"
        }
      },
  
      results: {
        normal: "BI-RADS 1-2: Continue routine screening",
        benign: "BI-RADS 3: Short-term follow-up in 6 months",
        suspicious: "BI-RADS 4-5: Tissue sampling required",
        followUp: "Results typically available within 1-2 weeks"
      }
    },
  
    colorectal: {
      name: "Colorectal Cancer Screening",
      description: "Regular screening to detect colorectal cancer and precancerous polyps",
      targetPopulation: "Adults aged 50-75 years",
  
      ageGroups: {
        "50-75": {
          recommendedTest: "FIT (Faecal Immunochemical Test)",
          frequency: 1, // year
          frequencyText: "Annually",
          description: "Annual FIT test is the primary screening method",
          alternativeTests: [
            "Colonoscopy every 10 years",
            "CT colonography every 5 years (if available)"
          ]
        }
      },
  
      eligibilityCriteria: {
        include: [
          "Adults aged 50-75 years",
          "Average risk individuals",
          "Asymptomatic persons"
        ],
        exclude: [
          "Persons with symptoms (bleeding, change in bowel habits)",
          "Family history of hereditary colorectal cancer syndromes",
          "Personal history of colorectal cancer or adenomas",
          "Inflammatory bowel disease"
        ],
        highRisk: [
          "Family history of colorectal cancer",
          "Personal history of adenomatous polyps",
          "Inflammatory bowel disease",
          "Hereditary cancer syndromes (FAP, HNPCC)"
        ]
      },
  
      riskFactors: {
        nonModifiable: [
          "Age (>50 years)",
          "Family history of colorectal cancer",
          "Personal history of polyps or IBD",
          "Genetic syndromes",
          "Type 2 diabetes"
        ],
        modifiable: [
          "Diet high in red and processed meat",
          "Low fiber diet",
          "Smoking",
          "Heavy alcohol consumption",
          "Obesity",
          "Physical inactivity"
        ]
      },
  
      testTypes: {
        fit: {
          name: "Faecal Immunochemical Test (FIT)",
          description: "Detection of hidden blood in stool",
          sensitivity: "70-90% for cancer",
          specificity: "90-95%",
          procedure: "Home collection of stool sample",
          advantages: [
            "Non-invasive",
            "No dietary restrictions",
            "High patient acceptance",
            "Cost-effective"
          ],
          limitations: [
            "Does not detect all polyps",
            "False positives possible",
            "Requires annual testing"
          ]
        },
        colonoscopy: {
          name: "Colonoscopy",
          description: "Direct visualization of entire colon",
          sensitivity: ">95% for cancer and large polyps",
          specificity: ">95%",
          frequency: "Every 10 years if normal",
          advantages: [
            "Most sensitive test",
            "Can remove polyps during procedure",
            "Less frequent testing"
          ],
          limitations: [
            "Invasive procedure",
            "Requires bowel preparation",
            "Small risk of complications",
            "More expensive"
          ]
        }
      },
  
      locations: {
        fit: [
          "All 24 polyclinics island-wide",
          "Family medicine clinics",
          "Some community health centers"
        ],
        colonoscopy: [
          "Hospital endoscopy centers",
          "Specialist gastroenterology clinics",
          "Day surgery centers"
        ]
      },
  
      cost: {
        fit: {
          polyclinic: "Free for eligible residents aged 50-75",
          eligibility: "Singapore citizens and permanent residents",
          private: "$20-50"
        },
        colonoscopy: {
          public: "Subsidized rates at public hospitals",
          range: "$800-2000 (subsidized)",
          private: "$1500-4000",
          insurance: "Most insurance plans cover",
          medisave: "Can use Medisave for procedure"
        }
      },
  
      followUp: {
        fitNegative: "Continue annual FIT testing",
        fitPositive: "Colonoscopy within 3 months",
        colonoscopyNormal: "Repeat in 10 years",
        polypsFound: "Follow-up based on polyp characteristics"
      }
    },
  
    prostate: {
      name: "Prostate Cancer Screening",
      description: "PSA testing for early detection of prostate cancer",
      targetPopulation: "Men aged 50+ years (or 45+ if high risk)",
      
      note: "Prostate cancer screening is controversial - shared decision making recommended",
  
      ageGroups: {
        "50-70": {
          recommendedApproach: "Shared decision making",
          tests: ["PSA blood test", "Digital rectal examination"],
          frequency: "1-2 years if testing chosen",
          description: "Individual risk-benefit discussion required"
        }
      },
  
      eligibilityCriteria: {
        include: [
          "Men aged 50-70 years",
          "Men aged 45+ with family history",
          "African American men aged 45+",
          "Men with life expectancy >10 years"
        ],
        exclude: [
          "Men with limited life expectancy",
          "Men who would not accept treatment",
          "Asymptomatic men >70 years"
        ]
      },
  
      riskFactors: [
        "Age (risk increases after 50)",
        "Family history of prostate cancer",
        "African ethnicity",
        "Genetic factors (BRCA2 mutations)",
        "Diet high in saturated fat"
      ],
  
      testTypes: {
        psa: {
          name: "Prostate Specific Antigen (PSA)",
          description: "Blood test measuring PSA levels",
          normalRange: "<4.0 ng/mL (varies by age)",
          limitations: [
            "Can be elevated in benign conditions",
            "Some cancers may not elevate PSA",
            "False positives common"
          ]
        },
        dre: {
          name: "Digital Rectal Examination",
          description: "Physical examination of prostate",
          limitations: [
            "Only detects posterior/lateral tumors",
            "Subjective examination",
            "Low sensitivity for early cancer"
          ]
        }
      },
  
      locations: [
        "All polyclinics",
        "Urology clinics",
        "Family medicine practices",
        "Men's health centers"
      ],
  
      cost: {
        polyclinic: "Subsidized rates for residents",
        psa: "$30-80",
        consultation: "Standard consultation fees apply"
      },
  
      followUp: {
        normalPSA: "Continue routine monitoring if chosen",
        elevatedPSA: "Urology referral for further evaluation",
        risksVsBenefits: "Ongoing discussion about continuing screening"
      }
    },
  
    lung: {
      name: "Lung Cancer Screening",
      description: "Low-dose CT screening for high-risk individuals",
      targetPopulation: "High-risk smokers aged 55-74 years",
      
      note: "Not routinely recommended in Singapore - limited evidence in Asian populations",
  
      eligibilityCriteria: {
        include: [
          "Age 55-74 years",
          "30+ pack-year smoking history",
          "Current smoker or quit within 15 years",
          "Good performance status"
        ],
        exclude: [
          "Significant comorbidities",
          "Unable to undergo curative treatment",
          "Unwilling to undergo surgery if needed"
        ]
      },
  
      testType: {
        name: "Low-dose computed tomography (LDCT)",
        frequency: "Annual",
        description: "Specialized CT scan with reduced radiation"
      },
  
      availability: "Limited availability in Singapore - specialist consultation required",
      
      locations: [
        "Selected hospitals with thoracic programs",
        "Specialist lung cancer centers"
      ],
  
      considerations: [
        "High false positive rates",
        "Radiation exposure",
        "Cost-effectiveness unclear in Asian populations",
        "Smoking cessation remains priority"
      ]
    }
  };
  
  // Screening reminders and intervals
  export const screeningIntervals = {
    cervical: {
      "25-29": { test: "Pap", years: 3 },
      "30-69": { test: "HPV", years: 5, alternative: { test: "Pap", years: 3 } }
    },
    breast: {
      "40-69": { test: "Mammography", years: 2 }
    },
    colorectal: {
      "50-75": { test: "FIT", years: 1, alternative: { test: "Colonoscopy", years: 10 } }
    },
    prostate: {
      "50-70": { test: "PSA", years: 1, note: "Shared decision making required" }
    }
  };
  
  // Quality indicators for screening programs
  export const qualityIndicators = {
    cervical: {
      targetCoverage: "70%",
      currentCoverage: "45.4%",
      targetGroup: "Women aged 25-74",
      lastSurvey: "National Population Health Survey 2023"
    },
    breast: {
      targetCoverage: "65%",
      currentCoverage: "52.3%",
      targetGroup: "Women aged 40-69",
      lastSurvey: "National Population Health Survey 2023"
    },
    colorectal: {
      targetCoverage: "60%",
      currentCoverage: "41.7%",
      targetGroup: "Adults aged 50-74",
      lastSurvey: "National Population Health Survey 2023"
    }
  };
  
  // Screening program contacts and resources
  export const screeningResources = {
    generalInfo: {
      moh: {
        website: "moh.gov.sg",
        phone: "1800-567-2020",
        description: "Ministry of Health general enquiries"
      },
      hpb: {
        website: "hpb.gov.sg",
        phone: "1800-567-2020",
        description: "Health Promotion Board screening information"
      }
    },
    
    specificPrograms: {
      breastScreen: {
        website: "breastscreen.com.sg",
        phone: "6594-3422",
        description: "National breast screening program"
      },
      polyclinicScreening: {
        website: "nhgp.com.sg",
        phone: "6355-3000",
        description: "Polyclinic screening services"
      },
      cancerSociety: {
        website: "singaporecancersociety.org.sg",
        phone: "6225-5655",
        description: "Cancer education and support"
      }
    }
  };
  
  export default screeningGuidelines;