import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CHART_OPTIONS } from './consts/chart-const';
import { IChartOptions } from './interface/chart-options.interface';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data: any;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: IChartOptions;
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = CHART_OPTIONS;
  }
}
