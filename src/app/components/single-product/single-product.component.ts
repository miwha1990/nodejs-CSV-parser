import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


    constructor(private _dataService: DataService, private route: ActivatedRoute) {
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
                    console.info(this.productsData);
                }
            );
    }


    getSingleProduct(index: number) {
        this.singleProduct = this.productsData[index];
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
