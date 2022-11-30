import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { jsPDF, ImageOptions } from 'jspdf';

// Services
import { SummariesService } from '../../../../../services/summaries/summaries.service';

@Component({
  selector: 'app-chart-global-vark-summary',
  templateUrl: './chart-global-vark-summary.component.html',
  styleUrls: ['./chart-global-vark-summary.component.css'],
})
export class ChartGlobalVarkSummaryComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['V', 'A', 'R', 'K'],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private summariesService: SummariesService) {}

  ngOnInit(): void {
    this.summariesService.getGlobalVarkSummary().subscribe({
      next: (summary) => {
        console.log('summary', summary);
        this.pieChartData.datasets[0].data = [
          summary.totalV,
          summary.totalA,
          summary.totalR,
          summary.totalK,
        ];

        this.chart?.render();
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
