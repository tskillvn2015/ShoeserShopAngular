import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenService } from 'src/app/core/services/authen.service';
import { OrderDetail } from 'src/app/core/domain/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public apiURL:string="http://localhost:44318/api/order";
  constructor(private httpClient:HttpClient, private authService:AuthenService) { }

  PlaceOrder (orderDetail:OrderDetail)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.getToken()});
        reqHeader.append('Content-Type', 'application/json');
          
    return this.httpClient.post(this.apiURL,orderDetail,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
 
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}