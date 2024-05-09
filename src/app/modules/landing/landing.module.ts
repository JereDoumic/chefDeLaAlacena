import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeModule } from '../recipe/recipe.module';
import { CarouselModule } from '../carousel/carousel.module';


@NgModule({
    declarations: [
        LandingPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RecipeModule,
        CarouselModule
    ]
})
export class LandingModule { }
