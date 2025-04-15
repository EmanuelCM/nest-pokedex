import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';


import { join } from 'path'; // de node 
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import {JoiValidationSchema} from './config/joi.validations';



@Module({
  imports: [
    // para usar el LOS ENV
    ConfigModule.forRoot(
  {
        load :[ EnvConfiguration],
        validationSchema:JoiValidationSchema
      }
  
      ),    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
      MongooseModule.forRoot(process.env.MONGODB!,{
        dbName:'pokemonsdb'
      }),   
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
  exports:[PokemonModule]
})
export class AppModule {
  constructor(
    ){}
    
}
