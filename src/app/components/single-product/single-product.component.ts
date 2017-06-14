import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { DataService } from '../../services/get-data.service';

@Component({
    selector: 'single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.sass']
})
export class SingleProductComponent implements OnInit {
    productIndex: number;
    singleProduct;
    productsData;


    constructor(private _dataService: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
        this.productIndex = 0;
    }


    ngOnInit() {
        this.getData();
    }


    getData() {
         this._dataService.getData()
            .subscribe(
                data => this.productsData = data,
                err => console.error('Error', err),
                () => {
                    this.getSingleProduct(this.productIndex);
                }
            );
    }


    getSingleProduct(index: number) {
        this.singleProduct = this.productsData[index];
        this.singleProduct['id'] = index;
        this.singleProduct['total'] = Object.keys(this.productsData).length;
        this.singleProduct['price_per_sqm'] = Math.floor((this.singleProduct['price'] / this.singleProduct['habitable']) * 100) / 100;
    }


    nextProduct(index: number) {
        if (index < this.productsData.length - 1) {
            this.productIndex = index + 1;
            this.getSingleProduct(this.productIndex);
        }
    }


    prevProduct(index: number) {
        if (index > 0) {
            this.productIndex = index - 1;
            this.getSingleProduct(this.productIndex);
        }
    }
}
