export class SyneltsUser {
  Id: string;
  Name: string;
  Email: string;
  SyneltsRole: number;
  SyneltsRoles: string[];
  SubTeam:string;
  IsCurrentOnJob: boolean;
  IsDeleted: boolean;
  CreatedOn: Date;
  CreatedBy: string;
  LastModifiedOn: Date;
  LastModifiedBy: string;
  DeletedOn: Date;
  DeletedBy: string;
  RowVersion: string;
}
