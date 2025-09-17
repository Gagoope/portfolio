import React from 'react';
import { 
  Users, 
  ClipboardList, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const stats = [
    { label: 'My Students', value: '156', icon: Users, color: 'blue' },
    { label: 'Classes Today', value: '6', icon: Calendar, color: 'green' },
    { label: 'Pending Grades', value: '12', icon: FileText, color: 'yellow' },
    { label: 'Attendance Rate', value: '92.4%', icon: CheckCircle, color: 'emerald' }
  ];

  const todaySchedule = [
    { time: '08:00 - 09:00', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
    { time: '09:15 - 10:15', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 101' },
    { time: '10:30 - 11:30', subject: 'Advanced Math', class: 'Grade 12', room: 'Room 205' },
    { time: '13:00 - 14:00', subject: 'Mathematics', class: 'Grade 9A', room: 'Room 101' },
    { time: '14:15 - 15:15', subject: 'Mathematics', class: 'Grade 9B', room: 'Room 101' }
  ];

  const recentGrades = [
    { student: 'Alice Johnson', subject: 'Mathematics', grade: 'A+', date: '2 days ago' },
    { student: 'Bob Smith', subject: 'Mathematics', grade: 'B', date: '2 days ago' },
    { student: 'Carol Davis', subject: 'Advanced Math', grade: 'A', date: '3 days ago' },
    { student: 'David Wilson', subject: 'Mathematics', grade: 'B+', date: '3 days ago' }
  ];

  const pendingTasks = [
    { task: 'Grade Math Quiz - Grade 10A', priority: 'high', due: 'Today' },
    { task: 'Prepare lesson plan for Advanced Math', priority: 'medium', due: 'Tomorrow' },
    { task: 'Parent meeting with Johnson family', priority: 'high', due: 'Friday' },
    { task: 'Submit monthly report', priority: 'low', due: 'Next week' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Good morning! Here's your teaching schedule and updates.</p>
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
                    <p className="text-xs text-gray-500">{item.class} • {item.room}</p>
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
                    <p className="text-sm font-medium text-gray-800">{grade.student}</p>
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

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};