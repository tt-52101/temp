import { ProjectTransfer } from './../../../../services/biz/projecttransfer';
import { Validators } from '@angular/forms';
import { SFSchema, SFButton, SFComponent } from '@delon/form';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, Layout } from '@delon/theme';
import { format } from 'date-fns';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home-team-analysis',
  templateUrl: './analysis.component.html',
})
export class HomeTeamAnalysisComponent implements OnInit {
  constructor(private http: _HttpClient) {}
  @ViewChild('sf') sf: SFComponent;
  dataSource: ProjectTransfer[] = [];
  // 根据业务，金额and数量 两个pie
  jobAmountPieBiz = [];
  jobCountPieBiz = [];
  totalAmount='';
  totalCount='';
  loading=false;
  isFinished=false;
  // 根据业务+区域，金额and数量 两个pie
  jobAmountDetail = [];
  jobCountDetail = [];
  // 工程师产出pie
  engineerAmount = [];
  engineerCount = [];
theYear=new Date().getFullYear();
theMonth=new Date().getMonth();
  ngOnInit() {
    this.http.get('person/userbyfilter', { IsCurrentOnJob: true }).subscribe(
      res => {
        res.Items.forEach(element => {
          this.engineerAmount.push({ x: element.Name, y: 0 });
          this.engineerCount.push({ x: element.Name, y: 0 });
        });
      },
      err => {},
      () => {
        const from=parseInt(this.theYear.toString()+'01',10);
        const to =parseInt(this.theYear.toString()+'0'+(this.theMonth-1).toString(),10);
        console.log(from);
        console.log(to);
        this.GetAnalysisData(from,to);
      },
    );
  }
  sfBtn: SFButton = {
    submit: '计算',
    
  };

  periodSchema: SFSchema = {
    properties: {
      FromMonth: {
        type: 'string',
        title: '起始月份',
        format: 'month',
        ui: {
          span: 4,
        },
      },
      ToMonth: {
        type: 'string',
        title: '截止月份',
        format: 'month',
        ui: {
          span: 4,
        },
      },
      
    },
    
  };
  jobStatusData=[];
  submit(data: any) {
    const from = format(this.sf.value.FromMonth, 'YYYYMM');
    const to = format(this.sf.value.ToMonth, 'YYYYMM');
    
    console.log(data);
    this.GetAnalysisData(from,to)
  }
  GetAnalysisData(from,to){
    this.loading=true;
    this.isFinished=true;
    const theYear=new Date().getFullYear();
    
    
    // 获取选择时间间隔的所有register案子，使用revenueMonth属性
    zip(this.http
      .get('home/projectsbyfilter', {
        FromRevenueMonth: from,
        ToRevenueMonth: to,
      }),
      this.http
      .get(`biz/jobtrends/team`, {
        from: new Date(theYear, 0, 1).toLocaleDateString(),
        to: new Date().toLocaleDateString(),
      }))
      .subscribe(
        ([projects,jobTrends]) => {
          this.dataSource = projects.Items;
          console.log(projects.Items);

          // trends
          const temp1=[];
          const temp2 = [];
        jobTrends.Items.forEach(element => {
          temp1.push({
            TheDay: Date.parse(element.TheDay),
            JobOpenAmount: element.JobOpenAmount,
            JobCompleteAmount: element.JobCompleteAmount,
          });
        });
        const beginDay = new Date(theYear, 0, 1).getTime();
        const endDay = new Date().getTime();
        const dayCount = Math.abs(endDay - beginDay) / 1000 / 60 / 60 / 24;
        for (let i = 0; i < dayCount; i += 1) {
          let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
          let ss = temp1.find(n => n.TheDay === theDay.getTime());
          if (ss) {
            temp2.push({
              x: ss.TheDay,
              y1: ss.JobOpenAmount,
              y2: ss.JobCompleteAmount,
            });
          } else {
            temp2.push({
              x: theDay.getTime(),
              y1: 0,
              y2: 0,
            });
          }
        }
        this.jobStatusData=temp2;
        },
        err => {this.loading=false;this.isFinished=false;},
        () => {
          this.dataTreat(this.dataSource);
          this.loading=false;
          this.isFinished=false;
        },
      );
  }

