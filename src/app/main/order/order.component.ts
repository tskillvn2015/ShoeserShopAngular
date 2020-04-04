import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 8;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public orders: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,private _utilityService:UtilityService,private _router:Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this._dataService.get('/api/orders?NameOrder=' + this.filter + '&PageIndex=' + this.pageIndex + '&PageSize=' + this.pageSize)
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
  navigateToDetail(id:string){
    
    this._router.navigate(['/main/order/detail',id]);

  }
}

