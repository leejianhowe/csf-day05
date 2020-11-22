import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ResultsComponent } from './components/results.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
