import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardAddContentComponent } from './card-add-content/card-add-content.component';
import { CardAddRoutingModule } from './card-add.routing.module';

@NgModule({
  imports: [
    CommonModule,
    CardAddRoutingModule
  ],
  declarations: [ CardAddContentComponent ],
  exports: [ CardAddContentComponent ]
})
export class CardAddModule { }
