import { Injectable } from '@nestjs/common';
import axios,{ AxiosInstance } from 'axios';
import {PokeResponse} from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

import {Model} from 'mongoose';
import {Pokemon} from '../pokemon/entities/pokemon.entity';
import {InjectModel} from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';




@Injectable()
export class SeedService {
  
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel : Model<Pokemon>,
      private readonly http:AxiosAdapter

  ){}




//* grabar de manera masiva creando una lista de promesas para instarlo al final   
//   async executeSeed(){
// await this.pokemonModel.deleteMany({}); // Elimina todos los registros previos

// // Obtiene los datos de la API de Pokémon
// const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

// // Define correctamente el tipo del array para almacenar promesas
// const insertPromisesArray: Promise<any>[] = []; // Puedes usar `any` o `Document<Pokemon>`, según el caso

// // Procesa los resultados de la API y crea las promesas para insertarlas en la base de datos
// data.results.forEach(({ name, url }) => {
//   const segments = url.split('/'); // Separa la URL en segmentos
//   const no = +segments[segments.length - 2]; // Extrae el número del Pokémon
  
//   insertPromisesArray.push(this.pokemonModel.create({ name, no })); // Agrega la promesa al array
// });

// // Espera que todas las inserciones se completen
// await Promise.all(insertPromisesArray);
//   }


//* inserccion multiple, creamos un arreglo con los datos para al final aregrearlo 
  async executeSeed(){
      await this.pokemonModel.deleteMany({}); 
      const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

      const pokemonToInsert:{name:string, no:number}[]=[];


      data.results.forEach(({ name, url }) => {
        const segments = url.split('/'); // Separa la URL en segmentos
        const no = +segments[segments.length - 2]; // Extrae el número del Pokémon
        pokemonToInsert.push({name,no})

      });

      // Espera que todas las inserciones se completen
      await this.pokemonModel.insertMany(pokemonToInsert)
      return 'Seed Executed'
  }

}
