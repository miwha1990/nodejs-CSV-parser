import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DataService {
    constructor(private http: Http) {}

    getData():Observable<any> {
        return this.http.get('../../assets/data/properties.json')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
