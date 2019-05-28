import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-teamset-target',
  templateUrl: './target.component.html',
})
export class SettingTeamsetTargetComponent implements OnInit {
  constructor(private http: _HttpClient, private fb: FormBuilder) {}
  editIndex = -1;
  editObj = {};

  form: FormGroup;
  get items() {
    return this.form.controls.items as FormArray;
  }
 
  
  ngOnInit() {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
    this.http.get('biz/revenue').subscribe(
      res=>{
        console.log(res);
        [...res.data].forEach(i => {
          const field = this.createMonthData();
          field.patchValue(i);
          this.items.push(field);
        });
      }
    );
    
  }
  
  createMonthData(): FormGroup {
    return this.fb.group({
      Month: [null, [Validators.required]],
      Budget: [null, [Validators.required]],
      Actual: [null, [Validators.required]],
    });
  }
  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.items.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.items.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.items.at(index).markAsDirty();
    if (this.items.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.items.at(index).value.key) {
      this.del(index);
    } else {
      this.items.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }
  del(index: number) {
    this.items.removeAt(index);
  }
  _submitForm(){
    const reqBody={unit:'RMB',data:this.items.value};
    console.log(reqBody);
    this.http.put('biz/revenue',reqBody).subscribe(
      res=>console.log(res)
    )
  }
}
