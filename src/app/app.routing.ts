import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleProductComponent } from './components/single-product/single-product.component';


export const AppRoutes: Routes = [
    { path: 'product',  component: SingleProductComponent },
    { path: '', redirectTo: '/product', pathMatch: 'full' }
];
