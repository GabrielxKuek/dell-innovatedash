import React, { useState } from 'react';
import { Users, Calendar, Trophy, MessageCircle, MapPin, Star, Heart, Share2 } from 'lucide-react';

const CommunityHealthFeatures = () => {
  const [activeTab, setActiveTab] = useState('challenges');

  const healthChallenges = [
    {
      id: 1,
      title: "10,000 Steps Singapore",
      description: "Walk 10k steps daily around Singapore's neighborhoods",
      participants: 2847,
      daysLeft: 23,
      progress: 65,
      reward: "SingapoRediscovers voucher",
      category: "Exercise"
    },
    {
      id: 2,
      title: "Hawker Healthy Choice",
      description: "Choose 3 healthier options at hawker centers weekly",
      participants: 1205,
      daysLeft: 12,
      progress: 40,
      reward: "HPB Healthy Living kit",
      category: "Diet"
    },
    {
      id: 3,
      title: "Screening Squad",
      description: "Complete age-appropriate cancer screenings",
      participants: 892,
      daysLeft: 89,
      progress: 80,
      reward: "Health checkup voucher",
      category: "Prevention"
    }
  ];

  const communityGroups = [
    {
      id: 1,
      name: "Breast Cancer Survivors SG",
      members: 456,
      lastActive: "2 hours ago",
      description: "Support group for breast cancer survivors in Singapore",
      isPrivate: true,
      moderator: "Dr. Sarah Lim"
    },
    {
      id: 2,
      name: "Healthy Aging 50+",
      members: 1234,
      lastActive: "30 minutes ago",
      description: "Health tips and support for active aging",
      isPrivate: false,
      moderator: "Community Health Team"
    },
    {
      id: 3,
      name: "Family Cancer Prevention",
      members: 789,
      lastActive: "1 hour ago",
      description: "Families working together for cancer prevention",
      isPrivate: false,
      moderator: "Oncology Nurse Mary"
    }
  ];

  const localEvents = [
    {
      id: 1,
      title: "Free Mammography Screening",
      date: "2025-07-05",
      time: "9:00 AM - 5:00 PM",
      location: "Toa Payoh Community Club",
      organizer: "Singapore Cancer Society",
      spots: "12 spots left",
      category: "Screening"
    },
    {
      id: 2,
      title: "Healthy Cooking Workshop",
      date: "2025-07-12",
      time: "2:00 PM - 4:00 PM",
      location: "Ang Mo Kio Library",
      organizer: "HPB Community Team",
      spots: "Open registration",
      category: "Education"
    },
    {
      id: 3,
      title: "Cancer Awareness Walk",
      date: "2025-07-20",
      time: "7:00 AM - 10:00 AM",
      location: "East Coast Park",
      organizer: "Various Cancer Support Groups",
      spots: "Unlimited",
      category: "Awareness"
    }
  ];

  const achievements = [
    { id: 1, title: "Early Bird", description: "Completed first screening on time", icon: "🌅", earned: true },
    { id: 2, title: "Health Advocate", description: "Shared health tips with 10 friends", icon: "📢", earned: true },
    { id: 3, title: "Prevention Champion", description: "Maintained healthy lifestyle for 90 days", icon: "🏆", earned: false },
    { id: 4, title: "Community Helper", description: "Supported 5 community members", icon: "🤝", earned: true },
    { id: 5, title: "Screening Streak", description: "Never missed a screening appointment", icon: "✅", earned: false }
  ];

  const ChallengeCard = ({ challenge }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{challenge.title}</h3>
          <p className="text-gray-700 text-sm mt-1">{challenge.description}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {challenge.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{challenge.progress}%</div>
          <div className="text-sm text-gray-700 font-medium">{challenge.daysLeft} days left</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-800 font-medium">Progress</span>
          <span className="text-gray-800 font-medium">{challenge.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${challenge.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-700">
          <Users className="w-4 h-4 mr-1" />
          <span className="font-medium">{challenge.participants.toLocaleString()} participants</span>
        </div>
        <div className="text-sm font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded">
          🎁 {challenge.reward}
        </div>
      </div>
      
      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        {challenge.progress > 0 ? 'Continue Challenge' : 'Join Challenge'}
      </button>
    </div>
  );

  const GroupCard = ({ group }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{group.name}</h3>
            {group.isPrivate && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">Private</span>}
          </div>
          <p className="text-gray-700 text-sm mt-1">{group.description}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
        <span className="flex items-center font-medium">
          <Users className="w-4 h-4 mr-1" />
          {group.members.toLocaleString()} members
        </span>
        <span className="font-medium">Active: {group.lastActive}</span>
      </div>
      
      <div className="text-sm text-gray-700 mb-4 font-medium">
        Moderated by: <span className="text-blue-700">{group.moderator}</span>
      </div>
      
      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
        {group.isPrivate ? 'Request to Join' : 'Join Group'}
      </button>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{event.title}</h3>
          <p className="text-gray-700 text-sm mt-1 font-medium">by {event.organizer}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {event.category}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-600" />
          <span className="font-medium">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-gray-600" />
          <span className="font-medium">{event.location}</span>
        </div>
        <div className="text-orange-700 font-bold bg-orange-50 px-2 py-1 rounded">
          {event.spots}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Register
        </button>
        <button className="px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  const AchievementBadge = ({ achievement }) => (
    <div className={`p-4 rounded-lg border-2 text-center ${
      achievement.earned 
        ? 'border-yellow-400 bg-yellow-50 shadow-sm' 
        : 'border-gray-300 bg-gray-100 opacity-70'
    }`}>
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <h4 className="font-bold text-sm text-gray-900">{achievement.title}</h4>
      <p className="text-xs text-gray-700 mt-1 font-medium">{achievement.description}</p>
      {achievement.earned && (
        <div className="mt-2 text-xs text-yellow-700 font-bold bg-yellow-200 px-2 py-1 rounded">✓ Earned</div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'challenges', label: 'Health Challenges', icon: Trophy },
            { key: 'groups', label: 'Support Groups', icon: Users },
            { key: 'events', label: 'Local Events', icon: Calendar },
            { key: 'achievements', label: 'Achievements', icon: Star }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-colors ${
                activeTab === key
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-1 gap-6">
        {activeTab === 'challenges' && (
          <div>
            <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Active Health Challenges</h2>
              <p className="text-gray-700 font-medium">Join community challenges to improve your health and win rewards</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {healthChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div>
            <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Support Groups</h2>
              <p className="text-gray-700 font-medium">Connect with others on similar health journeys</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {communityGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Upcoming Health Events</h2>
              <p className="text-gray-700 font-medium">Free health screenings, workshops, and community activities near you</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {localEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Health Achievements</h2>
              <p className="text-gray-700 font-medium">Track your progress and earn badges for healthy behaviors</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {achievements.map(achievement => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
            
            {/* Progress Summary */}
            <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Your Progress Summary</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-700">3/5</div>
                  <p className="text-sm text-gray-700 font-medium">Achievements Earned</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">87</div>
                  <p className="text-sm text-gray-700 font-medium">Community Points</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-700">14</div>
                  <p className="text-sm text-gray-700 font-medium">People Helped</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Community Impact Stats */}
      <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Community Impact</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-sm font-medium opacity-90">Active Members</p>
          </div>
          <div>
            <div className="text-2xl font-bold">2,156</div>
            <p className="text-sm font-medium opacity-90">Screenings Completed</p>
          </div>
          <div>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-sm font-medium opacity-90">Improved Health Scores</p>
          </div>
          <div>
            <div className="text-2xl font-bold">456</div>
            <p className="text-sm font-medium opacity-90">Lives Positively Impacted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHealthFeatures;