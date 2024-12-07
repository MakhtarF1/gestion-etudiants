import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StudentListComponent } from './app/components/student-list/student-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl font-bold">Système de Gestion des Étudiants</h1>
          <p class="text-blue-100 mt-2">Gérez efficacement vos étudiants</p>
        </div>
      </header>
      <app-student-list></app-student-list>
    </div>
  `
})
export class App {}

bootstrapApplication(App);