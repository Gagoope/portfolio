import React from 'react';
import { 
  Users, 
  Award, 
  Calendar, 
  CheckCircle,
  FileText,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const ParentChildren: React.FC = () => {
  const children = [
    {
      id: '1',
      name: 'Jane Doe',
      studentId: 'ST001',
      class: 'Grade 10A',
      age: 15,
      gpa: 3.7,
      attendanceRate: 94.2,
      recentGrades: [
        { subject: 'Mathematics', grade: 'A-', date: '2024-01-20' },
        { subject: 'English', grade: 'B+', date: '2024-01-18' },
        { subject: 'Physics', grade: 'A', date: '2024-01-22' }
      ],
      upcomingEvents: [
        { event: 'Math Test', date: '2024-02-01' },
        { event: 'Science Fair', date: '2024-02-05' }
      ],
      teachers: [
        { name: 'Mr. Smith', subject: 'Mathematics', contact: 'john.smith@school.edu' },
        { name: 'Ms. Johnson', subject: 'English', contact: 'sarah.johnson@school.edu' },
        { name: 'Dr. Wilson', subject: 'Physics', contact: 'mike.wilson@school.edu' }
      ]
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Children</h1>
          <p className="text-gray-600 mt-2">Monitor your children's academic progress and school activities</p>
        </div>
      </div>

      {children.map((child) => (
        <div key={child.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Child Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{child.name}</h2>
                  <p className="text-gray-600">{child.class} • Student ID: {child.studentId}</p>
                  <p className="text-sm text-gray-500">Age: {child.age} years</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{child.gpa}</div>
                    <div className="text-sm text-gray-500">GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{child.attendanceRate}%</div>
                    <div className="text-sm text-gray-500">Attendance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Academic Performance */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Performance</h3>
                  
                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-emerald-50 rounded-lg p-4 text-center">
                      <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-emerald-700">{child.gpa}</div>
                      <div className="text-sm text-emerald-600">Current GPA</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-700">{child.attendanceRate}%</div>
                      <div className="text-sm text-blue-600">Attendance</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-700">B+</div>
                      <div className="text-sm text-purple-600">Avg Grade</div>
                    </div>
                  </div>

                  {/* Recent Grades */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Recent Grades</h4>
                    <div className="space-y-3">
                      {child.recentGrades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-800">{grade.subject}</div>
                              <div className="text-xs text-gray-500">{grade.date}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(grade.grade)}`}>
                            {grade.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Upcoming Events</h4>
                  <div className="space-y-3">
                    {child.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        <div>
                          <div className="text-sm font-medium text-yellow-800">{event.event}</div>
                          <div className="text-xs text-yellow-600">{event.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teachers & Contact */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Teachers & Contact</h3>
                  <div className="space-y-4">
                    {child.teachers.map((teacher, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{teacher.name}</div>
                              <div className="text-sm text-gray-500">{teacher.subject}</div>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Contact
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">{teacher.contact}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                      Schedule Parent-Teacher Meeting
                    </button>
                    <button className="w-full bg-green-50 text-green-700 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors">
                      View Detailed Report Card
                    </button>
                    <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                      Check Attendance History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};