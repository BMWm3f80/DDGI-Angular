import {Component} from '@angular/core';


@Component({templateUrl: 'grid.component.html',
                          styleUrls: ['']})
export class GridComponent {
  columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Code Name", field: "code_name"},
    { headerName: "Title", field: "title"}
  ];

  rowData: any;

}


