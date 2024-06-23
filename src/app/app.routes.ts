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
import { ProductoComponent } from './components/producto/producto.component';
import { CreaeditaPorductoComponent } from './components/producto/creaedita-porducto/creaedita-porducto.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Reporte02Component } from './components/reportes/reporte02/reporte02.component';
import { Reporte03Component } from './components/reportes/reporte03/reporte03.component';
import { Reporte04Component } from './components/reportes/reporte04/reporte04.component';
import { Reporte05Component } from './components/reportes/reporte05/reporte05.component';
import { Reporte06Component } from './components/reportes/reporte06/reporte06.component';

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
    canActivate: [segGuard],
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
    canActivate: [segGuard],
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
    canActivate: [segGuard],
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
    canActivate: [segGuard],
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
        path: 'ediciones/:id',
        component: CreaeditaPorductoComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reporte02',
        component: Reporte02Component,
      },
      {
        path: 'reporte03',
        component: Reporte03Component,
      },
      {
        path: 'reporte04',
        component: Reporte04Component,
      },
      {
        path: 'reporte05',
        component: Reporte05Component,
      },
      {
        path: 'reporte06',
        component: Reporte06Component,
      },
    ],
    canActivate: [segGuard],
  },

  {
    path: 'homes',
    component: HomeComponent,
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno

  },
];
