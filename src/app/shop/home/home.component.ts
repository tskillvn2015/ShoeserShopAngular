import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Product } from 'src/app/core/domain/product.entity';
import { ProductDisplay } from 'src/app/core/domain/ProductDisplay';
import { IAlert } from 'src/app/core/domain/IAlert';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { provideRoutes } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProductService]
})
export class HomeComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 8;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public products: any[];
  public entity: any;
  allProducts: ProductDisplay[];
  productAddedTocart:Product[];
  cartItemCount: number = 0;
  public globalResponse: any;
  public alerts: Array<IAlert> = [];
  constructor(private _dataService: DataService, private _notificationService: NotificationService,private _utilityService:UtilityService
   , private productService:ProductService,private sharedService:SharedService) { }

   public closeAlert(alert:any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 
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
          console.log(this.products);
          var count = this.productService.getProductFromCart().length;
          console.log(count);
          this.cartItemCount = count;
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
  OnAddCart(product:Product)
            {
              console.log(product);
              
              this.productAddedTocart=this.productService.getProductFromCart();
              if(this.productAddedTocart==null)
              {
                this.productAddedTocart=[];
                this.productAddedTocart.push(product);
                this.productService.addProductToCart(this.productAddedTocart);
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Product added to cart.'
                });
                setTimeout(()=>{   
                  this.closeAlert(this.alerts);
             }, 3000);

              }
              else
              {
                let tempProduct=this.productAddedTocart.find(p=>p.Id==product.Id);
                if(tempProduct==null)
                {
                  this.productAddedTocart.push(product);
                  this.productService.addProductToCart(this.productAddedTocart);
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Product added to cart.'
                  });
                  //setTimeout(function(){ }, 2000);
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }
                else
                {
                  this.alerts.push({
                    id: 2,
                    type: 'warning',
                    message: 'Product already exist in cart.'
                  });
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }
                
              }
              //console.log(this.cartItemCount);
              this.cartItemCount=this.productAddedTocart.length;
              // this.cartEvent.emit(this.cartItemCount);
              this.sharedService.updateCartCount(this.cartItemCount);
            }
             
              
  }

