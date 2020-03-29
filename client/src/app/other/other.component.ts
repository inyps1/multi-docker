import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  onBackToHome(){
    this._router.navigate(['/']);
  }
}
