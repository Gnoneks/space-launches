import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LaunchesTableService } from './launches-table.service';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { Launch } from './models/launch.model';
//
import data from '../data.json';
import locationsData from '../locations.json';
import { Location } from './models/locations.model';

@Component({
  selector: 'app-launches-table',
  standalone: true,
  imports: [
    MatTableModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
  ],
  templateUrl: './launches-table.component.html',
  styleUrl: './launches-table.component.scss',
  providers: [LaunchesTableService],
})
export class LaunchesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'launchDate', 'location', 'status'];

  launchesData: Launch[];
  launches: Launch[];
  locations: Location[];

  selectedLocationName: string;

  constructor(private readonly _launchesTableService: LaunchesTableService) {}

  ngOnInit() {
    //TODO Activate endpoint at the end
    // this._launchesTableService.getLaunchList().subscribe((v) => {
    //   this.launches = v.results;
    //   console.log(v);
    // });
    this.launchesData = data.results;
    this.launches = this.launchesData;
    this.locations = locationsData.results;
  }

  selectLocation(locations: Location[]) {
    //TODO Switch logic for fetched data
    const locationsNames = locations.map((location) => location.name);

    this.launches = this.launchesData.filter((launch) =>
      locationsNames.includes(launch.pad.location.name)
    );
  }
}
