import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  public pokemon$!: Observable<any>

  constructor(public request: RequestService) { 
    this.pokemon$ = request.getPokemon("pikachu")
  }

  ngOnInit(): void {

  }

}
