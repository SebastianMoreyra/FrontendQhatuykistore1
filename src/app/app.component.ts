import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule, 
    MatIconModule, 
    MatMenuModule, 
    MatButtonModule,
    RouterLink,
    NgIf  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendQhatuykistore';
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isOperario() {
    return this.role === 'ADMIN';
  }

  isMaestro() {
    return this.role === 'ADMIN';
  }
}
