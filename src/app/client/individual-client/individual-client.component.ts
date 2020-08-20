import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GridService} from '@app/_services/grid.service';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';
import {environment} from '@environments/environment';
import Responsive from 'datatables.net-responsive';


@Component({
  selector: 'app-individual-client',
  templateUrl: './individual-client.component.html',
  styleUrls: ['./individual-client.component.scss']
})
export class IndividualClientComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any;
  tdata: any;
  selectedRow: any;
  reqParam: HttpParams;
  filterParam: any = {};

  constructor(private http: HttpClient, private dtService: GridService, private toastr: ToastrService) {

  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  getSelectedRows() {
    let selected;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      selected = dtInstance.rows({selected: true}).data();
      if (selected.length > 0) {
        console.log(selected);
      }
      this.render();
      return selected;
    });
  }

  doubleClickHandler(rowdata: any): void {
    console.log(rowdata);
    this.getSelectedRows();
  }

  ngOnInit(): void {
    this.dtService.initDt('grid_client_individual').toPromise()   // Get Dt options from back by code_name
      .then((response) => {
        this.dtOptions = response;   // this.dtOptions is object stores our datatable config options from backend
        //  //  //
        this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
          this.reqParam = this.dtService.dtObjToHttpParam(dataTablesParameters);
          this.http.get(`${environment.apiUrl}` + this.dtOptions.dataPath.toString(), {params: this.reqParam}).subscribe(resp => {
            this.tdata = resp;
            callback({
              recordsTotal: this.tdata.recordsTotal,
              recordsFiltered: this.tdata.recordsFiltered,
              data: this.tdata.data
            });
          });
        };
        this.dtOptions.select = {
          style: 'os'  // make style value 'multi' to select multiple rows in a atable
        };
        // //
        this.dtOptions.responsive = {
          details: {
            display: Responsive.display.modal({
              header: function(row) {
                const data = row.data();
                return 'Details for ' + Object.values(data)[0] + ' ' + Object.values(data)[1];
              }
            }),
            renderer: Responsive.renderer.tableAll({
              tableClass: 'table'
            })
          }
        };
        this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('dblclick');
          $('td', row).bind('dblclick', () => {
            self.doubleClickHandler(data);
          });
          return row;
        };
        this.dtOptions.stateSave = true;
      })
      .catch((error) => {
        this.toastr.error('Error', error.toString());
      });

  }

  ngAfterViewInit(): void {
  }

}
