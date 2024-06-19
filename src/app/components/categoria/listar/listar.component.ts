import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../service/categoria.service';
import { Categoria } from '../../../models/categoria';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
  displayedColumns: string[] = ['Codigo', 'Categoria', 'Descripcion', 'accion1'];
  dataSource:MatTableDataSource<Categoria>=new MatTableDataSource()

  constructor(private cS:CategoriaService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      console.log(this.dataSource)
    })
    this.cS.getLista().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
