import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Productos } from '../../../models/producto';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-listar-producto',
  standalone: true,
  imports: [MatTableModule, 
    MatIconModule, 
    MatButton, 
    RouterLink, 
    MatButtonModule],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Descripcion', 'Precio', 'Disponibilidad', 'Fotos','Categoria', 'accion1'];
  dataSource:MatTableDataSource<Productos>=new MatTableDataSource()
  constructor(private pS:ProductoService){}

  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      console.log(this.dataSource)
    })
    this.pS.getLista().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
