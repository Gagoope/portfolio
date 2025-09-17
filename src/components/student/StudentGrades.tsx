import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  TrendingUp, 
  Calendar,
  Filter
} from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('current');

  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History'];
  
  const grades = [
    { id: '1', subject: 'Mathematics', type: 'quiz', title: 'Quiz 1', score: 85, maxScore: 100, date: '2024-01-15', feedback: 'Good work on algebra problems' },
    { id: '2', subject: 'Mathematics', type: 'test', title: 'Mid-term Test', score: 92, maxScore: 100, date: '2024-01-20', feedback: 'Excellent understanding of concepts' },
    { id: '3', subject: 'English', type: 'assignment', title: 'Essay Assignment', score: 88, maxScore: 100, date: '2024-01-18', feedback: 'Well-structured arguments' },
    { id: '4', subject: 'Physics', type: 'lab', title: 'Lab Report 1', score: 95, maxScore: 100, date: '2024-01-22', feedback: 'Thorough analysis and conclusions' },
    { id: '5', subject: 'Chemistry', type: 'quiz', title: 'Quiz 2', score: 78, maxScore: 100, date: '2024-01-25', feedback: 'Review organic chemistry concepts' },
    { id: '6', subject: 'Biology', type: 'test', title: 'Chapter Test', score: 91, maxScore: 100, date: '2024-01-28', feedback: 'Strong grasp of cell biology' }
  ];

  const filteredGrades = grades.filter(grade => 
    selectedSubject === 'all' || grade.subject === selectedSubject
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

  const calculateGPA = () => {
    if (filteredGrades.length === 0) return 0;
    const total = filteredGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 4, 0);
    return (total / filteredGrades.length).toFixed(2);
  };

  const calculateAverage = () => {
    if (filteredGrades.length === 0) return 0;
    const total = filteredGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0);
    return Math.round(total / filteredGrades.length);
  };

  const getSubjectStats = () => {
    const subjectGrades = subjects.map(subject => {
      const subjectGrades = grades.filter(grade => grade.subject === subject);
      if (subjectGrades.length === 0) return null;
      
      const average = subjectGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / subjectGrades.length;
      return {
        subject,
        average: Math.round(average),
        gradeCount: subjectGrades.length
      };
    }).filter(Boolean);
    
    return subjectGrades;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Grades</h1>
          <p className="text-gray-600 mt-2">View your academic performance and grades</p>
        </div>
      </div>

      {/* Grade Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Current GPA</p>
              <p className="text-3xl font-bold">{calculateGPA()}</p>
            </div>
            <Award className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Average Score</p>
              <p className="text-3xl font-bold">{calculateAverage()}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Grades</p>
              <p className="text-3xl font-bold">{filteredGrades.length}</p>
            </div>
            <FileText className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current">Current Semester</option>
              <option value="previous">Previous Semester</option>
              <option value="all">All Semesters</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Subject Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSubjectStats().map((stat, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-800">{stat.subject}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    stat.average >= 90 ? 'bg-green-100 text-green-800' :
                    stat.average >= 80 ? 'bg-blue-100 text-blue-800' :
                    stat.average >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getGradeLetter(stat.average, 100)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average:</span>
                    <span className={`font-medium ${getGradeColor(stat.average, 100)}`}>
                      {stat.average}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Assignments:</span>
                    <span className="text-sm text-gray-500">{stat.gradeCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Grades</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject & Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{grade.title}</div>
                      <div className="text-sm text-gray-500">{grade.subject}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      grade.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                      grade.type === 'test' ? 'bg-purple-100 text-purple-800' :
                      grade.type === 'assignment' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {grade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                      {grade.score}/{grade.maxScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getGradeLetter(grade.score, grade.maxScore) === 'A' ? 'bg-green-100 text-green-800' :
                      getGradeLetter(grade.score, grade.maxScore) === 'B' ? 'bg-blue-100 text-blue-800' :
                      getGradeLetter(grade.score, grade.maxScore) === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getGradeLetter(grade.score, grade.maxScore)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {grade.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};