import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Delivery } from '../../../models/delivery';
import { DeliveryService } from '../../../service/delivery.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule, 
    MatIconModule, 
    MatButton, 
    RouterLink, 
    MatButtonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
  displayedColumns: string[] = ['Codigo', 'Direccion', 'Estado', 'Telefono', 'Referencia', 'Usuario', 'accion1'];
  dataSource:MatTableDataSource<Delivery>=new MatTableDataSource()
  constructor(private dS:DeliveryService){}

  ngOnInit(): void {
    this.dS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      console.log(this.dataSource)
    })
    this.dS.getLista().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
