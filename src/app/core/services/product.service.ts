  
import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenService } from './authen.service';
import { Product } from '../domain/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiURL:string="http://localhost:44318/api/product";
  constructor(private httpClient:HttpClient, private authService:AuthenService) { }

  saveProductInfo (product:any)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.getToken()});
        reqHeader.append('Content-Type', 'application/json');
        const formData: FormData = new FormData();
         formData.append('Price', product['Price']);
         formData.append('NameProduct', product.NameProduct.toString());
         formData.append('Category', product.Category.toString());
         formData.append('Quantity', product.Quantity.toString());
         formData.append('Description', product.Description.toString());
         formData.append('Size', product.Size.toString());
        
    return this.httpClient.post(this.apiURL,formData,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getAllProducts ()
  {
    return this.httpClient.get(this.apiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  addProductToCart(products: any) {
    localStorage.setItem("product", JSON.stringify(products));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
  
  removeProductFromCart(id : string){
      let listproduct : Product[];
      localStorage.getItem("product");
      listproduct = JSON.parse(localStorage.getItem("product"));
      var number = listproduct.findIndex(x => x.Id == id);
      listproduct.splice(number,1);
      localStorage.removeItem("product");
      localStorage.setItem("product", JSON.stringify(listproduct));
    }
  
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}