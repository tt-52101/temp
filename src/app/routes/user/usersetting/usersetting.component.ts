import { filter, debounceTime } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { zip, Subscription, fromEvent } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-user-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserUsersettingComponent implements OnInit,AfterViewInit,OnDestroy {
  ngOnInit(){

  }
  private resize$: Subscription;
  private router$: Subscription;
  mode = 'inline';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'basic',
      title: '基本设置',
    },
    {
      key: 'security',
      title: '安全设置',
    },
  ];
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
    this.title = this.menus.find(w => w.selected).title;
  }

  to(item: any) {
    this.router.navigateByUrl(`/user/setting/${item.key}`);
  }

  private resize() {
    const el = this.el.nativeElement as HTMLElement;
    let mode = 'inline';
    const { offsetWidth } = el;
    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.mode = mode;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }
}
