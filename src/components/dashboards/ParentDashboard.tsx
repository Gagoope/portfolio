import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const children = [
    { 
      name: 'Jane Doe', 
      class: 'Grade 10A', 
      gpa: '3.7', 
      attendance: '94.2%',
      recentGrade: 'A-'
    }
  ];

  const recentActivities = [
    { child: 'Jane Doe', activity: 'Submitted Math Assignment', time: '2 hours ago', type: 'success' },
    { child: 'Jane Doe', activity: 'Attended English Class', time: '1 day ago', type: 'info' },
    { child: 'Jane Doe', activity: 'Received A- in Physics Quiz', time: '2 days ago', type: 'success' },
    { child: 'Jane Doe', activity: 'Parent-Teacher Meeting Scheduled', time: '3 days ago', type: 'warning' }
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Conference', date: 'Tomorrow', type: 'meeting' },
    { event: 'Science Fair', date: 'Next week', type: 'event' },
    { event: 'Monthly Report Card', date: 'Next week', type: 'report' },
    { event: 'Math Competition', date: 'In 2 weeks', type: 'event' }
  ];

  const announcements = [
    { title: 'School Holiday Notice', content: 'School will be closed next Monday for maintenance.', date: '2 days ago' },
    { title: 'New Library Hours', content: 'Library will be open until 6 PM starting next week.', date: '5 days ago' },
    { title: 'Parent Meeting', content: 'Monthly parent meeting scheduled for next Friday.', date: '1 week ago' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your child's academic progress and school activities.</p>
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

      {/* Children Overview */}
      <div className="grid grid-cols-1 gap-6">
        {children.map((child, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.class}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Current GPA</p>
                    <p className="text-2xl font-bold text-emerald-700">{child.gpa}</p>
                  </div>
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Attendance</p>
                    <p className="text-2xl font-bold text-blue-700">{child.attendance}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Recent Grade</p>
                    <p className="text-2xl font-bold text-purple-700">{child.recentGrade}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.child}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'event' ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">School Announcements</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-100">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};