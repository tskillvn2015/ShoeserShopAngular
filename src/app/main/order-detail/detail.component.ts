import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 2;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public orders: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,private _utilityService:UtilityService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id') == null){
      this._utilityService.navigate("/main/order");
    }
    this.filter = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadData();
  }
  
  loadData() {
    this._dataService.get('/api/orderdetails?Id=' + this.filter + '&PageIndex=' + this.pageIndex + '&PageSize=' + this.pageSize)
      .subscribe((response: any) => {
        if (response.Code === '200') {
          this.orders = response.Content.Items;
          this.pageIndex = response.Content.PageIndex;
          this.pageSize = response.Content.PageSize;
          this.totalRow = response.Content.TotalRecord;
        } else {
          this._notificationService.printErrorMessage(response['Code'] + ' : ' + response['Message']);
        }
      });
  }
  
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
}