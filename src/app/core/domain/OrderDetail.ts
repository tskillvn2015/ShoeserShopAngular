import { Order } from "src/app/core/domain/Order";

export interface OrderDetail
{
    ID:string;
    OrderID :string;
    CustomerId :number;
    Price:number;
    Quantity:number;
    CreateDate:Date;
    Order : Order[];
}