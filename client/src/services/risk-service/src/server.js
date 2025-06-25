const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        service: 'singapore-risk-service',
        timestamp: new Date().toISOString()
    });
});

app.get('/ready', (req, res) => {
    res.status(200).json({ 
        status: 'ready', 
        service: 'singapore-risk-service' 
    });
});

// Singapore cancer risk calculation endpoint
app.post('/calculate-risk', async (req, res) => {
    try {
        const { age, gender, ethnicity, lifestyle, familyHistory } = req.body;
        
        console.log('Calculating risk for:', { age, gender, ethnicity });
        
        // Singapore-specific risk calculation logic
        let baseRisk = gender === 'male' ? 26.6 : 25.8; // Singapore lifetime risk
        
        // Ethnic adjustments based on Singapore health data
        if (ethnicity === 'chinese') {
            baseRisk *= 1.1; // Higher colorectal and liver cancer risk
        } else if (ethnicity === 'malay') {
            baseRisk *= 1.15; // Higher cervical cancer risk
        } else if (ethnicity === 'indian') {
            baseRisk *= 1.05; // Varied risk patterns
        }
        
        // Age adjustment
        const ageMultiplier = age > 50 ? 1.5 : age > 40 ? 1.2 : 1.0;
        baseRisk *= ageMultiplier;
        
        // Lifestyle adjustments
        if (lifestyle && lifestyle.smoking) baseRisk *= 1.3;
        if (lifestyle && lifestyle.bmi > 30) baseRisk *= 1.2;
        if (lifestyle && lifestyle.exerciseFrequency < 3) baseRisk *= 1.1;
        
        // Family history adjustment
        if (familyHistory && familyHistory.length > 0) {
            baseRisk *= 1.4;
        }
        
        const finalRisk = Math.min(Math.max(baseRisk, 5), 95);
        
        const response = {
            overallRisk: Math.round(finalRisk),
            riskLevel: finalRisk < 30 ? 'Low' : finalRisk < 60 ? 'Moderate' : 'High',
            recommendations: generateSingaporeRecommendations(ethnicity, lifestyle),
            timestamp: new Date().toISOString(),
            ethnicity: ethnicity
        };
        
        console.log('Risk calculation result:', response);
        res.json(response);
        
    } catch (error) {
        console.error('Risk calculation error:', error);
        res.status(500).json({ 
            error: 'Risk calculation failed',
            message: error.message 
        });
    }
});

function generateSingaporeRecommendations(ethnicity, lifestyle) {
    const recommendations = [];
    
    // Ethnic-specific recommendations
    if (ethnicity === 'chinese') {
        recommendations.push('Increase fiber intake with local vegetables like kai lan and spinach');
        recommendations.push('Limit processed Chinese sausages and preserved foods');
    } else if (ethnicity === 'malay') {
        recommendations.push('Regular cervical screening every 3 years');
        recommendations.push('HPV vaccination if eligible');
    } else if (ethnicity === 'indian') {
        recommendations.push('Monitor blood sugar levels regularly');
        recommendations.push('Include turmeric and other anti-inflammatory spices');
    }
    
    // Lifestyle recommendations
    if (lifestyle && lifestyle.smoking) {
        recommendations.push('Call National Quitline 1800-438-2000');
        recommendations.push('Visit I Quit 28-Day Programme online');
    }
    
    if (lifestyle && lifestyle.exerciseFrequency < 3) {
        recommendations.push('Use park connectors for daily walks');
        recommendations.push('Join ActiveSG programs at community centers');
    }
    
    // General Singapore recommendations
    recommendations.push('Choose steamed over fried at hawker centers');
    recommendations.push('Look for Healthier Choice Symbol when dining out');
    
    return recommendations;
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏥 Singapore Risk Service running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});
