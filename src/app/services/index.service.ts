import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private MOVIE_API =
    'https://laravel-movie-api-production.up.railway.app/api/movies';

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<any> {
    return this.http.get(this.MOVIE_API);
  }

  // Método para obtener los detalles de una película específica
  public getMovie(id: string | null): Observable<any> {
    return this.http.get(`${this.MOVIE_API}/${id}`);
  }

  // Método para actualizar los datos de una película
  public updateMovie(id: string, movieData: any): Observable<any> {
    return this.http.put(`${this.MOVIE_API}/${id}`, movieData);
  }

  // Método para eliminar una película
  public deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.MOVIE_API}/${id}`);
  }

  // Método para agregar una película
  public addMovie(movie: any): Observable<any> {
    return this.http.post(this.MOVIE_API, movie);
  }
}
