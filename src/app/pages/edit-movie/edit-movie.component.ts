import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndexService } from '../../services/index.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movieForm: FormGroup;
  movieId: string | null = null;
  showSuccessMessage = false; // Variable para mostrar la alerta

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: IndexService
  ) {
    this.movieForm = this.fb.group({
      title: [''],
      synopsis: [''],
      year: [''],
      cover: [''],
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la película desde los parámetros de la ruta
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      // Cargar los datos de la película en el formulario
      this.service.getMovie(this.movieId).subscribe((data) => {
        this.movieForm.patchValue(data);
      });
    }
  }

  // Método para enviar el formulario y actualizar la película en la base de datos
  onSubmit() {
    if (this.movieId && this.movieForm.valid) {
      this.service
        .updateMovie(this.movieId, this.movieForm.value)
        .subscribe(() => {
          this.showSuccessMessage = true; // Muestra la alerta de éxito

          // Espera 1.5 segundos antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/movies']); // Redirige al catálogo de películas
          }, 1500);
        });
    }
  }

  closeAlert() {
    this.showSuccessMessage = false; // Cierra la alerta manualmente
  }

  cancel() {
    this.router.navigate(['/movies']);
  }
}
