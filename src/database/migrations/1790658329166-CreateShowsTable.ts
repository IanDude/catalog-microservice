import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShowsTable1790658329166 implements MigrationInterface {
  name = 'CreateShowsTable1790658329166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shows" ("id" int NOT NULL IDENTITY(1,1), "uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_311164827928d7ecfa0f691c069" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_604b9cf75bda0e9cd539cd38af9" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_587bae654150576e823c8a830b5" DEFAULT getdate(), "deletedAt" datetime2, "title" nvarchar(255) NOT NULL, "synopsis" nvarchar(255) NOT NULL, "original_title" nvarchar(255), "tagline" nvarchar(255) NOT NULL, CONSTRAINT "PK_db2b12161dbc5081c4f50025669" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "shows"`);
  }
}
