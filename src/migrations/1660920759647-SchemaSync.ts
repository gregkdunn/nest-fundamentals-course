import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1660920759647 implements MigrationInterface {
  name = 'SchemaSync1660920759647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "desecription" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "desecription"`);
  }
}
