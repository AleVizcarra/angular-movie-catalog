import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Permite obtener los parámetros de la ruta activa
import { IndexService } from '../../services/index.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export default class MovieComponent implements OnInit {
  movie: any; // Variable para almacenar los detalles de la película seleccionada
  showDeleteMessage = false; // Para la alerta de eliminación

  constructor(
    private route: ActivatedRoute,
    private service: IndexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    this.service.getMovie(id).subscribe((data: any) => {
      this.movie = data; // Almacenamos los detalles de la película en la variable movie
    });
  }

  editMovie() {
    this.router.navigate(['/edit-movie', this.movie.id]); // Redirige a EditMovieComponent con el ID de la película
  }

  confirmDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.deleteMovie();
    }
  }

  deleteMovie() {
    if (this.movie.id) {
      this.service.deleteMovie(this.movie.id).subscribe(() => {
        this.showDeleteMessage = true; // Muestra la alerta de eliminación
        setTimeout(() => {
          this.router.navigate(['/movies']); // Redirige al catálogo
        }, 1500);
      });
    }
  }

  closeAlert() {
    this.showDeleteMessage = false;
  }
}
