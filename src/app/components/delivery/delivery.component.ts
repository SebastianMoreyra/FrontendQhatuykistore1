import { Component } from '@angular/core';
import { ListarComponent } from './listar/listar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [RouterOutlet, 
    ListarComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {
  constructor(public route:ActivatedRoute){}
}
