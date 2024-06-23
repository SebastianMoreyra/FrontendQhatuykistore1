import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DeliveryService } from '../../../service/delivery.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte01.component.html',
  styleUrl: './reporte01.component.css'
})
export class Reporte01Component implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private mS: DeliveryService) {}

  ngOnInit(): void {
    this.mS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadDeliveriesxUsuario),
          label: 'Cantidad de deliveries',
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
