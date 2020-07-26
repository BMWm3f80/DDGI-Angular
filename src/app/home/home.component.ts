import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService} from '../_services/user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['home.component.css']})
export class HomeComponent {
  title = "Demo GRid";
  columnDefs = [
    { headerName: "ID", field: "id", width: 80, sortable: true },
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Middle Name", field: "middle_name"},
    { headerName: "Email", field: "email"},
    { headerName: "Position Name", field: "position_name", sortable: true},
    { headerName: "Active", field: "is_active"},
    { headerName: "Last Login", field: "last_login"}


  ];

  rowData: any;

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.rowData = this.http.get(`${environment.apiUrl}/api/profile/`);
  }

  
  
}
