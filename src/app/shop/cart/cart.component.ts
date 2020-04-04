import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from 'src/app/core/domain/product.entity';
import { ProductService } from 'src/app/core/services/product.service';
import { IAlert } from 'src/app/core/domain/IAlert';
import { OrderDetail } from 'src/app/core/domain/OrderDetail';
import { AuthenService } from 'src/app/core/services/authen.service';
import { Order } from 'src/app/core/domain/Order';
import { OrderService } from 'src/app/core/services/order.service';
import { Registration } from 'src/app/core/domain/User';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/core/domain/loggedin.account';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  dafualtQuantity: number = 1;
  productAddedTocart: Product[];
  allTotal: number;

  tempEntity: any;

  tempProduct: any;

  _authenService: AuthenService;
  loading = false;
  model: any = {};
  private user: LoggedInUser;

  order: Order[];
  currentUser: Registration[];

  deliveryForm: FormGroup;

  public globalResponse: any;
  public alerts: Array<IAlert> = [];
  public entity: any[];
  products: any[];
  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private authenService: AuthenService,
    private orderService: OrderService,
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService, ) {
    this._authenService = authenService;
    this._dataService = dataService;
    this._notificationService = notificationService;
  }

  loadData() {
    this.productAddedTocart = this.productService.getProductFromCart();
    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].Quantity = 1;
    }
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
  }

  ngOnInit() {
    this.loadData();
    
    //delivery

  }
  onRemoveProduct(id: string) {
    this.productAddedTocart = this.productService.getProductFromCart();
    var product = this.productAddedTocart.find(p => p.Id == id);
    this.productService.removeProductFromCart(id);
    this.loadData();
  }
  loadProduct() {
    this._dataService.get('/api/product/')
      .subscribe((response: any) => {
        if (response.Code === '200') {
          this.entity = response.Content;
        } else {
          this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
        }
      });
  }
  onAddQuantity(product: Product) {
    //Get Product
    this.productAddedTocart = this.productService.getProductFromCart();
    var products = this.loadProduct();
    console.log(products);
    this.productAddedTocart.find(p => p.Id == product.Id).Quantity = product.Quantity + 1;

    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
  }

  onRemoveAllProductFromCart(){
    this.productService.removeAllProductFromCart();
    this.loadData();
  }

  onRemoveQuantity(product: Product) {
    this.productAddedTocart = this.productService.getProductFromCart();
    var count = this.productAddedTocart.find(p => p.Id == product.Id).Quantity = product.Quantity - 1;
    if (count <= 0) {
      this.productAddedTocart.find(p => p.Id == product.Id).Quantity = product.Quantity = 0;
    } else {
      this.productService.removeAllProductFromCart();
      this.productService.addProductToCart(this.productAddedTocart);
      this.calculteAllTotal(this.productAddedTocart);
    }
  }

  calculteAllTotal(allItems: Product[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + (allItems[i].Quantity * allItems[i].Price);
    }
    this.allTotal = total;
  }

  ConfirmOrder1() {
    if (this.IsAuthenticatedCustomer() == true) {
      console.log("chay o if")
      if (this.entity == undefined) {
        this.entity = [];
      }
      if (this.productAddedTocart != null) {
        for (let i in this.productAddedTocart) {
          this.tempEntity = {
            idProduct: this.productAddedTocart[i].Id,
            quantity: this.productAddedTocart[i].Quantity,

          };
          this.entity.push(this.tempEntity);
          console.log(this.entity[i].idProduct);

        }
        this._dataService.post('/api/order', JSON.stringify(this.entity))
          .subscribe((response: any) => {

            if (response.Code === '200') {
              //this.loadData();
              //this.modalAddEdit.hide();
              console.log("chay toi create r");
              this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
              this.onRemoveAllProductFromCart();
            } else {
              // this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
              
                this.alerts.push({
                  id: 1,
                  type: 'warning',
                  message: 'Your Order quantity product greater than quantity product shop have. Please input again!!'
                });
                setTimeout(()=>{   
                  this.closeAlert(this.alerts);
             }, 3000);
              
            }
          }, error => this._dataService.handleError(error));
         
      }
    } else {
      console.log("chay o else")
     this._notificationService.printErrorMessage("You must be login before Confirm Order!!!");
   }
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  IsAuthenticatedCustomer(): boolean {
    return this._authenService.isUserAuthenticated();
  }
}


