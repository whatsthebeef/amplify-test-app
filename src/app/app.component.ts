import { Component, OnInit } from '@angular/core';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Todo } from '../models';

declare const gapi: any;
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amplify-test-app';
  tokenClient: any;

  async ngOnInit() {
    await new Promise((resolve, reject) => {
      // NOTE: the 'auth2' module is no longer loaded.
      gapi.load('client', {callback: resolve, onerror: reject});
    });
    await gapi.client.init({
      // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
    })
    
    google.accounts.id.initialize({
      client_id: '790540636311-qho06cv5jp21hlbt9mn7utrquausi55b.apps.googleusercontent.com',
      prompt_parent_id: 'g_id_onload',
      // allowed_parent_origin: 'http://localhost:4200',
      // scope: 'profile',
      callback: ((response: any) => {
        console.log(response);
        if (response.error !== undefined) {
          // reject(response);
        }
         Auth.federatedSignIn('accounts.google.com', {token: response.credential, expires_at: 9999999999}, {name: 'john'});
        // GIS has automatically updated gapi.client with the newly issued access token.
        // resolve(response.credentials);
      }),
    });
    google.accounts.id.prompt((notification: any) => {
      console.log(notification);
    });


  }

  federatedSignIn() {
    this.signIn().then(id_token => {
      Auth.federatedSignIn('accounts.google.com', {token: id_token, expires_at: 9999999999}, {name: 'john'});
    });
  }

  async signIn(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        /*
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: '790540636311-qho06cv5jp21hlbt9mn7utrquausi55b.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
          response_type: 'id_token permission',
          prompt: 'consent',
          callback: '',  // defined at request time in await/promise scope.
        });
        resolve(null);
        */

        /*
        google.accounts.id.renderButton(
          document.getElementById(""),
          { theme: 'outline', size: 'large' }
        );
        */
        
        google.accounts.id.prompt((notification: any) => {
          console.log(notification);
        });
      } catch (err) {
        reject(err);
      }
    });
    // return this.getToken();
    
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Settle this promise in the response callback for requestAccessToken()
        /*
        this.tokenClient.callback = (resp: any) => {
          if (resp.error !== undefined) {
            reject(resp);
          }
          // GIS has automatically updated gapi.client with the newly issued access token.
          console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
          resolve(resp);
        };
        return this.tokenClient.;
        */
      } catch (err) {
        console.log(err)
      }
    });
  }

}
