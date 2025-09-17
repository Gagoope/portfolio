import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Filter,
  Users
} from 'lucide-react';

export const ParentAttendance: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('jane');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const children = [
    { id: 'jane', name: 'Jane Doe', class: 'Grade 10A' }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mock attendance data for the child
  const attendanceData = [
    { date: '2024-01-15', status: 'present', subject: 'Mathematics', teacher: 'Mr. Smith' },
    { date: '2024-01-16', status: 'present', subject: 'English', teacher: 'Ms. Johnson' },
    { date: '2024-01-17', status: 'late', subject: 'Physics', teacher: 'Dr. Wilson' },
    { date: '2024-01-18', status: 'present', subject: 'Chemistry', teacher: 'Dr. Brown' },
    { date: '2024-01-19', status: 'absent', subject: 'Biology', teacher: 'Dr. Lee' },
    { date: '2024-01-22', status: 'present', subject: 'Mathematics', teacher: 'Mr. Smith' },
    { date: '2024-01-23', status: 'present', subject: 'English', teacher: 'Ms. Johnson' },
    { date: '2024-01-24', status: 'present', subject: 'Physics', teacher: 'Dr. Wilson' },
    { date: '2024-01-25', status: 'present', subject: 'Chemistry', teacher: 'Dr. Brown' },
    { date: '2024-01-26', status: 'present', subject: 'Biology', teacher: 'Dr. Lee' },
    { date: '2024-01-29', status: 'present', subject: 'Mathematics', teacher: 'Mr. Smith' },
    { date: '2024-01-30', status: 'late', subject: 'English', teacher: 'Ms. Johnson' },
    { date: '2024-01-31', status: 'present', subject: 'Physics', teacher: 'Dr. Wilson' },
    { date: '2024-02-01', status: 'present', subject: 'Chemistry', teacher: 'Dr. Brown' },
    { date: '2024-02-02', status: 'present', subject: 'Biology', teacher: 'Dr. Lee' }
  ];

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(record => record.status === 'present').length;
    const late = attendanceData.filter(record => record.status === 'late').length;
    const absent = attendanceData.filter(record => record.status === 'absent').length;
    const attendanceRate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    
    return { total, present, late, absent, attendanceRate };
  };

  const stats = getAttendanceStats();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'late':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'late':
        return 'bg-yellow-500';
      case 'absent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getAttendanceForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData.filter(record => record.date === dateStr);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Child's Attendance</h1>
          <p className="text-gray-600 mt-2">Monitor your child's attendance record and patterns</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Child
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name} - {child.class}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Days</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Present</p>
              <p className="text-2xl font-bold text-green-700">{stats.present}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Late</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.late}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-emerald-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-800">Attendance Rate</p>
              <p className="text-2xl font-bold text-emerald-700">{stats.attendanceRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Attendance Calendar - {months[selectedMonth]} {selectedYear}
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dayAttendance = getAttendanceForDate(day);
              const isCurrentMonth = day.getMonth() === selectedMonth;
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`p-3 text-center text-sm border rounded-lg min-h-[80px] ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                  } ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="font-medium mb-1">{day.getDate()}</div>
                  
                  {dayAttendance.length > 0 && (
                    <div className="space-y-1">
                      {dayAttendance.slice(0, 3).map((record, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${getStatusBadgeColor(record.status)}`} />
                        </div>
                      ))}
                      {dayAttendance.length > 3 && (
                        <div className="text-xs text-gray-500">+{dayAttendance.length - 3} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.slice(-15).reverse().map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.subject}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.teacher}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Attendance Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.attendanceRate}%</div>
              <div className="text-sm text-gray-600">Overall Attendance Rate</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.attendanceRate >= 95 ? 'Excellent' : 
                 stats.attendanceRate >= 90 ? 'Good' : 
                 stats.attendanceRate >= 80 ? 'Average' : 'Needs Improvement'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.present}</div>
              <div className="text-sm text-gray-600">Days Present</div>
              <div className="text-xs text-gray-500 mt-1">Out of {stats.total} total days</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.absent}</div>
              <div className="text-sm text-gray-600">Days Absent</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.absent === 0 ? 'Perfect!' : stats.absent <= 2 ? 'Good' : 'Monitor closely'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};