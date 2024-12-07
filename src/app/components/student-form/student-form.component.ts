import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input type="text" formControlName="firstName" class="form-input" 
                 placeholder="Entrez le prénom">
          <p *ngIf="studentForm.get('firstName')?.errors?.['required'] && 
                    studentForm.get('firstName')?.touched" 
             class="text-red-500 text-sm mt-1">
            Le prénom est requis
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input type="text" formControlName="lastName" class="form-input" 
                 placeholder="Entrez le nom">
          <p *ngIf="studentForm.get('lastName')?.errors?.['required'] && 
                    studentForm.get('lastName')?.touched" 
             class="text-red-500 text-sm mt-1">
            Le nom est requis
          </p>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" formControlName="email" class="form-input" 
               placeholder="exemple@email.com">
        <p *ngIf="studentForm.get('email')?.errors?.['required'] && 
                  studentForm.get('email')?.touched" 
           class="text-red-500 text-sm mt-1">
          L'email est requis
        </p>
        <p *ngIf="studentForm.get('email')?.errors?.['email'] && 
                  studentForm.get('email')?.touched" 
           class="text-red-500 text-sm mt-1">
          L'email n'est pas valide
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Numéro d'étudiant
        </label>
        <input type="text" formControlName="studentId" class="form-input" 
               placeholder="Ex: STU001">
        <p *ngIf="studentForm.get('studentId')?.errors?.['required'] && 
                  studentForm.get('studentId')?.touched" 
           class="text-red-500 text-sm mt-1">
          Le numéro d'étudiant est requis
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Formation</label>
        <input type="text" formControlName="course" class="form-input" 
               placeholder="Ex: Informatique">
        <p *ngIf="studentForm.get('course')?.errors?.['required'] && 
                  studentForm.get('course')?.touched" 
           class="text-red-500 text-sm mt-1">
          La formation est requise
        </p>
      </div>
      <button type="submit" 
              class="w-full btn btn-primary mt-6" 
              [disabled]="!studentForm.valid">
        {{ student ? 'Mettre à jour' : 'Ajouter' }} l'étudiant
      </button>
    </form>
  `
})
export class StudentFormComponent {
  @Input() student?: Student;
  @Output() submitStudent = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      studentId: ['', [Validators.required, Validators.pattern('^STU[0-9]{3}$')]],
      course: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.student 
        ? { ...this.studentForm.value, id: this.student.id }
        : this.studentForm.value;
      this.submitStudent.emit(studentData);
      if (!this.student) {
        this.studentForm.reset();
      }
    }
  }
}