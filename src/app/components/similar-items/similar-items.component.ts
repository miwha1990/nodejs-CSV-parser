import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/get-data.service';
@Component({
  selector: 'app-similar-items',
  templateUrl: './similar-items.component.html',
  styleUrls: ['./similar-items.component.sass']
})
export class SimilarItemsComponent implements OnInit {
  similars;
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._dataService.get4Similar()
        .subscribe(
            data => { this.similars = data; console.log(data); },
            err => console.error('Error', err)
        );
  }

}
