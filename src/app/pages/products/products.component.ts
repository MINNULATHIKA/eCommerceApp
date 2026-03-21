import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { cartList, CartModel, Category, Iproduct, userData } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constants } from '../../constants';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productSrv = inject(ProductService);                // same as dependency injection , from angular 17 onwards it has inject property
  productList = signal<Iproduct[]>([]);
  productObj: Iproduct = new Iproduct(); // initialized as empty
  cartListObj: cartList[] = [];
  categoryList: Observable<Category[]> = new Observable<Category[]>;
  subscriptionList: Subscription[] = [];
  loggedUserData: userData = new userData();

  constructor() {
    const isUser = localStorage.getItem(Constants.LOCAL_KEY);
    if (isUser != null) {
      const parsObj = JSON.parse(isUser);
      this.loggedUserData = parsObj;
    }
    console.log(this.loggedUserData);

  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    })
  }
  ngOnInit(): void {
    this.loadProducts();
    this.categoryList = this.productSrv.getAllCategory()
      .pipe(map(res => res.data));
  }

  loadProducts() {
    this.subscriptionList.push(this.productSrv.getAllProducts().subscribe((res: any) => {
      this.productList.set(res.data);
    }));
  }

  getAllProductsByCategoryId(categoryId: number) {
    this.productSrv.getAllProductsByCategoryId(categoryId).subscribe((res: any) => {
      this.productList.set(res.data)
    })
  }

  addToCart(id: number) {
    this.productSrv.getCartProductsByCustomerId(this.loggedUserData.custId)
      .subscribe((res: any) => {
        if (res.result) {
          this.cartListObj = res.data;
          const existingItem = this.cartListObj.find(
            (x: any) => x.productId === id
          );
          const newObj: CartModel = new CartModel();
          if (existingItem) {
            newObj.CartId = existingItem.cartId;
            newObj.Quantity = existingItem.quantity + 1;
          }
          else{
             newObj.CartId = 0;
            newObj.Quantity = 1;
          }
          newObj.ProductId = id;
          newObj.CustId = this.loggedUserData.custId;
          this.productSrv.addToCart(newObj).subscribe((res: any) => {
            if (res.result) {
              alert("Product Added to Cart");
              this.productSrv.onCartAdded.next(true);
            } else {
              alert(res.message);
            }
          });

        }

      });
  }



}
