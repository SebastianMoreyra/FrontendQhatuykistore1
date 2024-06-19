import { Tarjeta } from './../../../models/tarjeta';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TarjetaService } from '../../../service/tarjeta.service';

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
  displayedColumns: string[] = ['Codigo', 'Titular', 'Tipo', 'Numero', 'Ccv', 'Fechadevencimiento','Direccionfacturacion', 'accion1'];
  dataSource:MatTableDataSource<Tarjeta>=new MatTableDataSource()
  constructor(private dS:TarjetaService){}

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
