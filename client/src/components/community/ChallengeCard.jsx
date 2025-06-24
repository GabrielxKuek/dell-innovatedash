// src/components/community/ChallengeCard.jsx
import React from 'react';
import { Users, Calendar, Trophy, Target } from 'lucide-react';

const ChallengeCard = ({ challenge, onJoin, onContinue, userProgress = null }) => {
  const isParticipating = userProgress !== null;
  const progressPercentage = userProgress || challenge.progress || 0;

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'exercise': return 'text-blue-600 bg-blue-100';
      case 'diet': return 'text-green-600 bg-green-100';
      case 'prevention': return 'text-purple-600 bg-purple-100';
      case 'mental health': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'exercise': return '🏃‍♂️';
      case 'diet': return '🥗';
      case 'prevention': return '🛡️';
      case 'mental health': return '🧘‍♀️';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{challenge.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{challenge.description}</p>
            {challenge.category && (
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded font-medium ${getCategoryColor(challenge.category)}`}>
                {challenge.category}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{progressPercentage}%</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {challenge.daysLeft} days left
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-1" />
          {challenge.participants?.toLocaleString() || 0} participants
        </div>
        {challenge.reward && (
          <div className="text-sm font-medium text-purple-600 flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            {challenge.reward}
          </div>
        )}
      </div>

      {/* Daily Goals (if available) */}
      {challenge.dailyGoal && (
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Today's Goal:</span>
            <span>{challenge.dailyGoal}</span>
          </div>
        </div>
      )}
      
      {/* Action Button */}
      <button 
        onClick={isParticipating ? onContinue : onJoin}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          isParticipating 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isParticipating ? 'Continue Challenge' : 'Join Challenge'}
      </button>
    </div>
  );
};

// src/components/community/GroupCard.jsx
import React from 'react';
import { Users, Lock, Clock, MessageCircle, Shield } from 'lucide-react';

const GroupCard = ({ group, onJoin, onViewMessages }) => {
  const getGroupTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'support': return '🤝';
      case 'education': return '📚';
      case 'survivor': return '💪';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '👥';
    }
  };

  const getMembershipStatus = (isPrivate, isMember) => {
    if (isMember) return 'member';
    if (isPrivate) return 'private';
    return 'public';
  };

  const status = getMembershipStatus(group.isPrivate, group.isMember);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{getGroupTypeIcon(group.type)}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              {group.isPrivate && (
                <Lock className="w-4 h-4 text-yellow-600" />
              )}
              {group.isVerified && (
                <Shield className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <p className="text-gray-600 text-sm mt-1">{group.description}</p>
            {group.category && (
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {group.category}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Group Stats */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {group.members?.toLocaleString() || 0} members
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Active: {group.lastActive || 'Unknown'}
        </span>
      </div>
      
      {/* Moderator Info */}
      {group.moderator && (
        <div className="text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded">
          <span className="font-medium">Moderated by:</span> {group.moderator}
          {group.moderatorCredentials && (
            <span className="text-green-600 ml-1">• {group.moderatorCredentials}</span>
          )}
        </div>
      )}

      {/* Recent Activity */}
      {group.recentMessages && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-sm text-blue-800 mb-2">
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Recent Activity</span>
          </div>
          <div className="text-xs text-blue-700">
            {group.recentMessages} new messages this week
          </div>
        </div>
      )}

      {/* Guidelines Preview */}
      {group.guidelines && (
        <div className="text-xs text-gray-600 mb-4">
          <strong>Guidelines:</strong> {group.guidelines}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        {status === 'member' ? (
          <>
            <button 
              onClick={() => onViewMessages && onViewMessages(group)}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              View Messages
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Settings
            </button>
          </>
        ) : (
          <button 
            onClick={() => onJoin && onJoin(group)}
            className={`w-full py-2 rounded-lg transition-colors text-sm font-medium ${
              group.isPrivate
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {group.isPrivate ? 'Request to Join' : 'Join Group'}
          </button>
        )}
      </div>
    </div>
  );
};

// src/components/community/EventCard.jsx
import React from 'react';
import { Calendar, MapPin, Users, Clock, Share2, Bookmark } from 'lucide-react';

const EventCard = ({ event, onRegister, onShare, onSave }) => {
  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'screening': return 'bg-red-100 text-red-800';
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'awareness': return 'bg-green-100 text-green-800';
      case 'fundraising': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'screening': return '🏥';
      case 'education': return '📚';
      case 'awareness': return '🎗️';
      case 'fundraising': return '💝';
      default: return '📅';
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-SG', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const isRegistrationOpen = () => {
    if (event.registrationDeadline) {
      return new Date(event.registrationDeadline) > new Date();
    }
    return new Date(event.date) > new Date();
  };

  const getAvailabilityColor = (spots) => {
    if (spots.includes('Unlimited') || spots.includes('Open')) return 'text-green-600';
    if (spots.includes('left') && parseInt(spots) < 10) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{getCategoryIcon(event.category)}</span>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
            <p className="text-gray-600 text-sm mt-1">by {event.organizer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onSave && onSave(event)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bookmark className="w-4 h-4 text-gray-600" />
          </button>
          <span className={`px-2 py-1 text-xs rounded font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatEventDate(event.date)} at {event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        {event.attendees && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.attendees} people interested</span>
          </div>
        )}
        <div className={`flex items-center gap-2 font-medium ${getAvailabilityColor(event.spots)}`}>
          <Clock className="w-4 h-4" />
          <span>{event.spots}</span>
        </div>
      </div>

      {/* Event Description */}
      {event.description && (
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{event.description}</p>
      )}

      {/* Special Info */}
      {event.specialInfo && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <div className="text-sm text-blue-800">
            <strong>ℹ️ Important:</strong> {event.specialInfo}
          </div>
        </div>
      )}

      {/* Cost Info */}
      {event.cost !== undefined && (
        <div className="text-sm mb-4">
          <strong>Cost:</strong> 
          <span className={`ml-1 ${event.cost === 'Free' ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
            {event.cost}
          </span>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={() => onRegister && onRegister(event)}
          disabled={!isRegistrationOpen()}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            isRegistrationOpen()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isRegistrationOpen() ? 'Register' : 'Registration Closed'}
        </button>
        <button 
          onClick={() => onShare && onShare(event)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// src/components/community/AchievementBadge.jsx
import React from 'react';
import { Star, Lock } from 'lucide-react';

const AchievementBadge = ({ achievement, size = 'normal' }) => {
  const sizeClasses = {
    small: 'p-2 text-xs',
    normal: 'p-4 text-sm',
    large: 'p-6 text-base'
  };

  const iconSizes = {
    small: 'text-lg',
    normal: 'text-3xl',
    large: 'text-4xl'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-lg border-2 text-center relative transition-all hover:scale-105 ${
      achievement.earned 
        ? 'border-yellow-300 bg-yellow-50 shadow-sm' 
        : 'border-gray-200 bg-gray-50 opacity-60'
    }`}>
      {/* Earned Badge */}
      {achievement.earned && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <Star className="w-3 h-3 fill-current" />
        </div>
      )}

      {/* Lock for unearned */}
      {!achievement.earned && achievement.locked && (
        <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full p-1">
          <Lock className="w-3 h-3" />
        </div>
      )}

      {/* Achievement Icon */}
      <div className={`${iconSizes[size]} mb-2`}>
        {achievement.icon}
      </div>

      {/* Achievement Info */}
      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
      <p className="text-gray-600 mt-1">{achievement.description}</p>
      
      {/* Progress Bar for Progressive Achievements */}
      {achievement.progress !== undefined && !achievement.earned && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
        </div>
      )}

      {/* Earned Date */}
      {achievement.earned && achievement.earnedDate && (
        <div className="mt-2 text-xs text-yellow-600 font-medium">
          ✓ Earned {new Date(achievement.earnedDate).toLocaleDateString()}
        </div>
      )}

      {/* Points Value */}
      {achievement.points && (
        <div className="mt-2 text-xs font-medium text-purple-600">
          {achievement.points} points
        </div>
      )}

      {/* Requirements */}
      {!achievement.earned && achievement.requirements && (
        <div className="mt-2 text-xs text-gray-500">
          {achievement.requirements}
        </div>
      )}
    </div>
  );
};

export { ChallengeCard, GroupCard, EventCard, AchievementBadge };