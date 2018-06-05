import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientUpdatePage } from './client-update';

@NgModule({
  declarations: [
    ClientUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientUpdatePage),
  ],
})
export class ClientUpdatePageModule {}
