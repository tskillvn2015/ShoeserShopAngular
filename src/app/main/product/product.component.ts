import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 8;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public products: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
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
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  showEditModal(id: any) {
    this.loadProduct(id);
    this.modalAddEdit.show();
  }
  saveChange(valid: boolean) {
    console.log(this.entity);
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/product', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            if (response.Code === '200') {
              this.loadData();
              this.modalAddEdit.hide();
              this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
            } else {
              this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
            }

          }, error => this._dataService.handleError(error));
      }
      else {
        console.log(this.entity);
        this._dataService.put('/api/product', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            if (response.Code === '200') {
              this.loadData();
              this.modalAddEdit.hide();
              this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
            } else {
              this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
            }
          }, error => this._dataService.handleError(error));
      }
    }
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {

    this._dataService.delete('/api/product', 'id', id).subscribe((response: any) => {
      if (response.Code === '200') {
        this.entity = response.Content;
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      } else {
        this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
      }
    }, error => this._dataService.handleError(error));
  }
}
