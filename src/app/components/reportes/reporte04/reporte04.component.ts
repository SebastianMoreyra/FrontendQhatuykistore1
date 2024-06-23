import { TarjetaService } from './../../../service/tarjeta.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte04.component.html',
  styleUrl: './reporte04.component.css'
})
export class Reporte04Component  implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TarjetaService) {}

  ngOnInit(): void {
    this.tS.getTarjetaMasProximaVencimiento().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadTarjetas),
          label: 'Tarjetas mas proximas a vencer',
          backgroundColor: [
            '#0094d3',
            '#4169c7',

          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
