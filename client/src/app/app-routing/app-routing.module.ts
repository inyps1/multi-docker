import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FibComponent } from '../fib/fib.component';
import { OtherComponent } from '../other/other.component';

const routes: Routes =[
  {
    path: 'fib',
    component: FibComponent,
  },
  {
    path: 'other',
    component: OtherComponent,
  },
  {
    path:'',
    redirectTo:'fib',
    pathMatch:'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
