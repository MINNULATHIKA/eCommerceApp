import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }               // dependency injection

  getAllProducts(): Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>('api/Products');
  }

getSingleProduct(id: number): Observable<Iproduct>{
  return this.http.get<Iproduct>(`api/Products/getSingleProduct?id=${id}`);
}

  saveProduct(obj: Iproduct) : Observable<Iproduct>{
    return this.http.post<Iproduct>('api/Products',obj)
  }

   deleteProduct(id : Number) : Observable<Iproduct>{
    return this.http.delete<Iproduct>(`api/Products/deleteProduct?id=${id}`)
  }

    updateProduct(obj: Iproduct) : Observable<Iproduct>{
    return this.http.put<Iproduct>('api/Products',obj)
  }
}
