import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-creaedita-categoria',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './creaedita-categoria.component.html',
  styleUrl: './creaedita-categoria.component.css'
})
export class CreaeditaCategoriaComponent implements OnInit{
  form: FormGroup = new FormGroup([]);
  delivery: Categoria = new Categoria();
  mensaje: string = ''
  edicion:boolean=false
  id:number=0

  constructor( private cS: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute){}


  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo: [''],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.delivery.idCategoria = this.form.value.codigo;
      this.delivery.nombre = this.form.value.categoria;
      this.delivery.descripcion = this.form.value.descripcion;


      if(this.edicion){
        this.cS.update(this.delivery).subscribe((data)=>{
          this.cS.list().subscribe((data) => {
            this.cS.setLista(data);
          });
        });
      }else{
        this.cS.insert(this.delivery).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setLista(data);
          });
        });
      }
      this.router.navigate(['categorias']);
    }
  }

  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idCategoria),
          categoria:new FormControl(data.nombre),
          descripcion:new FormControl(data.descripcion),
        })
      })
    }
  }


}
