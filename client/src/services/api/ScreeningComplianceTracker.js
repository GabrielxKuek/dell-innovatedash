// src/services/api/ScreeningComplianceTracker.js
import { screeningGuidelines } from '../../data/screeningGuidelines.js';

class ScreeningComplianceTracker {
  constructor() {
    this.guidelines = screeningGuidelines;
  }

  assessComplianceStatus(userData) {
    const assessments = [];
    const age = parseInt(userData.age);
    const gender = userData.gender;

    // Cervical cancer screening
    if (gender === 'female' && age >= 25) {
      const cervicalAssessment = this.assessCervicalScreening(userData, age);
      assessments.push(cervicalAssessment);
    }

    // Colorectal cancer screening
    if (age >= 50) {
      const colorectalAssessment = this.assessColorectalScreening(userData);
      assessments.push(colorectalAssessment);
    }

    // Breast cancer screening
    if (gender === 'female' && age >= 40) {
      const breastAssessment = this.assessBreastScreening(userData);
      assessments.push(breastAssessment);
    }

    return {
      assessments,
      overallScore: this.calculateComplianceScore(assessments),
      nextActions: this.getNextActions(assessments)
    };
  }

  assessCervicalScreening(userData, age) {
    const lastScreening = userData.lastScreening?.cervical;
    const testType = age < 30 ? 'Pap test' : 'HPV test';
    const interval = age < 30 ? 3 : 5;
    
    return {
      type: 'cervical',
      testType,
      interval: `${interval} years`,
      lastDone: lastScreening,
      status: this.getScreeningStatus(lastScreening, interval),
      nextDue: this.calculateNextDue(lastScreening, interval),
      urgency: this.getUrgency(lastScreening, interval),
      guidelines: this.guidelines.cervical
    };
  }

  assessColorectalScreening(userData) {
    const lastScreening = userData.lastScreening?.colorectal;
    
    return {
      type: 'colorectal',
      testType: 'FIT test',
      interval: '1 year',
      lastDone: lastScreening,
      status: this.getScreeningStatus(lastScreening, 1),
      nextDue: this.calculateNextDue(lastScreening, 1),
      urgency: this.getUrgency(lastScreening, 1),
      guidelines: this.guidelines.colorectal
    };
  }

  assessBreastScreening(userData) {
    const lastScreening = userData.lastScreening?.breast;
    
    return {
      type: 'breast',
      testType: 'Mammogram',
      interval: '2 years',
      lastDone: lastScreening,
      status: this.getScreeningStatus(lastScreening, 2),
      nextDue: this.calculateNextDue(lastScreening, 2),
      urgency: this.getUrgency(lastScreening, 2),
      guidelines: this.guidelines.breast
    };
  }

  getScreeningStatus(lastScreening, intervalYears) {
    if (!lastScreening) return 'never';
    
    const lastDate = new Date(lastScreening);
    const now = new Date();
    const monthsSince = (now - lastDate) / (1000 * 60 * 60 * 24 * 30);
    const intervalMonths = intervalYears * 12;
    
    if (monthsSince < intervalMonths) return 'up-to-date';
    if (monthsSince < intervalMonths + 6) return 'due-soon';
    return 'overdue';
  }

  calculateNextDue(lastScreening, intervalYears) {
    if (!lastScreening) return 'Schedule immediately';
    
    const lastDate = new Date(lastScreening);
    const nextDate = new Date(lastDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);
    
    if (nextDate <= new Date()) return 'Overdue';
    return nextDate.toLocaleDateString();
  }

  getUrgency(lastScreening, intervalYears) {
    const status = this.getScreeningStatus(lastScreening, intervalYears);
    switch (status) {
      case 'never':
      case 'overdue': return 'high';
      case 'due-soon': return 'medium';
      default: return 'low';
    }
  }

  calculateComplianceScore(assessments) {
    const upToDateCount = assessments.filter(a => a.status === 'up-to-date').length;
    return Math.round((upToDateCount / assessments.length) * 100);
  }

  getNextActions(assessments) {
    return assessments
      .filter(a => a.urgency === 'high' || a.urgency === 'medium')
      .map(a => ({
        type: a.type,
        action: `Schedule ${a.testType}`,
        urgency: a.urgency,
        locations: a.guidelines.locations,
        subsidy: a.guidelines.subsidy
      }));
  }
}

export { ScreeningComplianceTracker };