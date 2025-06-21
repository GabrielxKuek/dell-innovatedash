/*//////////
/// NOTE ///
- each file is one "game"
- the decisions are based on the data in these files
- each chat references one file
*/

export const chatFlows = {
  1: { // Treatment Options
    1: {
      id: 1,
      message: "Hi there! 💕 I'm here to help you understand treatment options. What would you like to chat about?",
      options: [
        { id: 'chemo', text: "Tell me about chemotherapy", nextId: 2 },
        { id: 'surgery', text: "I want to know about surgery", nextId: 3 },
        { id: 'radiation', text: "What's radiation therapy like?", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Chemotherapy can feel overwhelming at first, but you're not alone! 🌸 The medicines work to fight cancer cells throughout your body. What specifically would help you feel more prepared?",
      options: [
        { id: 'side_effects', text: "What side effects should I expect?", nextId: 5 },
        { id: 'preparation', text: "How can I prepare myself?", nextId: 6 },
        { id: 'schedule', text: "What will my schedule look like?", nextId: 7 }
      ]
    },
    3: {
      id: 3,
      message: "Surgery is often a big step, and it's natural to have questions! 💗 The goal is to remove the tumor safely. What would ease your mind right now?",
      options: [
        { id: 'types', text: "What types of surgery are there?", nextId: 8 },
        { id: 'recovery', text: "How long will recovery take?", nextId: 9 },
        { id: 'risks', text: "What are the risks I should know?", nextId: 10 }
      ]
    },
    4: {
      id: 4,
      message: "Radiation therapy uses focused energy beams - think of it as a very precise treatment! ✨ Many people find it less intimidating once they understand the process.",
      options: [
        { id: 'process', text: "Walk me through what happens", nextId: 11 },
        { id: 'side_effects', text: "Will I feel sick afterwards?", nextId: 12 },
        { id: 'duration', text: "How many sessions will I need?", nextId: 13 }
      ]
    },
    5: {
      id: 5,
      message: "I understand you're worried about side effects - that's completely normal! 🤗 Common ones include feeling tired, some nausea, and yes, hair changes. But remember, these are temporary and there are ways to manage them!",
      options: [
        { id: 'manage', text: "How can I manage these better?", nextId: 14 },
        { id: 'restart', text: "Ask me something else", nextId: 1 }
      ]
    },
    14: {
      id: 14,
      message: "You're being so proactive - I love that! 💪 For nausea, ginger tea and small frequent meals help. For fatigue, gentle walks when you feel up to it. And for hair loss, some people find cute scarves or hats fun to wear! Your care team will have more specific tips too.",
      options: [
        { id: 'restart', text: "Thanks! Ask about something else", nextId: 1 }
      ]
    }
  },
  
  2: { // Nutrition Guide
    1: {
      id: 1,
      message: "Hey lovely! 🥗 Nutrition can be such a game-changer during your journey. What's on your mind about eating well?",
      options: [
        { id: 'during_treatment', text: "What should I eat during treatment?", nextId: 2 },
        { id: 'boost_immunity', text: "Foods that boost my immune system?", nextId: 3 },
        { id: 'manage_symptoms', text: "I'm having trouble eating", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Smart question! 🌟 During treatment, your body is working extra hard. Think small, frequent meals with protein - like Greek yogurt with berries, or a smoothie with protein powder. Comfort foods are okay too when that's all you can manage!",
      options: [
        { id: 'meal_ideas', text: "Give me some easy meal ideas", nextId: 5 },
        { id: 'supplements', text: "Should I take supplements?", nextId: 6 },
        { id: 'restart', text: "Ask about something else", nextId: 1 }
      ]
    },
    5: {
      id: 5,
      message: "I've got you covered! 🍯 Try overnight oats with banana, scrambled eggs with avocado toast, or chicken and rice soup. Smoothies are amazing - blend whatever fruits you have with yogurt or protein powder. Keep it simple and tasty!",
      options: [
        { id: 'restart', text: "These sound great! What else?", nextId: 1 }
      ]
    }
  },

  3: { // Exercise & Recovery
    1: {
      id: 1,
      message: "Hello beautiful! 🌺 Movement can be such medicine during recovery. How are you feeling about staying active?",
      options: [
        { id: 'gentle', text: "I need very gentle exercises", nextId: 2 },
        { id: 'strength', text: "I want to build back my strength", nextId: 3 },
        { id: 'fatigue', text: "I'm too tired to exercise", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Gentle is perfect - listen to your body! 🦋 Even 5-10 minutes of stretching or slow walking counts. Chair exercises are wonderful too. The key is moving in ways that feel good, not pushing through pain.",
      options: [
        { id: 'restart', text: "That sounds doable! What else?", nextId: 1 }
      ]
    }
  },

  4: { // Side Effects
    1: {
      id: 1,
      message: "Oh sweetie, dealing with side effects is tough! 💝 But you're handling this with such strength. Which one is bothering you most right now?",
      options: [
        { id: 'nausea', text: "The nausea is really hard", nextId: 2 },
        { id: 'fatigue', text: "I'm exhausted all the time", nextId: 3 },
        { id: 'pain', text: "Managing pain", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Nausea is so draining, I hear you! 🫖 Try sipping ginger tea slowly, eating crackers before getting up, and avoiding strong smells when possible. Cold foods sometimes sit better than hot ones. Small sips and bites are your friend!",
      options: [
        { id: 'restart', text: "Thank you, that helps!", nextId: 1 }
      ]
    }
  },

  5: { // Mental Health
    1: {
      id: 1,
      message: "Hi darling! 💕 Taking care of your emotional wellbeing is just as important as everything else. How has your heart been feeling lately?",
      options: [
        { id: 'anxiety', text: "I'm feeling really anxious", nextId: 2 },
        { id: 'depression', text: "I've been feeling down", nextId: 3 },
        { id: 'coping', text: "I need better coping strategies", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Anxiety during this time is so understandable, honey. 🌸 Try the 4-7-8 breathing: breathe in for 4, hold for 7, out for 8. Gentle music, warm baths, or talking to someone who gets it can help too. You're doing better than you think! 💪",
      options: [
        { id: 'restart', text: "I'll try that. Tell me more", nextId: 1 }
      ]
    }
  },

  6: { // Financial Support
    1: {
      id: 1,
      message: "Hey there! 💗 Money worries can add so much stress to an already challenging time. Let's see how we can lighten that load for you!",
      options: [
        { id: 'insurance', text: "Help with insurance questions", nextId: 2 },
        { id: 'programs', text: "What assistance programs exist?", nextId: 3 },
        { id: 'costs', text: "Tips for managing costs", nextId: 4 }
      ]
    },
    2: {
      id: 2,
      message: "Insurance can feel like a maze! 📋 Start by calling the number on your card - ask about your benefits and what's covered. Many hospitals have financial advocates who can help you navigate this. Don't be afraid to ask questions!",
      options: [
        { id: 'restart', text: "Good to know! What else?", nextId: 1 }
      ]
    }
  },



  7: { // demo for actual
    1: {
      id: 1,
      message: "Having a great time recently? Tryna keep a good healthy life style ?~ 😍 ",
      options: [
        { text: "pretty good ~ but who are u ?", nextId: 2 },
        { text: "not so sure, hard times", nextId: 3 },
        { text: "why should I, I don't even know u", nextId: 4 },
      ]
    },
    2: {
      id: 2,
      message:"Hi ~ GREAT to hear that, I'm your personal doctor, can I share you with something ~😘",
      options: [
        { text: "wow, what do u wanna share with me?", nextId: 5 },
        { text: "Hey, I exercise a lot so don't worry, is it something interesting that I should know? ", nextId: 5 },
      ]
    },
    3: {
      id: 3,
      message:"Hi ~ so sorry to hear that, wanna share anything with me?😘",
      options: [
        { text: "Feeling down recently, can I trust you?", nextId: 4 },
        { text: "Sorry, who are u?", nextId: 4 },
      ]
    },
    4: {
      id: 4,
      message:"Hi ~ You can definitely trust me, I'm your personal doctor, can I share something with u?😘",
      options: [
        { text: "Fine, go ahead ", nextId: 5 },     
      ]
    },
    5: {
      id: 5,
      message:"Well, wanna know something about cancer? The topic seems to be a bit far but yet close~ \n Your health is my job!!",
      options: [
        { text: "Sure ~ go on", nextId: 6 },     
      ]
    },
 //------------Quiz starts from here~~~------------
    6: {
      id: 6,
      message:"Alright, Let's get started...\n How much do you know about cancer",    
      options: [
        { id: 'dontknow', text: "Honestly, not much but I know it's serious.", nextId: 7 },
        { id: 'dontcare', text: "I don't think I will get it lah, wouldn't be unlucky", nextId: 7 },
        { id: 'care', text: "It's very serious and I hope I won't get it", nextId: 7 },
      ]
    },

    7: {
      id: 7,
      message:"Actually, there is always possibility of getting cancer\nHowever, not a big deal\n\nStaright to the point..\nI'm gonna ask you a few Questions, Come on, join me ",    
      options: [
        { text: "Sounds fun", nextId: 8 },
        { text: "I'm down for this", nextId: 8 },
        { text: "errrh Okay", nextId: 8 },
      ]
    },

    8: {
      id: 8,
      message:" You step onto a magical double-decker. The top deck is a sky garden, the bottom deck is a buffet. Where do you head?",    
      options: [
        { id: '', text: "Sky garden please! Fresh air, trees…", nextId: 9 },
        { id: '', text: "Buffet of dreams?! I deserve this.", nextId: 9 },
        { id: '', text: "Nah, I just want to nap somewhere comfy", nextId: 9 },
      ]
    },

    9: {
      id: 9,
      message:"Next ~ a cat offers you a cupcake that looks… suspiciously glowing~\nWhat do you do?",    
      options: [
        { id: '', text: "No thanks", nextId: 10 },
        { id: '', text: "Just one bite", nextId: 10 },
        { id: '', text: "Not a big one, just finish up", nextId: 10 },
      ]
    },

    10: {
      id: 10,
      message:"Now, you arrive a stop called'Exercise Station'. You hear music and dancing upstairs. But your seat is so comfy...",    
      options: [
        { id: '', text: "I'm up! Time to move my body! Might meet some cool people too!", nextId: 11 },
        { id: '', text: "Maybe later... I'll just stretch a little here", nextId: 11 },
        { id: '', text: "It's okay, my thumb gets a workout scrolling TikTok anyway", nextId: 11 },
      ]
    },

    11: {
      id: 11,
      message:"Suddenly the sun shines extra bright. You reach into your bag",    
      options: [
        { id: '', text: "Got my hat and sunscreen! Safety first!", nextId: 12 },
        { id: '', text: "Only sunglasses. Hope that's enough", nextId: 12 },
        { id: '', text: "Ehh, I never burn. I want that glow!", nextId: 12 },
      ]
    },

    12: {
      id: 12,
      message:"A food truck appears with two tempting smells...",    
      options: [
        { id: '', text: "Grilled veggies on quinoa? Yes please", nextId: 13 },
        { id: '', text: "Chicken rice! Balanced enough, right?", nextId: 13 },
        { id: '', text: "Smoked sausages and bacon? Count me in!", nextId: 13 },
      ]
    },
    13: {
      id: 13,
      message:"Dinner time ~\nA robotic waiter floats by offering you a drink...",    
      options: [
        { id: '', text: "Sparkling water, please. My liver deserves a break", nextId: 14 },
        { id: '', text: "A bit of wine helps me relax", nextId: 14 },
        { id: '', text: "Alright, fresh juice looks nice", nextId: 14 },
      ]
    },

    14: {
      id: 14,
      message:"Been asked,'anyone in your family have a history of cancer?'",    
      options: [
        { id: '', text: "Yup, but not many", nextId: 15 },
        { id: '', text: "Ya, I've got a few", nextId: 15 },
        { id: '', text: "Nope, not that I know of", nextId: 15 },
        { id: '', text: "I'm adopted, so I'm not sure", nextId: 15 },
      ]
    },

    15: {
      id: 15,
      message:" Now, You pass a glowing vending machine labeled “Free Health Check-Ups",    
      options: [
        { id: '', text: "Let'sss go, All gain, no pain", nextId: 17 },
        { id: '', text: "Hmm... Maybe next time, I'm good", nextId: 16 },
        { id: '', text: "Never like it", nextId: 17 },
      ]
    },

    16: {
      id: 16,
      message:"Would you come back by any chance?",    
      options: [
        { id: '', text: "Ya, probabily", nextId: 17 },
        { id: '', text: "Maybe, if somebody ask", nextId: 17 },
        { id: '', text: "errh..Depends on my mood", nextId: 17 },
      ]
    },

    17: {
      id: 17,
      message:"After a satisfying meal, you enter a quiet zone. You see beds and relaxing music\n What now?",    
      options: [
        { id: '', text: "Time for a proper nap", nextId: 21 },
        { id: '', text: "I'll lie down but keep scrolling Tiktok for a WHILE", nextId: 19 },
      ]
    },

    19: {
      id: 19,
      message:"Now is 12:00pm, should I sleep now?",    
      options: [
        { id: '', text: "A talking cigarette hops on board. 'Miss me?'", nextId: 20 },
        { id: '', text: "Time for supper", nextId: 21 },
        { id: '', text: "Start sleeping ", nextId: 21 },
      ]
    },

    20: {
      id: 20,
      message:"'Just one cigarette should be fine'",    
      options: [
        { id: '', text: "fine", nextId: 21 },
        { id: '', text: "Nah, forget it", nextId: 21 },
      ]
    },

    21: {
      id: 21,
      message:"A snack box appears during tea time, what do you expect?",    
      options: [
        { id: '', text: "box of chocolate is the best", nextId: 22 },
        { id: '', text: "Some nuts sounds good", nextId: 22 },
        { id: '', text: "Fruits are what I need ", nextId: 22 },
      ]
    },

     22: {
      id: 22,
      message:"ENNND(to be continued)", //For Now

    },   
  }
};