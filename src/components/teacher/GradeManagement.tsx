import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Save,
  Search,
  Filter
} from 'lucide-react';

export const GradeManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const classes = ['Grade 10A', 'Grade 10B', 'Grade 9A'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry'];
  
  const students = [
    { id: '1', name: 'Alice Johnson', studentId: 'ST001', grades: [
      { type: 'quiz', title: 'Quiz 1', score: 85, maxScore: 100, date: '2024-01-15' },
      { type: 'test', title: 'Mid-term Test', score: 78, maxScore: 100, date: '2024-01-20' },
      { type: 'assignment', title: 'Assignment 1', score: 92, maxScore: 100, date: '2024-01-25' }
    ]},
    { id: '2', name: 'Bob Smith', studentId: 'ST002', grades: [
      { type: 'quiz', title: 'Quiz 1', score: 72, maxScore: 100, date: '2024-01-15' },
      { type: 'test', title: 'Mid-term Test', score: 85, maxScore: 100, date: '2024-01-20' },
      { type: 'assignment', title: 'Assignment 1', score: 88, maxScore: 100, date: '2024-01-25' }
    ]},
    { id: '3', name: 'Carol Davis', studentId: 'ST003', grades: [
      { type: 'quiz', title: 'Quiz 1', score: 95, maxScore: 100, date: '2024-01-15' },
      { type: 'test', title: 'Mid-term Test', score: 92, maxScore: 100, date: '2024-01-20' },
      { type: 'assignment', title: 'Assignment 1', score: 96, maxScore: 100, date: '2024-01-25' }
    ]},
    { id: '4', name: 'David Wilson', studentId: 'ST004', grades: [
      { type: 'quiz', title: 'Quiz 1', score: 68, maxScore: 100, date: '2024-01-15' },
      { type: 'test', title: 'Mid-term Test', score: 75, maxScore: 100, date: '2024-01-20' },
      { type: 'assignment', title: 'Assignment 1', score: 82, maxScore: 100, date: '2024-01-25' }
    ]}
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLetter = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const calculateAverage = (grades: any[]) => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0);
    return Math.round(total / grades.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Grade Management</h1>
          <p className="text-gray-600 mt-2">Enter and manage student grades</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Grade</span>
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
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Students and Grades */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Average Grade</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${getGradeColor(calculateAverage(student.grades), 100)}`}>
                      {calculateAverage(student.grades)}%
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getGradeColor(calculateAverage(student.grades), 100)} bg-gray-100`}>
                      {getGradeLetter(calculateAverage(student.grades), 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.grades.map((grade, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-800">{grade.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className={`font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                          {grade.score}/{grade.maxScore}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          grade.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                          grade.type === 'test' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {grade.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="text-sm text-gray-500">{grade.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Grade</h3>
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
                  Student
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="quiz">Quiz</option>
                  <option value="test">Test</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Quiz 1, Mid-term Test"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="85"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Score
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add feedback for the student..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Grade
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