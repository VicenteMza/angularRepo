import { Component } from '@angular/core';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {
  nombreInput:string;
  apellidoInput:string;

  constructor(private loggingService:LoggingService,
              private personasService:PersonasService,
              private router:Router){
                this.personasService.saludar.subscribe(
                  (indice: number)=> alert("El indice es:" + indice)
                );
              }

  onGuardarPersona(){
    let persona1 = new Persona(
      this.nombreInput, 
      this.apellidoInput);
    this.personasService.agregarPersona(persona1);

    this.router.navigate(['personas']);
  }
}