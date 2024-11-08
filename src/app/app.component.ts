import { Component } from '@angular/core';
import { LaunchesTableComponent } from './components/launches-table/launches-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LaunchesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
