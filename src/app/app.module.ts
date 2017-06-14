import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routing';

import { DataService } from './services/get-data.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SimilarItemsComponent } from './components/similar-items/similar-items.component';

@NgModule({
    declarations: [
      AppComponent,
      SingleProductComponent,
      FooterComponent,
      HeaderComponent,
      SimilarItemsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CarouselModule.forRoot(),
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [ DataService, { provide: CarouselConfig, useValue: {interval: 99999, noPause: true}} ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
