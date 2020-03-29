import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-fib',
  templateUrl: './fib.component.html',
  styleUrls: ['./fib.component.css']
})
export class FibComponent implements OnInit {

  seenIndexes = '';
  values = {};
  index = '';
  entries = [];
  fibForm: FormGroup;

  constructor(private fb : FormBuilder,private _dbService: DatabaseService) { }

  ngOnInit() {
    this.fibForm = this.fb.group({
      index : ['',Validators.required]
    });
    this.fetchValues();
    this.fetchIndexes();
  }
  onSubmit(){
    this._dbService.saveIndex(this.fibForm.value).subscribe((response : any) => {
      this.fetchIndexes();
      this.fetchValues();
      this.fibForm.reset();
    });
  }

  fetchValues(){
    this._dbService.fetchValues().subscribe((response: any) =>{
      this.values = response;
      this.entries = [];
      for (let key in this.values) {
        this.entries.push({
          key: key,
          value: this.values[key]
        })
      }
    });
  }
  fetchIndexes(){
    this._dbService.fetchIndexes().subscribe((response: any) =>{
      this.seenIndexes = '';
     for(let i = 0; i < response.length; i++){
      this.seenIndexes += response[i].number+','
     }
     this.seenIndexes = this.seenIndexes.substring(0, this.seenIndexes.length - 1);
    });
  }

}
