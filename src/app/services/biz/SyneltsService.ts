export class SyneltsService {
  Id: string;
  Name: string;
  Description: string;
  BusinessType: string;
  RegionType: string;
  DefaultRequiredWorkingDays: number;
  RequiredDocumentsString:string[];
  RequiredDocuments:string;
  IsDeleted: boolean;
  CreatedOn: Date;
  CreatedBy: string;
  LastModifiedOn: Date;
  LastModifiedBy: string;
  DeletedOn: Date;
  DeletedBy: string;
  RowVersion: string;
}