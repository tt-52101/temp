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
  listOfOption: Array<{ label: string; value: string }> = [];
  year ='';
  months = [];
  selectform:FormGroup;
  ngOnInit() {
    this.selectform=this.fb.group({
      year:[null]
    });
    const children: Array<{ label: string; value: string }> = [
      {label:'2017',value:'2017'},
      {label:'2018',value:'2018'},
      {label:'2019',value:'2019'},
      {label:'2020',value:'2020'},
    ];
    this.listOfOption=children;
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
    this.http.get('biz/revenue').subscribe(res => {
      console.log(res);
      let j = 1;
      [...res.data].forEach(i => {
        this.months.push({
          key: j,
          Month: i.Month,
          Budget: i.Budget,
          Actual: i.Actual,
        });
      });
      this.months.forEach(i => {
        const field = this.createMonthData();
        field.patchValue(i);
        this.items.push(field);
      });
    });
  }

  createMonthData(): FormGroup {
    return this.fb.group({
      key: [null],
      Month: [null, [Validators.required]],
      Budget: [null, [Validators.required]],
      Actual: [null, [Validators.required]],
    });
  }
  show(){
    
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
  _submitForm() {
    const reqBody = { unit: 'RMB', data: this.items.value };
    console.log(reqBody);
    this.http.put('biz/revenue', reqBody).subscribe(res => console.log(res));
  }
}
