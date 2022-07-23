import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  url = 'https://pokeapi.co/api/v2/pokemon/';

  /**
   * Gets all the information corresponding to the Pokémon that matches the passed id.
   * @param id - This is the id of the Pokémon.
   * @returns - (as an object) all the information about the corresponding Pokémon.s 
   */
  getPokemonInfo(id: number) {

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
  }

}
