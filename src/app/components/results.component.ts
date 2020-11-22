import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {

  constructor(private dataService: DataService) { }
  
  result = this.dataService.store
  amount: string
  price: string
  
  ngOnInit(): void {
    this.dataService.getPrice().subscribe((data) => {
      this.price = data[2].SGD.rate
      this.amount = (parseFloat(data[2].SGD.rate_float) * this.result.orderUnit).toFixed(2)
    })

  }
}
