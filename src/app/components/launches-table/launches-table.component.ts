import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LaunchesTableService } from './launches-table.service';


@Component({
  selector: 'app-launches-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './launches-table.component.html',
  styleUrl: './launches-table.component.scss',
  providers: [LaunchesTableService]
})
export class LaunchesTableComponent implements OnInit{

  constructor(private readonly _launchesTableService: LaunchesTableService) {}

  ngOnInit() {
    this._launchesTableService.getLaunchList().subscribe((v) => console.log(v))
  }

}