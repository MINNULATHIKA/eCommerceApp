export class Iproduct {
 productId: number
  productSku: string
  productName: string
  productPrice: number
  productShortName: string
  productDescription: string
  createdDate: string
  deliveryTimeSpan: string
  categoryId: number
  productImageUrl: string
  categoryName: string

  constructor(){
	this.productId = 0,
	this.productName = '';
	this.productShortName = '';
	this.categoryName = '';
	this.productSku = '';
	this.productPrice = 0;
	this.productImageUrl = '';
	this.deliveryTimeSpan = '';
  this.productDescription = '';
  this.createdDate = '';
  this.categoryId = 0;
}
}

export interface Category{
  categoryId: number,
  categoryName: string,
  parentCategoryId: number,
  userId: number,
}

export class userData{
  custId: number
  name: string
  mobileNo: string
  password: string

  constructor(){
    this.custId = 0;
    this.name = "";
    this.mobileNo = "";
    this.password = "";
  }
}

export class loginUserData{
  userName : String
  userPassword: String

  constructor(){
    this.userName = "";
    this.userPassword = "";
  }
}

export class CartModel{
  CartId: number;
  CustId: number;
  ProductId: number;
  Quantity: number;
  AddedDate: Date;

  constructor(){
    this.CartId = 0;
    this.CustId = 0;
    this.ProductId = 0;
    this.Quantity = 1;
    this.AddedDate = new Date();
  }
}

  export class cartList {
  cartId: number
  custId: number
  productId: number
  quantity: number
  productShortName: string
  addedDate: string
  productName: string
  categoryName: string
  productImageUrl: string
  productPrice: number

  constructor(){
    this.cartId = 0;
    this.custId = 0;
    this.productId = 0;
    this.quantity = 0;
    this.productShortName = "";
    this.addedDate = "";
    this.productName = "";
    this.categoryName = "";
    this.productImageUrl = "";
    this.productPrice = 0;

  }
  }

