import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardDetailsContentComponent } from './card-details-content/card-details-content.component';

const cardDetailsRoutes: Routes = [

    {
        path: '',
        component: CardDetailsContentComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(cardDetailsRoutes) ],
    exports: [ RouterModule ]
})

export class CardDetailsRoutingModule {}