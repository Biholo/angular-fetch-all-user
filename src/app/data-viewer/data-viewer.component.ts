import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  data: any;
  filteredData: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.filteredData = this.data.users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
      }));
    });
  }

  downloadJson() {
    const fileName = "data.json";
    const json = JSON.stringify(this.filteredData);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
