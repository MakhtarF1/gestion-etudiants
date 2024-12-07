import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);

  constructor() {
    // Initialize with some sample data
    this.addStudent({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      studentId: 'STU001',
      course: 'Computer Science'
    });
  }

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student): void {
    const newStudent = {
      ...student,
      id: this.students.length + 1
    };
    this.students.push(newStudent);
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.studentsSubject.next([...this.students]);
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }
}