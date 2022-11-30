import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Services
import { SummariesService } from '../../../../../services/summaries/summaries.service';

@Component({
  selector: 'app-chart-factura-summary',
  templateUrl: './chart-factura-summary.component.html',
  styleUrls: ['./chart-factura-summary.component.css'],
})
export class ChartFacturaSummaryComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [
      'ISFJ',
      'ISFP',
      'ISTJ',
      'ISTP',
      'INFJ',
      'INFP',
      'INTJ',
      'INTP',
      'ESFJ',
      'ESFP',
      'ESTJ',
      'ESTP',
      'ENFJ',
      'ENFP',
      'ENTJ',
      'ENTP',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private summariesService: SummariesService) {}

  ngOnInit(): void {
    this.summariesService
      .getDepartmentPersonalitySummary('Facturacion')
      .subscribe({
        next: (summary) => {
          this.pieChartData.datasets[0].data = [
            summary.totalISFJ,
            summary.totalISFP,
            summary.totalISTJ,
            summary.totalISTP,
            summary.totalINFJ,
            summary.totalINFP,
            summary.totalINTJ,
            summary.totalINTP,
            summary.totalESFJ,
            summary.totalESFP,
            summary.totalESTJ,
            summary.totalESTP,
            summary.totalENFJ,
            summary.totalENFP,
            summary.totalENTJ,
            summary.totalENTP,
          ];

          this.chart?.render();
        },
        error(err) {
          console.error(err);
        },
      });
  }
}
