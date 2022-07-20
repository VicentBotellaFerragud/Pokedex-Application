import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  loadedAndSorted: boolean = false;

  pokemonsArr: any[] = [];

  form = new FormGroup({
    pokemonSearch: new FormControl()
  });

  search: string = '';

  color: ThemePalette = 'primary';

  animationsOn: boolean = false;

  count: number = 0;

  colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.loadPokemons(1, 152, this.pokemonsArr);
    }, 2500);
    
    this.form.get('pokemonSearch')?.valueChanges
      .subscribe((searchValue: string) => {

        let pokecardsList = document.querySelectorAll(".mat-card");
        
        pokecardsList.forEach(pokecard => {
          
          let pokecardTitle = (pokecard.childNodes[0].childNodes[0].nodeValue)?.toLowerCase();
          let pokecardAsHtmlElement = pokecard as HTMLElement;

          if (pokecardTitle?.includes(searchValue.toLowerCase())) {
            pokecardAsHtmlElement.classList.remove('d-none');
          } else {
            pokecardAsHtmlElement.classList.add('d-none');
          }

        });
      });

  }

  loadPokemons(initalPokemon: number, finalPokemon: number, pokemonArray: any[]) {
    
    for (let i = initalPokemon; i < finalPokemon; i++) {
      
      this.pokemonService.getPokemonInfo(i)
        .subscribe((data: any) => {

          if (pokemonArray.length === 0 || pokemonArray.length < finalPokemon - initalPokemon) {
            pokemonArray.push(data);
          }

          this.sortPokemons(pokemonArray);
        });

    }

  }

  sortPokemons(pokemonArray: any[]) {

    pokemonArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

    setTimeout(() => {
      this.loadedAndSorted = true;
    }, 2500);

  }

  setTypeBgColor(type: string) {

    for (let i = 0; i < Object.entries(this.colors).length; i++) {

      const typeName = Object.entries(this.colors)[i][0];
      const typeCode = Object.entries(this.colors)[i][1];

      if (typeName === type) {
        return typeCode;
      }
    }

  }

  setTypeTextColor(type: string) {

    if (type === 'grass' || type === 'flying' || type === 'normal' || type === 'electric' || type === 'ground' || type === 'fairy' || type === 'steel' || type === 'ice') {
      return 'black';
    } else {
      return 'white';
    }

  }

  turnOnAnimations() {

    if (this.count === 0 || this.count % 2 === 0) {
      this.animationsOn = true;
    } else {
      this.animationsOn = false;
    }

    this.count++;

  }

  showPokemonDetails(pokemon: any) {

    this.router.navigate(['/pokedex', pokemon.id]);

  }

}