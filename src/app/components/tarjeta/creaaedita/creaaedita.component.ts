import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tarjeta } from '../../../models/tarjeta';
import { TarjetaService } from '../../../service/tarjeta.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaaedita',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  providers: [provideNativeDateAdapter()],

  templateUrl: './creaaedita.component.html',
  styleUrl: './creaaedita.component.css',
})
export class CreaaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup([]);
  Tarjeta: Tarjeta = new Tarjeta();
  mensaje: string = '';
  edicion: boolean = false;
  id: number = 0;


  constructor(
    private tS: TarjetaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      titular: ['', Validators.required],
      tipo: ['', Validators.required],
      numero: ['', Validators.required],
      ccv: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      direccionFacturacion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.Tarjeta.idTarjeta = this.form.value.codigo;
      this.Tarjeta.titular = this.form.value.titular;
      this.Tarjeta.tipo = this.form.value.tipo;
      this.Tarjeta.numero = this.form.value.numero;
      this.Tarjeta.ccv = this.form.value.ccv;
      this.Tarjeta.fechaVencimiento = this.form.value.fechaVencimiento;
      this.Tarjeta.direccionFacturacion = this.form.value.direccionFacturacion;

      if (this.edicion) {
        this.tS.update(this.Tarjeta).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setLista(data);
          });
        });
      } else {
        this.tS.insert(this.Tarjeta).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setLista(data);
          });
        });
      }
      this.router.navigate(['tarjetas']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTarjeta),
          titular: new FormControl(data.titular),
          tipo: new FormControl(data.tipo),
          numero: new FormControl(data.numero),
          ccv: new FormControl(data.ccv),
          fechaVencimiento: new FormControl(data.fechaVencimiento),
          direccionFacturacion: new FormControl(data.direccionFacturacion),
        });
      });
    }
  }
}
