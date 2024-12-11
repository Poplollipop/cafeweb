import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    MatMenuModule,
    MatIconModule,
  ],
  styleUrls: []
})
export class AppHeaderComponent {

  constructor() {
  }
}
