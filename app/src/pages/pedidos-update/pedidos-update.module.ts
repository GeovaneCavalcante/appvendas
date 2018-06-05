import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosUpdatePage } from './pedidos-update';

@NgModule({
  declarations: [
    PedidosUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosUpdatePage),
  ],
})
export class PedidosUpdatePageModule {}
