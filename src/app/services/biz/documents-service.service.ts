import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsServiceService {
  documents:any[]=[];
  constructor(private http:_HttpClient) { 
    
  }
  getDocuments(){
    let doc:any[]=[];
    this.http.get('assets/tmp/documents.json').subscribe(
      res=>{
        doc=res;
        console.log(doc);
      }

    )
    
  }

}
