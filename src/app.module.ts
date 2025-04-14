import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';


import { join } from 'path'; // de node 
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot(),   
    // MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    // para usar el LOS ENV
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
      MongooseModule.forRoot(`${process.env.MONGODB!}`),   
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
  exports:[PokemonModule]
})
export class AppModule {
  constructor(
    ){console.log(process.env.MONGODB)}
    
}
