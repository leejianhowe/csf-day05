import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  defaults = {
    dob: null,
    // orderDate: null,
    displayPrice: null,
    rate_float: null,
    orderUnit: null,
    cryptoName: 'SGD/BTC',
  };
  amount: string;
  maxDate: string = '';
  currentDate = new Date();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    // this tojson JSON dates convert to same Format as ISO-8601
    // this.maxDate = this.currentDate.toJSON().split('T')[0];
    this.currentDate.setHours(0, 0, 0, 0);
    let oldYear = this.currentDate.getFullYear() - 21;
    // this.currentDate.setFullYear(oldYear);
    console.log('max year', oldYear);

    // returns january as '0' december as '11'
    let oldMonth = this.currentDate.getMonth() + 1;
    console.log('max month', oldMonth);

    // set day
    let oldDay = this.currentDate.getDate();
    console.log('max day', oldDay);
    this.maxDate = oldYear + '-' + oldMonth + '-' + oldDay;
    console.log('MAX DATE', this.maxDate);
    this.dataService.getPrice().subscribe((data) => {
      this.defaults.displayPrice = data[2].SGD.rate;
      console.log(typeof this.defaults.displayPrice)
      this.defaults.rate_float = data[2].SGD.rate_float;
    });
  }

  // calculate the amount in SGD
  updateAmount() {
    console.log(this.defaults.rate_float);
    console.log(this.defaults.orderUnit);
    this.amount =
      (parseFloat(this.defaults.rate_float) * parseFloat(this.defaults.orderUnit)).toFixed(2);
    console.log(this.amount)
  }
  // submit form
  onSubmit(event) {
    console.log('form values', event.value);
    this.dataService.store = event.value;
    console.log('data stored', this.dataService.store);
    this.router.navigate(['/results']);
  }
  // reset form
  onReset(form) {
    form.reset();
  }

  // debugging
  get diagnostic() {
    return JSON.stringify([this.defaults, this.amount]);
  }
}
