import { ActionRecord } from './ActionRecord';
import { BaseEntity } from './baseEnitty';

export class ProjectTransfer implements BaseEntity {
  Id: string;
  ProjectNo: string;
  QuotationNo: string;
  OpenDate: Date;
  CompleteDate?: Date;
  TargetDate?:Date;
  InvoiceDate?: Date;
  EngineerName: string;
  AssistEngineerName: string;
  EngineeringCSName: string;
  SalesName: string;
  SalesCSName: string;
  ClientName: string;
  CType:string;
  Records:ActionRecord[];
  ManualProgress:string;
  Reports:any;
  ServiceNames: string[];
  BType:string;
  RType:string;
  Team:string;
  ProductLineFrom:string;
  Product: string;
  Models: string;
  ActualProjectWorkingDays:number;
  SetDocuments:string;
  ProgressPercent:number;
  FinishedDocuments:string;
  QuotedFee: number;
  CurrencyInUSD: boolean;
  InvoicedFee?: number;
  TobeFinishFlag:boolean;
  RevenueMonth:string;
  CreatedOn: Date;
  DeletedOn?: Date;
  LastModifiedOn?: Date;
  CreatedBy: string;
  DeletedBy?: string;
  LastModifiedBy?: string;
  IsDeleted: boolean;
  RowVersion: string;
}
