import { BaseEntity } from './baseEnitty';
export class ActionRecord implements BaseEntity{
  Id: string;  
  IsDeleted: boolean;
  RowVersion: string;
  CreatedOn:Date;
  Title:string;
  Description:string;
  CreatedBy:string;
  LastModifiedOn:Date;
  LastModifiedBy:string;

}