import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ProductService } from '../../service/product.service';
import { Iproduct } from '../../model/product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adminProducts.component.html',
  styleUrl: './adminProducts.component.css'
})
export class AdminProductsComponent implements OnInit {

  @ViewChild('newModal') modal: ElementRef | undefined;
  productSrv = inject(ProductService);                // same as dependency injection , from angular 17 onwards it has inject property
  productList = signal<Iproduct[]>([]);
  productObj: Iproduct = new Iproduct();
  productForm: FormGroup = new FormGroup({}); // initialized as empty

  constructor() {
    this.initializeForm();
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  initializeForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(this.productObj.productId),
      productName: new FormControl(this.productObj.productName, [Validators.required,Validators.minLength(4)]),
      shortName: new FormControl(this.productObj.shortName),
      category: new FormControl(this.productObj.category),
      sku: new FormControl(this.productObj.sku),
      price: new FormControl(this.productObj.price),
      thumbnailImageUrl: new FormControl(this.productObj.thumbnailImageUrl),
      deliveryTimeSpan: new FormControl(this.productObj.deliveryTimeSpan)
    })
  }
  loadProducts() {
    this.productSrv.getAllProducts().subscribe((res: Iproduct[]) => {
      this.productList.set(res);
    })
  }

  openModal() {
    if (this.modal) {
      const modal = new bootstrap.Modal(this.modal.nativeElement);
      modal.show();
    }
  }


  closeModal() {
    if (this.modal) {
      const modal = new bootstrap.Modal(this.modal.nativeElement);
      modal.hide();
    }
   this.productForm.reset();
  }

  saveProduct() {
    this.productSrv.saveProduct(this.productForm.value).subscribe((res: Iproduct) => {
      alert('Product Created');
      this.loadProducts();
      this.closeModal();
    }, error => {
      alert('api Error')
    })
  }

  onDelete(productId: Number) {
    const isConfirm = confirm("Are you sure to Delete ?");
    if (isConfirm) {
      this.productSrv.deleteProduct(productId).subscribe((res: Iproduct) => {
        alert('Product Deleted');
        this.loadProducts();
      }, error => {
        alert('api Error')
      })
    }
  }

  onEdit(productId: number) {
    this.productSrv.getSingleProduct(productId).subscribe((res:Iproduct) =>{
      this.productObj = res;
     this.initializeForm();
     this.openModal();
    },error =>{
      alert('api Error')
    })
  }

   updateProduct() {
    this.productSrv.updateProduct(this.productForm.value).subscribe((res: Iproduct) => {
      alert('Product Updated');
      this.loadProducts();
      this.closeModal();
    }, error => {
      alert('api Error')
    })
  }
}
