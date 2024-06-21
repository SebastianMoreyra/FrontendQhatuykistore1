import { Routes } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CreaeditaComponent } from './components/delivery/creaedita/creaedita.component';
import { CreaaeditaComponent } from './components/tarjeta/creaaedita/creaaedita.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CreaeditaVentaComponent } from './components/venta/creaeditaventa/creaeditaventa.component';
import { CreaeditaCategoriaComponent } from './components/categoria/creaedita-categoria/creaedita-categoria.component';
import { VentaComponent } from './components/venta/venta.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'deliveries',
    component: DeliveryComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaComponent,
      },
    ],
  },
  {
    path: 'tarjetas',
    component: TarjetaComponent,
    children: [
      {
        path: 'nuevoa',
        component: CreaaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaaeditaComponent,
      },
    ],
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    children: [
      {
        path: 'nuevoc',
        component: CreaeditaCategoriaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaCategoriaComponent,
      },
    ],
  },

  {
    path: 'ventas',
    component: VentaComponent,
    children: [
      {
        path: 'nuevob',
        component: CreaeditaVentaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaVentaComponent,
      },
    ],
  },

  {
    path: 'homes',
    component: HomeComponent,    
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno 

  },
];
