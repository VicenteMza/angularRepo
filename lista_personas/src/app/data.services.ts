import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable()
export class DataServices {
    constructor(private httpClient: HttpClient,
                private loginService: LoginService
    ){}

    guadarPersonas(personas: Persona[]){
        const token= this.loginService.getIdToken();
        this.httpClient.put('https://listado-personas-e5a0d-default-rtdb.firebaseio.com/datos.json?auth=' + token, personas)
            .subscribe(
                response => console.log("resultado guardar persona: " + response),
                error => console.log("Error al guardar persona: " + error)
            );
    }

    cargarPersonas(){
        const token= this.loginService.getIdToken();
        return this.httpClient.get<Persona[]>('https://listado-personas-e5a0d-default-rtdb.firebaseio.com/datos.json?auth='+ token);
    }

    modificaPersona(index: number, persona: Persona){
        const token= this.loginService.getIdToken();
        let url = 'https://listado-personas-e5a0d-default-rtdb.firebaseio.com/datos/' + index + '.json?auth=' + token;
        
        this.httpClient.put(url, persona)
        .subscribe(
            response => console.log("Resultado modificar persona: " + response),
            error => console.log("Error al modificar persona: "+ error) 
        );
    }

    eliminarPersona(index: number){
        const token= this.loginService.getIdToken();
        let url = 'https://listado-personas-e5a0d-default-rtdb.firebaseio.com/datos/' + index + '.json?auth=' + token;
        
        this.httpClient.delete(url)
        .subscribe(
            response => console.log("Resultado eliminar persona: " + response),
            error => console.log("Error al eliminar persona: "+ error) 
        );
    }
}