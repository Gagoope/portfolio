export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  firstName: string;
  lastName: string;
  createdAt: string;
  parentId?: string; // For students, links to parent
  studentIds?: string[]; // For parents, links to their children
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  class: string;
  parentId: string;
  dateOfBirth: string;
  enrollmentDate: string;
}

export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  subjects: string[];
  classes: string[];
}

export interface Parent extends User {
  role: 'parent';
  studentIds: string[];
  phone: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  students: string[];
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  classes: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  teacherId: string;
  class: string;
  subject: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  type: 'assignment' | 'test' | 'exam' | 'quiz';
  title: string;
  score: number;
  maxScore: number;
  date: string;
  feedback?: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  room: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetRole: 'all' | 'students' | 'parents' | 'teachers';
}