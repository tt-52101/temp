import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting-teamset-target',
  templateUrl: './target.component.html',
})
export class SettingTeamsetTargetComponent implements OnInit {
  constructor(private http: _HttpClient, private fb: FormBuilder,public msg:NzMessageService) {}
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
    
    const children: Array<{ label: string; value: string }> = [
      {label:'2017',value:'2017'},
      {label:'2018',value:'2018'},
      {label:'2019',value:'2019'},
      {label:'2020',value:'2020'},
    ];
    this.listOfOption=children;
    this.year='2019';
    this.show('2019');
    this.form = this.fb.group({
      items: this.fb.array([]),
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
    const reqBody = { unit: 'RMB',year:this.year, data: this.items.value };
    console.log(reqBody);
    this.http.put(`biz/revenue`, reqBody).subscribe(res => {
      if(res.Message==='OK'){
        this.msg.success('成功！');
      }
      else{
        this.msg.error(res.Message);
      }
    },
    err=>this.msg.error(err),
    ()=>{});
  }
  show(value:any){
    console.log(value);
    this.http.get(`biz/revenue/${value}`).subscribe(res => {
      if(res.Message){
        this.msg.error(res.Message);
        this.form = this.fb.group({
          items: this.fb.array([]),
        });
        return;
      }else{
        console.log(res);
        let j = 1;
        let dd=[];
        [...res.data].forEach(i => {
          dd.push({
            key: j,
            Month: i.Month,
            Budget: i.Budget,
            Actual: i.Actual,
          });
          j++;
        });
       
        this.form = this.fb.group({
          items: this.fb.array([]),
        });
        dd.forEach(i => {
          const field = this.createMonthData();
          field.patchValue(i);
          
          this.items.push(field);
        });
        this.msg.success('成功！');
      }
        
     
        
      
    },
    err=>this.msg.error(err),
    ()=>{});
  }
}
