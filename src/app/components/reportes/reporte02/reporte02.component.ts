import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-reporte02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte02.component.html',
  styleUrl: './reporte02.component.css'
})
export class Reporte02Component  implements OnInit{
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

  constructor(private mS: RoleService) {}

  ngOnInit(): void {
    this.mS.getCantidadRolexUsuario().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.rol);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadUsuariosxRol),
          label: 'Cantidad de Usuarios',
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
