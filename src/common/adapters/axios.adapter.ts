import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interfaces";
import axios, { AxiosInstance } from 'axios';


@Injectable() //* para que pueda ser inyectado en otro  lado 

//* creamos el adaptador que implementa httpAdapter la cual tiene un metodo get que es una promesa que recibe una url y devolvera un tipo de dato igual al que recibe,  
export class AxiosAdapter implements HttpAdapter{

    private axios:AxiosInstance =axios

    async get<T>(url: string): Promise<T> {
        
        try {
            const {data}= await this.axios.get<T> (url);
            return data
        } catch (error) {
            throw new Error('This is an error- Check Logs ')
        }

    }

}