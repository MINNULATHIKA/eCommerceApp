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
      productShortName: new FormControl(this.productObj.productShortName),
      categoryId: new FormControl(this.productObj.categoryId),
      productSku: new FormControl(this.productObj.productSku),
      productPrice: new FormControl(this.productObj.productPrice),
      productImageUrl: new FormControl(this.productObj.productImageUrl),
      deliveryTimeSpan: new FormControl(this.productObj.deliveryTimeSpan),
      createdDate : new FormControl(this.productObj.createdDate),
      productDescription : new FormControl(this.productObj.productDescription),
    })
  }
  loadProducts() {
    this.productSrv.getAllProducts().subscribe((res: any) => {
      this.productList.set(res.data);      
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
this.productForm.patchValue({
  createdDate: new Date().toISOString().split('T')[0]
});
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
