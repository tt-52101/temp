import { ActionRecord } from './ActionRecord';
import { BaseEntity } from './baseEnitty';

export class ProjectTransfer implements BaseEntity {
  Id: string;
  ProjectNo: string;
  QuotationNo: string;
  OpenDate: Date;
  CompleteDate?: Date;
  InvoiceDate?: Date;
  EngineerName: string;
  AssistEngineerName: string;
  EngineeringCSName: string;
  SalesName: string;
  SalesCSName: string;
  ClientName: string;
  CType:string;
  Records:ActionRecord[];
  ServiceNames: string[];
  BType:string;
  RType:string;
  Team:string;
  ProductLineFrom:string;
  Product: string;
  Models: string;
  ActualProjectWorkingDays:number;
  QuotedFee: number;
  CurrencyInUSD: boolean;
  InvoicedFee?: number;
  TobeFinishFlag:boolean;
  CreatedOn: Date;
  DeletedOn?: Date;
  LastModifiedOn?: Date;
  CreatedBy: string;
  DeletedBy?: string;
  LastModifiedBy?: string;
  IsDeleted: boolean;
  RowVersion: string;
}
