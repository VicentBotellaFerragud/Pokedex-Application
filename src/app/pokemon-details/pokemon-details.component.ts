import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  pokemonId!: number;

  pokemonIdWithinLimit: boolean = true;

  pokemon: any;

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

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) { }

  /**
   * Reads the url path and takes its id in order to assign it to the local variable 'pokemonId'. This id is needed in order to
   * properly* call the getPokemonInfo function (called right after the id is assigned to the local variable 'pokemonId') from the 
   * pokemon service.
   * 
   * * By properly is meant that the getPokemonInfo function has to get the Pokémon data whose id matches the url id.
   */
  ngOnInit(): void {

    this.route.paramMap
      .subscribe((params: ParamMap) => {

        let id = Number(params.get('id'));
        this.pokemonId = id;

        if (Number(this.pokemonId) <= 0 || Number(this.pokemonId) > 151) {
          this.pokemonIdWithinLimit = false;
        }

      });

    this.pokemonService.getPokemonInfo(this.pokemonId)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => {

        this.pokemon = data;

      });

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
   * Navigates the user to the previous Pokémon detailed view and also calls the getPokemonInfo function from the pokemon service.
   * The function takes the id parameter required by the navigate and getPokemonInfo functions from the local variable 'pokemonId'.
   */
  goPrevious() {

    let previousId = Number(this.pokemonId) - 1;
    this.router.navigate(['/pokedex', previousId]);

    this.pokemonService.getPokemonInfo(previousId)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => {

        this.pokemon = data;

      });
      
  }

  /**
   * Navigates the user to the next Pokémon detailed view and also calls the getPokemonInfo function from the pokemon service.
   * The function takes the id parameter required by the navigate and getPokemonInfo functions from the local variable 'pokemonId'.
   */
  goNext() {

    let nextId = Number(this.pokemonId) + 1;
    this.router.navigate(['/pokedex', nextId]);

    this.pokemonService.getPokemonInfo(nextId)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => {

        this.pokemon = data;
        
      });

  }

  /**
   * Navigates the user back to the Pokédex view.
   */
  goBack() {

    this.router.navigate(['/pokedex']);

  }

  /**
   * Sets the local variable "destroy" to "true" so that all observables in the component are unsubscribed when this is "destroyed".
   */
  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}