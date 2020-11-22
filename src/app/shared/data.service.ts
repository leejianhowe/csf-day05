import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormData } from './data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class DataService {
  @Output() amount = new EventEmitter<FormData>();
  constructor(private http: HttpClient) {}
  store: FormData;

  getPrice() {
    return this.http
      .get('https://api.coindesk.com/v1/bpi/currentprice/SGD.json', {
        headers: { accept: 'application/json' },
      })
      .pipe(
        map((responseData) => {
          const dataArray = [];
          for (const key in responseData) {
            console.log('key', key);
            if (responseData.hasOwnProperty(key)) {
              if (key== 'disclaimer') {
                dataArray.push(responseData[key])
              } else {
                dataArray.push({ ...responseData[key], id: key });
              }
            }
          }
          // console.log(dataArray);
          return dataArray;
        })
      )
      
  }
}
