import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routing';

import { DataService } from './services/get-data.service';

import { AppComponent } from './app.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
    declarations: [
      AppComponent,
      SingleProductComponent,
      FooterComponent,
      HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [ DataService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
