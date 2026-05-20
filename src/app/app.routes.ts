import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { AdminProductsComponent } from './admin/products/adminProducts.component';

export const routes: Routes = [
	{
		path:'',
		redirectTo: 'home',
		pathMatch:'full'
	},
	{
		path:'home',
		component:ProductsComponent
	},
	{
		path:'create-order',
		component: CreateOrderComponent
	},
	{
		path:'my-order',
		component: MyOrderComponent
	},
	{
		path:'products',
		component:AdminProductsComponent
	}
];
