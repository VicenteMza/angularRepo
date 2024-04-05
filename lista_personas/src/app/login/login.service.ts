import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import * as firebase from 'firebase';

@Injectable()
export class LoginService {
  token: string;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    firebase
      .auth()
      .singInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .auth()
          .currentUder.getToken()
          .then((token) => {
            console.log(token);
            this.token = token;
            this.router.navigate(['/']);
          });
      });
  }

  getIdToken() {
    return this.token;
  }

  isAutenticado(){
    return this.token != null;
  }

  logout(){
    firebase.auth().singOut()
        .then(()=> {
            this.token = null;
            this.router.navigate(['login']);
        })catch(error => console.log('Error logout: ' + error));
  }
}

/*
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'; // Importa el módulo de Firebase
import 'firebase/database'; // Importa el módulo de Firebase Realtime Database

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo = 'Listado de Personas';

  ngOnInit(): void {
    // Inicializa Firebase (asegúrate de reemplazar con tu propia configuración)
    const firebaseConfig = {
      apiKey: 'TU_API_KEY',
      authDomain: 'TU_AUTH_DOMAIN',
      databaseURL: 'TU_DATABASE_URL',
      projectId: 'TU_PROJECT_ID',
      storageBucket: 'TU_STORAGE_BUCKET',
      messagingSenderId: 'TU_MESSAGING_SENDER_ID',
      appId: 'TU_APP_ID'
    };

    // Inicializa la app de Firebase
    firebase.initializeApp(firebaseConfig);

    // Ejemplo: Lee datos de Firebase Realtime Database
    const database = firebase.database();
    const ref = database.ref('users'); // Reemplaza 'users' con la ruta deseada en tu base de datos

    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      console.log('Datos de Firebase:', data);
    });
  }
}

*/
