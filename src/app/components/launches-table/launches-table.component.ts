import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LaunchesTableService } from './launches-table.service';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { Launch } from './models/launch.model';
//
import data from '../data.json';
import offset10 from '../offset10.json';
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
    MatIconModule,
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
  tablePages: number[] = [];

  selectedPage = 1;
  prevButtonDisabled = true;
  nextButtonDisabled = false;

  selectedLocationName: string;

  constructor(private readonly _launchesTableService: LaunchesTableService) {}

  ngOnInit() {
    //TODO Activate endpoint at the end
    this.fetchLaunches();
    this.fetchLocations();
  }

  fetchLaunches(offset?: number) {
    // this._launchesTableService.getLaunchList(offset).subscribe((launches) => {
    //   this.launches = launches.results;
    //   this.launchesData = launches.results;
    //   this._preparePagination(launches.count);
    // });
    this.launchesData = offset ? data.results : offset10.results;
    this.launches = this.launchesData;
    this._preparePagination( offset ? data.count : offset10.count);
  }

  private _preparePagination(launchesCount: number) {
    const launchesPagesCount = Math.ceil(launchesCount / 10);
    this.tablePages = [];

    for (let idx = 1; idx <= launchesPagesCount; idx++) {
      this.tablePages.push(idx);
    }
  }

  fetchLocations() {
    this._launchesTableService
      .getLaunchLocations()
      .subscribe((locations) => {});
    this.locations = locationsData.results;
    console.log(data.count);
  }

  selectLocation(locations: Location[]) {
    //TODO Switch logic for fetched data
    const locationsNames = locations.map((location) => location.name);

    this.launches = this.launchesData.filter((launch) =>
      locationsNames.includes(launch.pad.location.name)
    );
  }

  selectPage(newPage: number) {
    const lastPage = this.tablePages[this.tablePages.length - 1];
    console.log('newPage', newPage);
    this.selectedPage = newPage;
    this.prevButtonDisabled = this.selectedPage === 1;
    this.nextButtonDisabled = this.selectedPage === lastPage;

    this.fetchLaunches((newPage - 1) * 10);
  }

  prevPage() {
    if (!this.prevButtonDisabled) {
      this.selectPage(this.selectedPage - 1);
    }
  }

  nextPage() {
    if (!this.nextButtonDisabled) {
      this.selectPage(this.selectedPage + 1);
    }
  }
}
