import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  CartModel, Iproduct, loginUserData, userData } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }               // dependency injection

  onCartAdded : Subject<boolean> = new Subject<boolean> // subject is used for communication between component . here i we add add any product in cart ,  cart should updated automatically

  getAllProducts(): Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>('api/BigBasket/GetAllProducts');
  }

getSingleProduct(id: number): Observable<Iproduct>{
  return this.http.get<Iproduct>(`api/BigBasket/GetProductById?id=${id}`);
}

  saveProduct(obj: Iproduct) : Observable<Iproduct>{
    return this.http.post<Iproduct>('api/BigBasket/CreateProduct',obj)
  }

   deleteProduct(id : Number) : Observable<Iproduct>{
    return this.http.get<Iproduct>(`api/BigBasket/DeleteProductById?id=${id}`)
  }

    updateProduct(obj: Iproduct) : Observable<Iproduct>{
    return this.http.put<Iproduct>('api/BigBasket/UpdateProduct',obj)
  }

  getAllCategory(): Observable<any>{
    return this.http.get<any>('api/BigBasket/GetAllCategory');
  }

  getAllProductsByCategoryId(id:number): Observable<any>{
    return this.http.get<any>(`api/BigBasket/GetAllProductsByCategoryId?id=${id}`);
  }

  registerNewCustomer(obj : userData): Observable<any>{
    return this.http.post<any>('api/BigBasket/RegisterCustomer',obj);
  }

  login(obj : loginUserData): Observable<any>{
    return this.http.post<any>('api/BigBasket/login',obj);
  }

  addToCart(obj: CartModel):Observable<any>{
    return this.http.post<any>('api/BigBasket/AddToCart',obj);
  }
  
  getCartProductsByCustomerId(id:number):Observable<any>{
    return this.http.get<any>(`api/BigBasket/GetCartProductsByCustomerId?id=${id}`);
  }

  deleteProductFromCartById(id:number):Observable<any>{
        return this.http.get<any>(`api/BigBasket/DeleteProductFromCartById?id=${id}`);
  }
}
