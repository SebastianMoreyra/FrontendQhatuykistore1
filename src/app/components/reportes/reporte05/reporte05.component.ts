import { CategoriaService } from './../../../service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte05',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte05.component.html',
  styleUrl: './reporte05.component.css'
})
export class Reporte05Component  implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: CategoriaService) {}

  ngOnInit(): void {
    this.tS.getFrecuencia().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.frecuencia),
          label: 'frecuencia',
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
