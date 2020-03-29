import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MessageContstants } from 'src/app/core/common/message.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 2;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public products: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,private _utilityService:UtilityService) { }

  ngOnInit(): void {
    this._utilityService.navigate(UrlConstants.SHOP);
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/products?Name=' + this.filter + '&PageIndex=' + this.pageIndex + '&PageSize=' + this.pageSize)
      .subscribe((response: any) => {
        if (response.Code === '200') {
          this.products = response.Content.Items;
          this.pageIndex = response.Content.PageIndex;
          this.pageSize = response.Content.PageSize;
          this.totalRow = response.Content.TotalRecord;
        } else {
          this._notificationService.printErrorMessage(response['Code'] + ' : ' + response['Message']);
        }
      });
  }
  loadProduct(id: any) {
    this._dataService.get('/api/product/detail?id=' + id)
      .subscribe((response: any) => {
        if (response.Code === '200') {
          this.entity = response.Content;
        } else {
          this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
        }
      });
  }
  showEditModal(id: any) {
    this.loadProduct(id);
    this.modalAddEdit.show();
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  addToCart(valid : boolean){
    console.log(this.entity);
    this._dataService.post('/api/order', JSON.stringify(this.entity))
    .subscribe((response : any)=>{
      if(response.Code === '200'){
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }else{
        this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
      }
    }, error => this._dataService.handleError(error));
  }
  
}
