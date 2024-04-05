import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./LoggingService.service";
import { Persona } from "./persona.model";
import { DataServices } from "./data.services";

@Injectable()
export class PersonasService {
    personas: Persona[] = [];

      saludar=new EventEmitter<number>();

      constructor(private loggingService:LoggingService,
                  private dataService: DataServices){}

      setPersonas(personas: Persona[]){
        this.personas= personas;
      }

      agregarPersona(persona: Persona){
        this.loggingService.enviaMensajeAConsola("Agregamos persona: " + persona.nombre);
        if(this.personas == null){
          this.personas= [];
        }
        this.personas.push( persona );

        this.dataService.guadarPersonas(this.personas);
      }

      cargarPersonas(){
        return this.dataService.cargarPersonas();
      }
      encontrarPersona(index:number){
        let persona: Persona= this.personas[index];
        return persona;
      }

      modificarPersona(index:number, persona:Persona){
        let persona1 = this.personas[index];
        persona1.nombre= persona.nombre;
        persona1.apellido= persona.apellido;

        this.dataService.modificaPersona(index, persona);
      }

      eliminarPersona(index: number){
        this.personas.splice(index,1);
        this.dataService.eliminarPersona(index);
        //Se vuelve a guardar el arreglo de personas en la base de datos para regenerar los indices
        this.modificarPersonas();
      }

      modificarPersonas(){
        if(this.personas != null){
          this.dataService.guadarPersonas(this.personas);
        }
      }
}