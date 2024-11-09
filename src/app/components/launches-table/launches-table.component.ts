import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LaunchesTableService } from './launches-table.service';
import {
  NgLabelTemplateDirective,
  NgOptionComponent,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { Launch } from './models/launch.model';
import { Location } from './models/locations.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-launches-table',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgOptionComponent,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './launches-table.component.html',
  styleUrl: './launches-table.component.scss',
  providers: [LaunchesTableService],
})
export class LaunchesTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'launchDate', 'location', 'status'];

  launchesData: Launch[];
  locationsData: Location[];
  launches: Launch[];
  tablePages: number[] = [];
  locationsControl = new FormControl<Location[]>([]);

  selectedPage = 1;
  prevButtonDisabled = true;
  nextButtonDisabled = false;

  selectedLocationName: string;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _launchesTableService: LaunchesTableService) {}

  ngOnInit() {
    this._fetchLaunches();
    this._fetchLocations();
    this._listenToFilterChanges();
  }

  private _fetchLaunches(offset?: number) {
    this._launchesTableService.getLaunchList(offset).subscribe((launches) => {
      this.clearLocationFilters();
      this.launches = launches.results;
      this.launchesData = launches.results;
      this._preparePagination(launches.count);
    });
  }

  private _preparePagination(launchesCount: number) {
    const lastPage = Math.ceil(launchesCount / 10);
    this.tablePages = [];

    switch (this.selectedPage) {
      case 1:
        this.tablePages = [1, 2, 3];
        break;
      case lastPage:
        this.tablePages = [lastPage - 2, lastPage - 1, lastPage];
        break;
      default:
        this.tablePages = [
          this.selectedPage - 1,
          this.selectedPage,
          this.selectedPage + 1,
        ];
        break;
    }

    this.prevButtonDisabled = this.selectedPage === 1;
    this.nextButtonDisabled = this.selectedPage === lastPage;
  }

  private _fetchLocations() {
    this._launchesTableService
      .getLaunchLocations()
      .subscribe((locations) => (this.locationsData = locations.results));
  }

  private _listenToFilterChanges() {
    this.locationsControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((locations) => {
        if (locations?.length) {
          const locationsNames = locations.map((location) => location.name);

          this.launches = this.launchesData.filter((launch) =>
            locationsNames.includes(launch.pad.location.name)
          );
        } else {
          this.launches = this.launchesData;
        }
      });
  }

  selectPage(newPage: number) {
    this.selectedPage = newPage;
    this._fetchLaunches((newPage - 1) * 10);
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

  clearLocationFilters() {
    if (this.locationsControl.value) {
      this.locationsControl.setValue(null);
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
