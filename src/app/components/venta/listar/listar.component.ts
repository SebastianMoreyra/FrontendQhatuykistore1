import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../service/venta.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule, 
    MatIconModule, 
    MatButton, 
    RouterLink, 
    MatButtonModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  displayedColumns: string[] = ['Codigo', 'MontoTotal','FechaHora', 'Usuario', 'accion1'];
  dataSource:MatTableDataSource<Venta>=new MatTableDataSource()
  constructor(private vS:VentaService){}

  ngOnInit(): void {
    this.vS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      console.log(this.dataSource)
    })
    this.vS.getLista().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
