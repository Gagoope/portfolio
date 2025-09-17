import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  User, 
  MapPin,
  Filter
} from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00 - 09:00',
    '09:15 - 10:15',
    '10:30 - 11:30',
    '11:45 - 12:45',
    '13:30 - 14:30',
    '14:45 - 15:45'
  ];

  const timetable = {
    Monday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', type: 'lecture' },
      { time: '09:15 - 10:15', subject: 'English Literature', teacher: 'Ms. Johnson', room: 'Room 205', type: 'lecture' },
      { time: '10:30 - 11:30', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 301', type: 'lab' },
      { time: '11:45 - 12:45', subject: 'Chemistry', teacher: 'Dr. Brown', room: 'Lab 302', type: 'lab' },
      { time: '13:30 - 14:30', subject: 'History', teacher: 'Mr. Davis', room: 'Room 108', type: 'lecture' },
      { time: '14:45 - 15:45', subject: 'Physical Education', teacher: 'Coach Taylor', room: 'Gymnasium', type: 'activity' }
    ],
    Tuesday: [
      { time: '08:00 - 09:00', subject: 'Biology', teacher: 'Dr. Lee', room: 'Lab 303', type: 'lab' },
      { time: '09:15 - 10:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', type: 'lecture' },
      { time: '10:30 - 11:30', subject: 'English Literature', teacher: 'Ms. Johnson', room: 'Room 205', type: 'lecture' },
      { time: '11:45 - 12:45', subject: 'Geography', teacher: 'Mr. Anderson', room: 'Room 109', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Room', type: 'activity' },
      { time: '14:45 - 15:45', subject: 'Music', teacher: 'Mr. Rodriguez', room: 'Music Room', type: 'activity' }
    ],
    Wednesday: [
      { time: '08:00 - 09:00', subject: 'Chemistry', teacher: 'Dr. Brown', room: 'Lab 302', type: 'lab' },
      { time: '09:15 - 10:15', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 301', type: 'lab' },
      { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', type: 'lecture' },
      { time: '11:45 - 12:45', subject: 'English Literature', teacher: 'Ms. Johnson', room: 'Room 205', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'Computer Science', teacher: 'Mr. Chang', room: 'Computer Lab', type: 'lab' },
      { time: '14:45 - 15:45', subject: 'Study Hall', teacher: 'Various', room: 'Library', type: 'study' }
    ],
    Thursday: [
      { time: '08:00 - 09:00', subject: 'History', teacher: 'Mr. Davis', room: 'Room 108', type: 'lecture' },
      { time: '09:15 - 10:15', subject: 'Geography', teacher: 'Mr. Anderson', room: 'Room 109', type: 'lecture' },
      { time: '10:30 - 11:30', subject: 'Biology', teacher: 'Dr. Lee', room: 'Lab 303', type: 'lab' },
      { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'English Literature', teacher: 'Ms. Johnson', room: 'Room 205', type: 'lecture' },
      { time: '14:45 - 15:45', subject: 'Physical Education', teacher: 'Coach Taylor', room: 'Gymnasium', type: 'activity' }
    ],
    Friday: [
      { time: '08:00 - 09:00', subject: 'Computer Science', teacher: 'Mr. Chang', room: 'Computer Lab', type: 'lab' },
      { time: '09:15 - 10:15', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Room', type: 'activity' },
      { time: '10:30 - 11:30', subject: 'Music', teacher: 'Mr. Rodriguez', room: 'Music Room', type: 'activity' },
      { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'English Literature', teacher: 'Ms. Johnson', room: 'Room 205', type: 'lecture' },
      { time: '14:45 - 15:45', subject: 'Assembly', teacher: 'Various', room: 'Auditorium', type: 'assembly' }
    ]
  };

  const getSubjectColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'lab': return 'bg-green-100 border-green-200 text-green-800';
      case 'activity': return 'bg-orange-100 border-orange-200 text-orange-800';
      case 'study': return 'bg-purple-100 border-purple-200 text-purple-800';
      case 'assembly': return 'bg-gray-100 border-gray-200 text-gray-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getCurrentDay = () => {
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[today.getDay()];
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const isCurrentTimeSlot = (timeSlot: string) => {
    const [start, end] = timeSlot.split(' - ');
    const currentTime = getCurrentTime();
    const currentDay = getCurrentDay();
    
    return days.includes(currentDay) && currentTime >= start && currentTime <= end;
  };

  const getTodaySchedule = () => {
    const today = getCurrentDay();
    return timetable[today] || [];
  };

  const getNextClass = () => {
    const today = getCurrentDay();
    const todaySchedule = timetable[today] || [];
    const currentTime = getCurrentTime();
    
    for (const slot of todaySchedule) {
      const [start] = slot.time.split(' - ');
      if (currentTime < start) {
        return slot;
      }
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Timetable</h1>
          <p className="text-gray-600 mt-2">View your weekly class schedule</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{getCurrentTime()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Today's Classes</p>
              <p className="text-2xl font-bold">{getTodaySchedule().length}</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Next Class</p>
              <p className="text-lg font-bold">
                {getNextClass() ? getNextClass().subject : 'No more classes'}
              </p>
              {getNextClass() && (
                <p className="text-sm text-green-200">{getNextClass().time}</p>
              )}
            </div>
            <Clock className="w-10 h-10 text-green-200" />
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Week:</span>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">Current Week</option>
            <option value="next">Next Week</option>
          </select>
        </div>
      </div>

      {/* Weekly Timetable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    day === getCurrentDay() ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
                  }`}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlots.map((timeSlot, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${
                  isCurrentTimeSlot(timeSlot) ? 'bg-blue-50' : ''
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      {timeSlot}
                    </div>
                  </td>
                  {days.map(day => {
                    const daySchedule = timetable[day] || [];
                    const slot = daySchedule.find(s => s.time === timeSlot);
                    
                    return (
                      <td key={day} className="px-6 py-4 whitespace-nowrap">
                        {slot ? (
                          <div className={`rounded-lg p-3 border ${getSubjectColor(slot.type)}`}>
                            <div className="font-medium text-sm mb-1">{slot.subject}</div>
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <User className="w-3 h-3 mr-1" />
                                <span>{slot.teacher}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{slot.room}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm">—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Detailed Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Today's Schedule - {getCurrentDay()}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {getTodaySchedule().map((slot, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                isCurrentTimeSlot(slot.time) ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    slot.type === 'lecture' ? 'bg-blue-100' :
                    slot.type === 'lab' ? 'bg-green-100' :
                    slot.type === 'activity' ? 'bg-orange-100' :
                    'bg-purple-100'
                  }`}>
                    <BookOpen className={`w-6 h-6 ${
                      slot.type === 'lecture' ? 'text-blue-600' :
                      slot.type === 'lab' ? 'text-green-600' :
                      slot.type === 'activity' ? 'text-orange-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{slot.subject}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {slot.time}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {slot.teacher}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {slot.room}
                    </div>
                  </div>
                </div>
                {isCurrentTimeSlot(slot.time) && (
                  <div className="flex-shrink-0">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};