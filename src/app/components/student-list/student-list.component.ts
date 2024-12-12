import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, StudentFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Ajouter un Nouvel Étudiant</h2>
        <app-student-form (submitStudent)="addStudent($event)"></app-student-form>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Liste des Étudiants</h2>
          <p class="text-gray-600">Total: {{ (students$ | async)?.length || 0 }} étudiants</p>
        </div>
        <!-- teste pour voir  -->
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let student of students$ | async" 
               class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">
                  {{student.firstName}} {{student.lastName}}
                </h3>
                <p class="text-blue-600">{{student.email}}</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{student.studentId}}
              </span>
            </div>
            <p class="text-gray-600 mt-2">Formation: {{student.course}}</p>
            <div class="mt-4 flex space-x-3">
              <button class="btn btn-primary flex-1" (click)="editStudent(student)">
                Modifier
              </button>
              <button class="btn btn-danger flex-1" (click)="deleteStudent(student.id!)">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="selectedStudent" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
        <div class="bg-white p-8 rounded-xl max-w-md w-full m-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Modifier l'Étudiant</h2>
            <button class="text-gray-500 hover:text-gray-700" 
                    (click)="selectedStudent = null">
              ✕
            </button>
          </div>
          <app-student-form 
            [student]="selectedStudent" 
            (submitStudent)="updateStudent($event)">
          </app-student-form>
        </div>
      </div>
    </div>
  `
})
export class StudentListComponent {
  private studentService = inject(StudentService);
  students$ = this.studentService.getStudents();
  selectedStudent: Student | null = null;

  addStudent(student: Student) {
    this.studentService.addStudent(student);
  }

  updateStudent(student: Student) {
    this.studentService.updateStudent(student);
    this.selectedStudent = null;
  }

  deleteStudent(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.studentService.deleteStudent(id);
    }
  }

  editStudent(student: Student) {
    this.selectedStudent = student;
  }
}