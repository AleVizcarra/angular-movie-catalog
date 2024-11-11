import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export default class MoviesComponent implements OnInit {
  movies: any = []; // Arreglo para almacenar la lista de películas

  constructor(private service: IndexService) {}

  ngOnInit(): void {
    this.service.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }
}
