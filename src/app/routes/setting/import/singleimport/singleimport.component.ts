import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-setting-import-singleimport',
  templateUrl: './singleimport.component.html',
})
export class SettingImportSingleimportComponent implements OnInit {

  constructor(private http: _HttpClient,private httpclient:HttpClient) { }
  stepText='执行';
  context='';
  ngOnInit() { }
  currentStep=1;
  url:string;
  status='process';
  creds= 'currentDomainNo='+'patrickc'+'&computerName='+'CCHNHZHL0027';
  public headers = new HttpHeaders({
'Content-Type': 'application/x-www-form-urlencoded'
});
  sendGet(){
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
