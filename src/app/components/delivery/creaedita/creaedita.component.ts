import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Delivery } from '../../../models/delivery';
import { DeliveryService } from '../../../service/delivery.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-creaedita',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './creaedita.component.html',
  styleUrl: './creaedita.component.css'
})
export class CreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup([]);
  delivery: Delivery = new Delivery();
  mensaje: string = ''
  edicion:boolean=false
  id:number=0
  listaUsuarios: Usuario[]=[]

  estados: { value: string; viewValue: string }[] = [
    { value: 'Empacando', viewValue: 'Empacado' },
    { value: 'Ruta', viewValue: 'Ruta' },
    { value: 'Enviado', viewValue: 'Enviado' }
  ];

  constructor(
    private uS: UsuarioService,
    private dS: DeliveryService,
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
      direccion: ['', Validators.required],
      estado: ['', Validators.required],
      telefono: ['',Validators.required],
      referencia: ['', Validators.required],
      cusuario:['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.delivery.idDelivery = this.form.value.codigo;
      this.delivery.direccionDelivery = this.form.value.direccion;
      this.delivery.estadoDelivery = this.form.value.estado;
      this.delivery.telefono = this.form.value.telefono;
      this.delivery.datosAdicionales = this.form.value.referencia;
      this.delivery.users.id = this.form.value.cusuario;


      if(this.edicion){
        this.dS.update(this.delivery).subscribe((data)=>{
          this.dS.list().subscribe((data) => {
            this.dS.setLista(data);
          });
        });
      }else{
        this.dS.insert(this.delivery).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setLista(data);
          });
        });
      }
      this.router.navigate(['deliveries']);
    }
  }

  init(){
    if(this.edicion){
      this.dS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idDelivery),
          direccion:new FormControl(data.direccionDelivery),
          estado:new FormControl(data.estadoDelivery),
          telefono: new FormControl(data.telefono),
          referencia:new FormControl(data.datosAdicionales),
          cusuario:new FormControl(data.users.id)
        })
      })
    }
  }

}
