import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LaunchesTableService } from './launches-table.service';
import { Launch } from './models/launch.model';
import data from '../data.json';

@Component({
  selector: 'app-launches-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './launches-table.component.html',
  styleUrl: './launches-table.component.scss',
  providers: [LaunchesTableService],
})
export class LaunchesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'launchDate', 'location', 'status'];

  launches: Launch[];

  constructor(private readonly _launchesTableService: LaunchesTableService) {}

  ngOnInit() {
    //TODO Activate endpoint at the end
    // this._launchesTableService.getLaunchList().subscribe((v) => {
    //   this.launches = v.results;
    //   console.log(v);
    // });
    this.launches = data.results;
    console.log(data);
  }
}
