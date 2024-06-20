import { Routes } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CreaeditaComponent } from './components/delivery/creaedita/creaedita.component';
import { CreaaeditaComponent } from './components/tarjeta/creaaedita/creaaedita.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CreaeditaCategoriaComponent } from './components/categoria/creaedita-categoria/creaedita-categoria.component';
import { Productos } from './models/producto';
import { CreaeditaPorductoComponent } from './components/producto/creaedita-porducto/creaedita-porducto.component';
import { ProductoComponent } from './components/producto/producto.component';

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
    path: 'productos',
    component: ProductoComponent,
    children: [
      {
        path: 'nuevop',
        component: CreaeditaPorductoComponent,
      },
      {
        path: 'edicionesp/:id',
        component: CreaeditaPorductoComponent,
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
    path: 'homes',
    component: HomeComponent,    
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno 

  },
];
