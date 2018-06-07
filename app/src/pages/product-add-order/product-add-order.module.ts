import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAddOrderPage } from './product-add-order';

@NgModule({
  declarations: [
    ProductAddOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAddOrderPage),
  ],
})
export class ProductAddOrderPageModule {}
