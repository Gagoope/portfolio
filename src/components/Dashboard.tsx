import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from './Sidebar';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { TeacherDashboard } from './dashboards/TeacherDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { ParentDashboard } from './dashboards/ParentDashboard';
import { UserManagement } from './admin/UserManagement';
import { StudentManagement } from './admin/StudentManagement';
import { ClassManagement } from './admin/ClassManagement';
import { SubjectManagement } from './admin/SubjectManagement';
import { TimetableManagement } from './admin/TimetableManagement';
import { ReportsManagement } from './admin/ReportsManagement';
import { AttendanceManagement } from './teacher/AttendanceManagement';
import { GradeManagement } from './teacher/GradeManagement';
import { StudentGrades } from './student/StudentGrades';
import { StudentAttendance } from './student/StudentAttendance';
import { StudentTimetable } from './student/StudentTimetable';
import { ParentChildren } from './parent/ParentChildren';
import { ParentGrades } from './parent/ParentGrades';
import { ParentAttendance } from './parent/ParentAttendance';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      switch (user?.role) {
        case 'admin':
          return <AdminDashboard />;
        case 'teacher':
          return <TeacherDashboard />;
        case 'student':
          return <StudentDashboard />;
        case 'parent':
          return <ParentDashboard />;
        default:
          return <AdminDashboard />;
      }
    }

    // Admin routes
    if (user?.role === 'admin') {
      switch (activeTab) {
        case 'users':
          return <UserManagement />;
        case 'students':
          return <StudentManagement />;
        case 'classes':
          return <ClassManagement />;
        case 'subjects':
          return <SubjectManagement />;
        case 'timetable':
          return <TimetableManagement />;
        case 'reports':
          return <ReportsManagement />;
        default:
          return <AdminDashboard />;
      }
    }

    // Teacher routes
    if (user?.role === 'teacher') {
      switch (activeTab) {
        case 'attendance':
          return <AttendanceManagement />;
        case 'grades':
          return <GradeManagement />;
        case 'timetable':
          return <StudentTimetable />;
        default:
          return <TeacherDashboard />;
      }
    }

    // Student routes
    if (user?.role === 'student') {
      switch (activeTab) {
        case 'grades':
          return <StudentGrades />;
        case 'attendance':
          return <StudentAttendance />;
        case 'timetable':
          return <StudentTimetable />;
        default:
          return <StudentDashboard />;
      }
    }

    // Parent routes
    if (user?.role === 'parent') {
      switch (activeTab) {
        case 'children':
          return <ParentChildren />;
        case 'grades':
          return <ParentGrades />;
        case 'attendance':
          return <ParentAttendance />;
        default:
          return <ParentDashboard />;
      }
    }

    return <AdminDashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};