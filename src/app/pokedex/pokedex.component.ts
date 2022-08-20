import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, OnDestroy {

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

  destroy = new Subject();

  constructor(private pokemonService: PokemonService, private router: Router) { }

  /**
   * Calls the loadPokemons function to get the info of all 151 first generation Pokémon. Also listens to any search the user makes
   * and hides the Pokémon whose names don't match it.
   */
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

  /**
   * Calls the getPokemonInfo function from the pokemon service 'finalPokemon' minus 'initalPokemon' times and pushes the received
   * data into the 'pokemonArray' (always into the 'pokemonsArr' arr). Also calls the sortPokemons function to sort the 'pokemonArray'.
   * @param initalPokemon -This is the first pokemon (actually its id) on which the getPokemonInfo function is called.
   * @param finalPokemon -This is the last pokemon (actually its id) on which the getPokemonInfo function is called. 
   * @param pokemonArray - This is the array in which the received data is pushed into.
   */
  loadPokemons(initalPokemon: number, finalPokemon: number, pokemonArray: any[]) {

    for (let i = initalPokemon; i < finalPokemon; i++) {

      this.pokemonService.getPokemonInfo(i)
        .pipe(takeUntil(this.destroy))
        .subscribe((data: any) => {

          if (pokemonArray.length === 0 || pokemonArray.length < finalPokemon - initalPokemon) {
            pokemonArray.push(data);
          }

          this.sortPokemons(pokemonArray);

        });

    }

  }

  /**
   * Sorts the Pokémon in ascending order (uses their id as a reference).
   * @param pokemonArray - This is the array (it's always the 'pokemonsArr' arr) whose elements the function sorts.
   */
  sortPokemons(pokemonArray: any[]) {

    pokemonArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

    setTimeout(() => {
      this.loadedAndSorted = true;
    }, 2500);

  }

  /**
   * Sets the background color of each 'type-span' by comparing the passed type with a set of values (the 'colors' array values).
   * Returns one 'typeCode' or another depending on the comparison result.
   * @param type - This is the type that's passed in the html file. The function needs it to make the comparison.
   * @returns - (in code) the background color. 
   */
  setTypeBgColor(type: string) {

    for (let i = 0; i < Object.entries(this.colors).length; i++) {

      const typeName = Object.entries(this.colors)[i][0];
      const typeCode = Object.entries(this.colors)[i][1];

      if (typeName === type) {
        return typeCode;
      }
    }

  }

  /**
   * Sets the text color of each 'type-span' by comparing the passed type with a set of values. Returns 'black' or 'white' 
   * depending on the comparison result.
   * @param type - This is the type that's passed in the html file. The function needs it to make the comparison.
   * @returns - 'black' or 'white'.
   */
  setTypeTextColor(type: string) {

    if (type === 'grass' || type === 'flying' || type === 'normal' || type === 'electric' || type === 'ground' || type === 'fairy' || type === 'steel' || type === 'ice') {
      return 'black';
    } else {
      return 'white';
    }

  }

  /**
   * Sorts the Pokémon in descending order based on the 'indexPosition' parameter. This parameter corresponds to the index of a 
   * particular ability in the 'stats' array (For example --> indexPosition 0 = stats[0], the app sorts Pokémon based on their 
   * health points in this case because stats[0] corresponds to the Pokémon's health points. 'base_stat' is the amount of points 
   * the Pokémon has for the skill stats[indexPosition]['name'].
   * @param pokemonArray - This is the array (it's always the 'pokemonsArr' arr) whose elements the function sorts.
   * @param indexPosition - This is the index that corresponds to a certain ability in the 'stats' array.
   */
  sortPokemonsAccordingTo(pokemonArray: any[], indexPosition: number) {

    pokemonArray.sort((a, b) => parseFloat(b.stats[indexPosition]['base_stat']) - parseFloat(a.stats[indexPosition]['base_stat']));

  }

  /**
   * Turns on or off the Pokémon animations depending on the value of the local variable 'count'.
   */
  turnOnOrOffAnimations() {

    if (this.count === 0 || this.count % 2 === 0) {
      this.animationsOn = true;
    } else {
      this.animationsOn = false;
    }

    this.count++;

  }

  /**
   * Navigates the user to the Pokémon detailed view.
   * @param pokemon - This is the Pokémon whose id is needed in order to display the right (corresponding to the pokemon clicked by the 
   * user) Pokémon detailed view.
   */
  showPokemonDetails(pokemon: any) {

    this.router.navigate(['/pokedex', pokemon.id]);

  }

  /**
   * Sets the local variable "destroy" to "true" so that all observables in the component are unsubscribed when this is "destroyed".
   */
  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}