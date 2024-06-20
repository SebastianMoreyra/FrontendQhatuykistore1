import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterOutlet, ListarProductoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  constructor(public route:ActivatedRoute){}
}
