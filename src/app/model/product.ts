export class Iproduct {
  productId: number
  productName: string
  shortName: string
  category: string
  sku: string
  price: number
  thumbnailImageUrl: string
  deliveryTimeSpan: string;

  constructor(){
	this.productId = 0,
	this.productName = '';
	this.shortName = '';
	this.category = '';
	this.sku = '';
	this.price = 0;
	this.thumbnailImageUrl = '';
	this.deliveryTimeSpan = '';
}
}

