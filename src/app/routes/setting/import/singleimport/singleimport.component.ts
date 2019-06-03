import { NzMessageService, arraysEqual } from 'ng-zorro-antd';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-setting-import-singleimport',
  templateUrl: './singleimport.component.html',
})
export class SettingImportSingleimportComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}
  stepText = '执行';
  context = '';

  currentStep = 1;

  status = 'process';
  creds = 'currentDomainNo=' + 'patrickc' + '&computerName=' + 'CCHNHZHL0027';
  public headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  requestForm: FormGroup;

  controlArray: Array<{
    id: number;
    controlInstance1: string;
    controlInstance2: string;
  }> = [];
  bodyArray: Array<{
    id: number;
    controlInstance1: string;
    controlInstance2: string;
  }> = [];
  addParamField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.controlArray.length > 0
        ? this.controlArray[this.controlArray.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance1: `param${id}key`,
      controlInstance2: `param${id}value`,
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[this.controlArray.length - 1]);
    this.requestForm.addControl(
      this.controlArray[index - 1].controlInstance1,
      new FormControl(null, Validators.required),
    );
    this.requestForm.addControl(
      this.controlArray[index - 1].controlInstance2,
      new FormControl(null, Validators.required),
    );
  }
  addBodyField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.bodyArray.length > 0
        ? this.bodyArray[this.bodyArray.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance1: `body${id}key`,
      controlInstance2: `body${id}value`,
    };
    const index = this.bodyArray.push(control);
    console.log(this.bodyArray[this.bodyArray.length - 1]);
    this.requestForm.addControl(
      this.bodyArray[index - 1].controlInstance1,
      new FormControl(null, Validators.required),
    );
    this.requestForm.addControl(
      this.bodyArray[index - 1].controlInstance2,
      new FormControl(null, Validators.required),
    );
  }

  removeParamField(
    i: { id: number; controlInstance1: string; controlInstance2: string },
    e: MouseEvent,
  ): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      console.log(this.controlArray);
      this.requestForm.removeControl(i.controlInstance1);
      this.requestForm.removeControl(i.controlInstance2);
    }
  }

  removeBodyField(
    i: { id: number; controlInstance1: string; controlInstance2: string },
    e: MouseEvent,
  ): void {
    e.preventDefault();
    if (this.bodyArray.length > 1) {
      const index = this.bodyArray.indexOf(i);
      this.bodyArray.splice(index, 1);
      console.log(this.bodyArray);
      this.requestForm.removeControl(i.controlInstance1);
      this.requestForm.removeControl(i.controlInstance2);
    }
  }
  getFormControl(name: string): AbstractControl {
    return this.requestForm.controls[name];
  }

  ngOnInit() {
    this.requestForm = this.fb.group({
      requestType: ['', [Validators.required]],
      baseUrl: ['', [Validators.required]],
      requestUrl: ['', [Validators.required]],
    });
  }
  paramArray = [];
  createParamString() {
    const data = this.requestForm.value;
    const param = Object.keys(data)
      .filter(f => f.startsWith('param'))
      .filter(f => f.endsWith('key'))
      .reduce((obj, f, cur, arr) => {
        const key = data[f];
        const vkey = f.substring(0, 6) + 'value';
        const value = data[vkey];
        obj[key] = value;
        return obj;
      }, {});
    console.log(param);
    return param;
    // let st=''
    // for(let key in param){
    //   st+=key+'='+param[key]+'&';
    // }
    // if(st.lastIndexOf('&')===st.length-1){
    //   st=st.substring(0,st.length-2);
    // }
    // console.log(st);
    // return st;
  }
  createBodyString() {
    const data = this.requestForm.value;
    const param = Object.keys(data)
      .filter(f => f.startsWith('body'))
      .filter(f => f.endsWith('key'))
      .reduce((obj, f, cur, arr) => {
        const key = data[f];
        const vkey = f.substring(0, 5) + 'value';
        const value = data[vkey];
        obj[key] = value;
        return obj;
      }, {});
    console.log(param);
    return param;
    // let st=''
    // for(let key in param){
    //   st+=key+'='+param[key]+'&';
    // }
    // if(st.lastIndexOf('&')===st.length-1){
    //   st=st.substring(0,st.length-2);
    // }
    // console.log(st);
    // return st;
  }
  submit() {
    const params = this.createParamString();
    const body = this.createBodyString();
    console.log(params);
    console.log(body);
    let url = '';
    const mode = this.requestForm.value.requestType;
    switch (mode) {
      case 'GET':
        {
          url =
            this.requestForm.value.baseUrl +
            '/' +
            this.requestForm.value.requestUrl;
          console.log(url);
          this.http
            .get(url, params)
            .subscribe(
              res => console.log(res),
              err => console.log(err),
              () => console.log('request finished'),
            );
        }
        break;
      case 'POST': {
        url =
          this.requestForm.value.baseUrl +
          '/' +
          this.requestForm.value.requestUrl;
        console.log(url);
        this.http
          .post(url, body)
          .subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log('request finished'),
          );
      }
    }

    // this.httpclient.get<any>('url',this.creds,{headers:this.headers}).subscribe(
    //   res=>{
    //     console.log(res);
    //   },
    //   err=>{

    //   },
    //   ()=>{

    //   }
    // );
  }
}