  format(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }

  dataTreat(dataSource: ProjectTransfer[]) {
    this.jobAmountPieBiz = [
      { x: 'Safety', y: 0 },
      { x: 'EE', y: 0 },
      { x: 'Chemical', y: 0 },
      { x: 'Unknown', y: 0 },
    ];
    this.jobCountPieBiz = [
      { x: 'Safety', y: 0 },
      { x: 'EE', y: 0 },
      { x: 'Chemical', y: 0 },
      { x: 'Unknown', y: 0 },
    ];
    this.jobAmountDetail = [
      { type: 'Safety', name: 'IEC', value: 0 },
      { type: 'Safety', name: 'US', value: 0 },
      { type: 'EE', name: 'EE', value: 0 },
      { type: 'Chemical', name: 'Chemical', value: 0 },
    ];
    this.jobCountDetail = [
      { type: 'Safety', name: 'IEC', value: 0 },
      { type: 'Safety', name: 'US', value: 0 },
      { type: 'EE', name: 'EE', value: 0 },
      { type: 'Chemical', name: 'Chemical', value: 0 },
    ];
    dataSource.forEach(item => {
      switch (item.BType) {
        case 'Safety':
          {
            this.jobAmountPieBiz.filter(j => j.x === 'Safety')[0].y +=
              item.InvoicedFee;
            this.jobCountPieBiz.filter(j => j.x === 'Safety')[0].y += 1;
          }
          break;
        case 'EE':
          {
            this.jobAmountPieBiz.filter(j => j.x === 'EE')[0].y +=
              item.InvoicedFee;
            this.jobCountPieBiz.filter(j => j.x === 'EE')[0].y += 1;
          }
          break;
        case 'Chemical':
          {
            this.jobAmountPieBiz.filter(j => j.x === 'Chemical')[0].y +=
              item.InvoicedFee;
            this.jobCountPieBiz.filter(j => j.x === 'Chemical')[0].y += 1;
          }
          break;
        case 'Unknown':
          {
            this.jobAmountPieBiz.filter(j => j.x === 'Unknown')[0].y +=
              item.InvoicedFee;
            this.jobCountPieBiz.filter(j => j.x === 'Unknown')[0].y += 1;
          }
          break;
      }

      const flagDetail = item.BType + '-' + item.RType;
      switch (flagDetail) {
        case 'Safety-IEC':
          {
            this.jobCountDetail.filter(
              p =>
                (p.type === 'Safety' && p.name === 'IEC') ||
                (p.type === 'Safety' && p.name === 'GMAP'),
            )[0].value += 1;
            this.jobAmountDetail.filter(
              p =>
                (p.type === 'Safety' && p.name === 'IEC') ||
                (p.type === 'Safety' && p.name === 'GMAP'),
            )[0].value += item.InvoicedFee;
          }
          break;
        case 'Safety-US':
          {
            this.jobCountDetail.filter(
              p => p.type === 'Safety' && p.name === 'US',
            )[0].value += 1;
            this.jobAmountDetail.filter(
              p => p.type === 'Safety' && p.name === 'US',
            )[0].value += item.InvoicedFee;
          }
          break;
        case 'EE-IEC':
          {
            this.jobCountDetail.filter(p => p.type === 'EE')[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'EE')[0].value +=
              item.InvoicedFee;
          }
          break;
        case 'EE-US':
          {
            this.jobCountDetail.filter(p => p.type === 'EE')[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'EE')[0].value +=
              item.InvoicedFee;
          }
          break;
        case 'EE-GMAP':
          {
            this.jobCountDetail.filter(p => p.type === 'EE')[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'EE')[0].value +=
              item.InvoicedFee;
          }
          break;

        case 'Chemical-Unknown':
          {
            this.jobCountDetail.filter(
              p => p.type === 'Chemical',
            )[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'Chemical')[0].value +=
              item.InvoicedFee;
          }
          break;
        case 'Chemical-IEC':
          {
            this.jobCountDetail.filter(
              p => p.type === 'Chemical',
            )[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'Chemical')[0].value +=
              item.InvoicedFee;
          }
          break;
        case 'Chemical-US':
          {
            this.jobCountDetail.filter(
              p => p.type === 'Chemical',
            )[0].value += 1;
            this.jobAmountDetail.filter(p => p.type === 'Chemical')[0].value +=
              item.InvoicedFee;
          }
          break;
      }

      let am = this.engineerAmount.filter(p => p.x === item.EngineerName);
      let co = this.engineerCount.filter(p => p.x === item.EngineerName);
      if (am.length > 0) {
        am[0].y += item.InvoicedFee;
      }
      if (co.length > 0) {
        co[0].y += 1;
      }
    });
    console.log(this.jobAmountPieBiz);
    console.log(this.jobAmountDetail);
    const ta = this.jobAmountPieBiz.reduce(
      (acc, cur) => acc + cur.y,
      0,
    );
    console.log(typeof(ta));
    this.totalAmount=`&yen ${ta.toFixed(2)}`;
    const tc = this.jobCountPieBiz.reduce(
      (acc, cur) => acc + cur.y,
      0,
    );
    this.totalCount=`${tc}个`;
    this.renderMultiPie(this.jobAmountDetail, 'divJob');
    this.renderNandiPie(this.engineerAmount, 'divEng');
  }

