import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  BookOpen,
  User,
  MapPin
} from 'lucide-react';

export const TimetableManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [showAddModal, setShowAddModal] = useState(false);

  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];
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
    'Grade 10A': {
      Monday: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'John Smith', room: 'Room 101' },
        { time: '09:15 - 10:15', subject: 'English', teacher: 'Sarah Johnson', room: 'Room 205' },
        { time: '10:30 - 11:30', subject: 'Physics', teacher: 'Mike Davis', room: 'Lab 301' },
        { time: '11:45 - 12:45', subject: 'Chemistry', teacher: 'Emily Wilson', room: 'Lab 302' },
        { time: '13:30 - 14:30', subject: 'History', teacher: 'Robert Brown', room: 'Room 108' },
        { time: '14:45 - 15:45', subject: 'Physical Education', teacher: 'Tom Wilson', room: 'Gym' }
      ],
      Tuesday: [
        { time: '08:00 - 09:00', subject: 'English', teacher: 'Sarah Johnson', room: 'Room 205' },
        { time: '09:15 - 10:15', subject: 'Mathematics', teacher: 'John Smith', room: 'Room 101' },
        { time: '10:30 - 11:30', subject: 'Biology', teacher: 'Lisa Davis', room: 'Lab 303' },
        { time: '11:45 - 12:45', subject: 'Geography', teacher: 'Mark Johnson', room: 'Room 109' },
        { time: '13:30 - 14:30', subject: 'Art', teacher: 'Anna Smith', room: 'Art Room' },
        { time: '14:45 - 15:45', subject: 'Music', teacher: 'David Wilson', room: 'Music Room' }
      ],
      Wednesday: [
        { time: '08:00 - 09:00', subject: 'Physics', teacher: 'Mike Davis', room: 'Lab 301' },
        { time: '09:15 - 10:15', subject: 'Chemistry', teacher: 'Emily Wilson', room: 'Lab 302' },
        { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'John Smith', room: 'Room 101' },
        { time: '11:45 - 12:45', subject: 'English', teacher: 'Sarah Johnson', room: 'Room 205' },
        { time: '13:30 - 14:30', subject: 'Computer Science', teacher: 'Alex Brown', room: 'Computer Lab' },
        { time: '14:45 - 15:45', subject: 'Study Hall', teacher: 'Various', room: 'Library' }
      ],
      Thursday: [
        { time: '08:00 - 09:00', subject: 'History', teacher: 'Robert Brown', room: 'Room 108' },
        { time: '09:15 - 10:15', subject: 'Geography', teacher: 'Mark Johnson', room: 'Room 109' },
        { time: '10:30 - 11:30', subject: 'English', teacher: 'Sarah Johnson', room: 'Room 205' },
        { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'John Smith', room: 'Room 101' },
        { time: '13:30 - 14:30', subject: 'Biology', teacher: 'Lisa Davis', room: 'Lab 303' },
        { time: '14:45 - 15:45', subject: 'Physical Education', teacher: 'Tom Wilson', room: 'Gym' }
      ],
      Friday: [
        { time: '08:00 - 09:00', subject: 'Computer Science', teacher: 'Alex Brown', room: 'Computer Lab' },
        { time: '09:15 - 10:15', subject: 'Art', teacher: 'Anna Smith', room: 'Art Room' },
        { time: '10:30 - 11:30', subject: 'Music', teacher: 'David Wilson', room: 'Music Room' },
        { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'John Smith', room: 'Room 101' },
        { time: '13:30 - 14:30', subject: 'English', teacher: 'Sarah Johnson', room: 'Room 205' },
        { time: '14:45 - 15:45', subject: 'Assembly', teacher: 'Various', room: 'Auditorium' }
      ]
    }
  };

  const currentTimetable = timetable[selectedClass] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Timetable Management</h1>
          <p className="text-gray-600 mt-2">Manage class schedules and time slots</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Class Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Select Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Weekly Timetable - {selectedClass}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlots.map((timeSlot, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {timeSlot}
                  </td>
                  {days.map(day => {
                    const daySchedule = currentTimetable[day] || [];
                    const slot = daySchedule.find(s => s.time === timeSlot);
                    
                    return (
                      <td key={day} className="px-6 py-4 whitespace-nowrap">
                        {slot ? (
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-800">{slot.subject}</span>
                              <div className="flex space-x-1">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{slot.teacher}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{slot.room}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <button className="w-full h-16 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                              <Plus className="w-4 h-4 mx-auto text-gray-400" />
                            </button>
                          </div>
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

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Schedule</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select time slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="history">History</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select teacher</option>
                  <option value="john">John Smith</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="mike">Mike Davis</option>
                  <option value="emily">Emily Wilson</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Room 101"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};