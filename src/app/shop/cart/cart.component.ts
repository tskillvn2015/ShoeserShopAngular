import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Item } from 'src/app/core/domain/item.entity';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Product } from 'src/app/core/domain/product.entity';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { MessageContstants } from 'src/app/core/common/message.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  public result : any;
  constructor(private activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _notificationService: NotificationService) { }
 
  findProduct(id : string) : void{
    this._dataService.get('/api/product/detail?id=' + id)
    .subscribe((response: any) => {
      if (response.Code === '200') {
        var product : Product = {
            id : response.Content.Id,
            name : response.Content.Name,
            price : response.Content.Price, 
        }
        console.log(product);
           this.result = product; 
           console.log(this.result);
      } else {
        this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
      }
    },error => {
        this._notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
    }
    );
  }
  ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
        this.findProduct(id);
        console.log(this.result);
				var item: Item = {
					product: this.result,
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
					cart.push(JSON.stringify(item));
					localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart();
			} else {
				this.loadCart();
			}
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
	}
  increaseQuantity(id : string) : void{
    let cart = [];
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.find(x => x.product.Id == id).quantity += 1;
    this.loadCart();
  }
  decreaseQuantity(id : string) : void{
    let cart = [];
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.find(x => x.product.Id == id).quantity -= 1;
    this.loadCart();
  }
	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}


}


