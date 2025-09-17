import React, { useState } from 'react';
import { 
  ClipboardList, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Save,
  Users
} from 'lucide-react';

export const AttendanceManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<{[key: string]: 'present' | 'absent' | 'late'}>({});

  const classes = ['Grade 10A', 'Grade 10B', 'Grade 9A'];
  
  const students = [
    { id: '1', name: 'Alice Johnson', studentId: 'ST001' },
    { id: '2', name: 'Bob Smith', studentId: 'ST002' },
    { id: '3', name: 'Carol Davis', studentId: 'ST003' },
    { id: '4', name: 'David Wilson', studentId: 'ST004' },
    { id: '5', name: 'Emily Brown', studentId: 'ST005' },
    { id: '6', name: 'Frank Miller', studentId: 'ST006' },
    { id: '7', name: 'Grace Lee', studentId: 'ST007' },
    { id: '8', name: 'Henry Taylor', studentId: 'ST008' }
  ];

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  const handleSaveAttendance = () => {
    // Save attendance logic
    alert('Attendance saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
          <p className="text-gray-600 mt-2">Mark and track student attendance</p>
        </div>
        <button 
          onClick={handleSaveAttendance}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Attendance</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Students</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Present</p>
              <p className="text-2xl font-bold text-green-700">{stats.present}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Absent</p>
              <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Late</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.late}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Student Attendance - {selectedClass}</h3>
          <p className="text-sm text-gray-600 mt-1">{selectedDate}</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.studentId}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'present')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      attendance[student.id] === 'present'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'late')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      attendance[student.id] === 'late'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                    }`}
                  >
                    Late
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'absent')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      attendance[student.id] === 'absent'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};