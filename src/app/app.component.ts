import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { cartList, CartModel, loginUserData, userData } from './model/product';
import { ProductService } from './service/product.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ɵInternalFormsSharedModule, FormsModule, NgIf,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('registerModel') modal: ElementRef | undefined;
  productSrv = inject(ProductService);
  title = 'Project1';
  userObj: userData = new userData();
  loginObj: loginUserData = new loginUserData();
  loggedUserData: userData = new userData();
  cartListObj: cartList[] = [];
  isLogin = false;
  isCartPopUpOpen : boolean = false;
  shippingCharge: number = 5;
  totalAmount : number = 0;


  ngOnInit(): void {
    const isUser = localStorage.getItem(Constants.LOCAL_KEY);
    if (isUser != null) {
      const parsObj = JSON.parse(isUser);
      this.loggedUserData = parsObj;
    }
    this.productSrv.onCartAdded.subscribe((res:boolean)=>{
      if(res){
    this.getCartProductsByCustomerId();
      }
    })
  }

  openModalPopup() {
    if (this.modal) {
      const modal = new bootstrap.Modal(this.modal.nativeElement);
      modal.show();
    }
  }

  registerNewUser() {
    this.productSrv.registerNewCustomer(this.userObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert('New User Added');
          this.closeModalpopup();
        }
      },
      (error: any) => {
        alert('API Error');
      }
    );
  }

  closeModalpopup() {
    if (this.modal) {
      const modalInstance = bootstrap.Modal.getInstance(this.modal.nativeElement);
      modalInstance?.hide();
    }
  }

  openLoginPopup() {
    this.isLogin = true;
    this.openModalPopup();
  }

  onLogin() {
    this.productSrv.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        this.loggedUserData = res.data;
        localStorage.setItem(Constants.LOCAL_KEY, JSON.stringify(res.data));
        this.closeModalpopup();
      }
      else {
        alert(res.message)
      }
    })
  }

  logOff() {
    localStorage.removeItem(Constants.LOCAL_KEY);
    this.loggedUserData = new userData();
  }

  showCartPopup() {
    this.isCartPopUpOpen = !this.isCartPopUpOpen;
    if(this.isCartPopUpOpen){
    this.getCartProductsByCustomerId();
    }
  }

getCartProductsByCustomerId(){
    this.productSrv.getCartProductsByCustomerId(this.loggedUserData.custId).subscribe((res: any) => {
      if (res.result) {
        this.cartListObj = res.data || [];

        this.totalAmount = this.cartListObj.reduce((total, item) => {
          const qty = item.quantity > 0 ? item.quantity : 1;
          return total + (item.productPrice * qty);
        }, 0);
      }
    })
}


  removeFromCart(id:number){
    this.productSrv.deleteProductFromCartById(id).subscribe((res: any) => {
    this.getCartProductsByCustomerId();
    })
 }

 reduceCartQuantity(item:any){
   const newObj: CartModel = new CartModel();
    newObj.CartId = item.cartId;
    newObj.Quantity = item.quantity - 1;
    newObj.ProductId = item.productId;
    newObj.CustId = this.loggedUserData.custId;
    this.productSrv.addToCart(newObj).subscribe((res: any) => {
      if (res.result) {
        this.productSrv.onCartAdded.next(true);
      } else {
        alert(res.message);
      }
    });
  }

  addCartQuantity(item: any) {
    const newObj: CartModel = new CartModel();
    newObj.CartId = item.cartId;
    newObj.Quantity = item.quantity + 1;
    newObj.ProductId = item.productId;
    newObj.CustId = this.loggedUserData.custId;
    this.productSrv.addToCart(newObj).subscribe((res: any) => {
      if (res.result) {
        this.productSrv.onCartAdded.next(true);
      } else {
        alert(res.message);
      }
    });
  }
}
