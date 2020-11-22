import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';

import { DataService } from './shared/data.service';
import { ResultsComponent } from './components/results.component';
import { CheckDate } from './shared/date.validator';

@NgModule({
  declarations: [AppComponent, FormComponent, ResultsComponent, CheckDate],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
