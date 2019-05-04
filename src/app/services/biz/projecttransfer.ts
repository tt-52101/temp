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
  ServiceNames: string[];
  Product: string;
  Models: string;
  QuotedFee: number;
  CurrencyInUSD: boolean;
  InvoicedFee?: number;
  CreatedOn: Date;
  DeletedOn?: Date;
  LastModifiedOn?: Date;
  CreatedBy: string;
  DeletedBy?: string;
  LastModifiedBy?: string;
  IsDeleted: boolean;
  RowVersion: string;
}