  renderRingPie(data, id) {
    var chart = new G2.Chart({
      container: id,
      forceFit: true,
      height: window.innerHeight,
      animate: false,
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        },
      },
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 辅助文本
    chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      alignX: 'middle',
      alignY: 'middle',
    });
    var interval = chart
      .intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: function formatter(val, item) {
          return item.point.item + ': ' + val;
        },
      })
      .tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    chart.render();
    interval.setSelected(data[0]);
  }

  renderMultiPie(data, id) {
    var _DataSet = DataSet,
      DataView = _DataSet.DataView;
    var dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    var chart = new G2.Chart({
      container: id,
      forceFit: true,
      height: window.innerHeight,
      padding: 0,
    });
    chart.source(dv, {
      percent: {
        formatter: function formatter(val) {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    });
    chart.coord('theta', {
      radius: 0.5,
    });
    chart.tooltip({
      showTitle: false,
    });
    chart.legend(false);
    chart
      .intervalStack()
      .position('percent')
      .color('type')
      .label('type', {
        offset: -10,
      })
      .tooltip('name*percent', function(item, percent) {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .select(false)
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    var outterView = chart.view();
    var dv1 = new DataView();
    dv1.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    outterView.source(dv1, {
      percent: {
        formatter: function formatter(val) {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    });
    outterView.coord('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    });
    outterView
      .intervalStack()
      .position('percent')
      .color('name', [
        '#BAE7FF',
        '#7FC9FE',
        '#71E3E3',
        '#ABF5F5',
        '#8EE0A1',
        '#BAF5C4',
      ])
      .label('name')
      .tooltip('name*percent', function(item, percent) {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .select(false)
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    chart.render();
  }
  renderNandiPie(data, id) {
    var chart = new G2.Chart({
      container: id,
      forceFit: true,
      height: window.innerHeight,
    });
    chart.source(data);
    chart.coord('polar', {
      innerRadius: 0.2,
    });
    chart.legend({
      position: 'right',
      offsetY: -window.innerHeight / 2 + 180,
      offsetX: -140,
    });
    chart.axis(false);
    chart
      .interval()
      .position('x*y')
      .color('x', G2.Global.colors_pie_16)
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    chart.render();
  }
}
