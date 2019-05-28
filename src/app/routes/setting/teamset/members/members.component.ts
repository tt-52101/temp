import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-teamset-members',
  templateUrl: './members.component.html',
})
export class SettingTeamsetMembersComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
