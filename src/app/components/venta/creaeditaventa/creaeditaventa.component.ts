import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../service/venta.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaventa',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatDatepickerModule],
    providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditaventa.component.html',
  styleUrl: './creaeditaventa.component.css'
})
export class CreaeditaVentaComponent implements OnInit{
  form: FormGroup = new FormGroup([]);
  Venta: Venta = new Venta();
  mensaje: string = ''
  edicion:boolean=false
  id:number=0
  listaUsuarios: Usuario[]=[]

  constructor(
    private uS: UsuarioService,
    private vS: VentaService,
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
      montoTotal: ['', Validators.required],
      fechaHora: ['', Validators.required],
      cusuario:['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.Venta.idVenta = this.form.value.codigo;
      this.Venta.montoTotal = this.form.value.montoTotal;
      this.Venta.fechaHora = this.form.value.fechaHora;
      this.Venta.users.id = this.form.value.cusuario;


      if(this.edicion){
        this.vS.update(this.Venta).subscribe((data)=>{
          this.vS.list().subscribe((data) => {
            this.vS.setLista(data);
          });
        });
      }else{
        this.vS.insert(this.Venta).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setLista(data);
          });
        });
      }
      this.router.navigate(['ventas']);
    }
  }

  init(){
    if(this.edicion){
      this.vS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idVenta),
          montoTotal:new FormControl(data.montoTotal),
          fechaHora:new FormControl(data.fechaHora),
          cusuario:new FormControl(data.users.id)
        })
      })
    }
  }

}
