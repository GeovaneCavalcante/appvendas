import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosCreatePage } from './pedidos-create';

@NgModule({
  declarations: [
    PedidosCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosCreatePage),
  ],
})
export class PedidosCreatePageModule {}
