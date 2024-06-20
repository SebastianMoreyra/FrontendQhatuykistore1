import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Productos } from '../../../models/producto';
import { Categoria } from '../../../models/categoria';
import { ProductoService } from '../../../service/producto.service';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-creaedita-porducto',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './creaedita-porducto.component.html',
  styleUrl: './creaedita-porducto.component.css'
})
export class CreaeditaPorductoComponent implements OnInit{
  form: FormGroup = new FormGroup([]);
  producto: Productos = new Productos();
  mensaje: string = ''
  edicion:boolean=false
  id:number=0
  listaCategoria: Categoria[]=[]

  constructor(
    private pS: ProductoService,
    private cS: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['',Validators.required],
      disponibilidad: ['', Validators.required],
      foto: ['', Validators.required],
      ccategoria:['', Validators.required]
    });
    this.cS.list().subscribe((data) => {
      this.listaCategoria = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.producto.idProducto = this.form.value.codigo;
      this.producto.nombre = this.form.value.nombre;
      this.producto.descripcion = this.form.value.descripcion;
      this.producto.precio = this.form.value.precio;
      this.producto.disponibilidad = this.form.value.disponibilidad;
      this.producto.fotos = this.form.value.foto;
      this.producto.categoria.idCategoria = this.form.value.ccategoria;


      if(this.edicion){
        this.pS.update(this.producto).subscribe((data)=>{
          this.pS.list().subscribe((data) => {
            this.pS.setLista(data);
          });
        });
      }else{
        this.pS.insert(this.producto).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setLista(data);
          });
        });
      }
      this.router.navigate(['productos']);
    }
  }

  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idProducto),
          nombre:new FormControl(data.nombre),
          descripcion:new FormControl(data.descripcion),
          precio: new FormControl(data.precio),
          disponibilidad:new FormControl(data.disponibilidad),
          foto:new FormControl(data.fotos),
          ccategoria:new FormControl(data.categoria.idCategoria)
        })
      })
    }
  }
}
