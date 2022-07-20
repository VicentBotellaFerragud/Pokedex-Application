import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonId!: number;

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

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        let id = Number(params.get('id'));
        this.pokemonId = id;
      });

    this.pokemonService.getPokemonInfo(this.pokemonId)
      .subscribe((data: any) => {
        this.pokemon = data;
      });

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

  goPrevious() {

    let previousId = Number(this.pokemonId) - 1;
    this.router.navigate(['/pokedex', previousId]);

    this.pokemonService.getPokemonInfo(previousId)
      .subscribe((data: any) => {
        this.pokemon = data;
      });
      
  }

  goNext() {

    let nextId = Number(this.pokemonId) + 1;
    this.router.navigate(['/pokedex', nextId]);

    this.pokemonService.getPokemonInfo(nextId)
      .subscribe((data: any) => {
        this.pokemon = data;
      });

  }

  goBack() {

    this.router.navigate(['/pokedex']);

  }

}
