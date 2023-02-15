import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';

import config from 'config';
import { AuthService } from '../servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _ngZone: NgZone,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: config.google_client_id,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse( response: CredentialResponse ) {
    this.authService.loginWithGoogle(response.credential).subscribe(
      resposta => {
        console.log(resposta.jwt);
        console.log(resposta.user);

        var expires = (new Date(Date.now()+ 86400*1000*7)).toUTCString();

        document.cookie = `jwtToken=${resposta.jwt}; expires=${expires}`

        document.cookie = `email=${resposta.user.email}; expires=${expires}`
        document.cookie = `nome=${resposta.user.primeiroNome}; expires=${expires}`
        document.cookie = `apelido=${resposta.user.ultimoNome}; expires=${expires}`
        document.cookie = `role=${resposta.user.role}; expires=${expires}`

        this._ngZone.run(() => {
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });;
        })
      }
    )
  }
}
