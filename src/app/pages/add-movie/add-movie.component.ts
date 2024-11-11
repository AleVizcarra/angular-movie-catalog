import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IndexService } from '../../services/index.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent {
  movie = {
    title: '',
    synopsis: '',
    cover: '',
    year: null,
  };

  isMovieAdded = false; // Variable para controlar la alerta

  constructor(private service: IndexService, private router: Router) {}

  onSubmit() {
    this.service.addMovie(this.movie).subscribe(
      (response) => {
        console.log('Película agregada', response);
        this.isMovieAdded = true; // Activa la alerta al agregar la película
        setTimeout(() => {
          this.isMovieAdded = false; // Desactiva la alerta después de 1.5 segundos
          this.router.navigate(['/movies']); // Redirige a 'movies' después de mostrar la alerta
        }, 1500);
      },
      (error) => {
        console.error('Error al agregar la película', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/movies']);
  }
}
