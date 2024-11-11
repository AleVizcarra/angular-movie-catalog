import { Routes } from '@angular/router';
import MovieComponent from './pages/movie/movie.component';
import MoviesComponent from './pages/movies/movies.component';
import { HomeComponent } from './pages/home/home.component';
import { EditMovieComponent } from './pages/edit-movie/edit-movie.component';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';

export const routes: Routes = [
  {
    path: 'movies', // Ruta para el catálogo de películas
    component: MoviesComponent,
  },
  {
    path: 'movie/:id', // Ruta para los detalles de una película
    component: MovieComponent,
  },
  {
    path: 'edit-movie/:id', // Ruta para editar la película
    component: EditMovieComponent,
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
  {
    path: '', // Ruta para home
    component: HomeComponent,
  },
];
