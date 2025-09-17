import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const stats = [
    { label: 'Current GPA', value: '3.7', icon: Award, color: 'emerald' },
    { label: 'Attendance Rate', value: '94.2%', icon: CheckCircle, color: 'blue' },
    { label: 'Completed Assignments', value: '28/30', icon: FileText, color: 'green' },
    { label: 'Upcoming Exams', value: '3', icon: AlertCircle, color: 'orange' }
  ];

  const todaySchedule = [
    { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
    { time: '09:15 - 10:15', subject: 'English Literature', teacher: 'Ms. Davis', room: 'Room 205' },
    { time: '10:30 - 11:30', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 301' },
    { time: '13:00 - 14:00', subject: 'History', teacher: 'Mr. Brown', room: 'Room 108' },
    { time: '14:15 - 15:15', subject: 'Chemistry', teacher: 'Dr. Smith', room: 'Lab 302' }
  ];

  const recentGrades = [
    { subject: 'Mathematics', assignment: 'Quiz 3', grade: 'A-', date: '2 days ago' },
    { subject: 'English Literature', assignment: 'Essay', grade: 'B+', date: '3 days ago' },
    { subject: 'Physics', assignment: 'Lab Report', grade: 'A', date: '5 days ago' },
    { subject: 'History', assignment: 'Project', grade: 'A+', date: '1 week ago' }
  ];

  const upcomingDeadlines = [
    { task: 'Chemistry Lab Report', subject: 'Chemistry', due: 'Tomorrow', priority: 'high' },
    { task: 'Math Assignment Chapter 5', subject: 'Mathematics', due: 'Friday', priority: 'medium' },
    { task: 'Literature Essay', subject: 'English', due: 'Next week', priority: 'low' },
    { task: 'Physics Project', subject: 'Physics', due: 'Next week', priority: 'medium' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your academic progress and schedule.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.subject}</p>
                    <p className="text-xs text-gray-500">{item.teacher} • {item.room}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Grades</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{grade.assignment}</p>
                    <p className="text-xs text-gray-500">{grade.subject}</p>
                    <p className="text-xs text-gray-400">{grade.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                    grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {grade.grade}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    deadline.priority === 'high' ? 'bg-red-500' :
                    deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{deadline.task}</p>
                    <p className="text-xs text-gray-500">{deadline.subject} • Due: {deadline.due}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};