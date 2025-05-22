import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeColumn1747817724875 implements MigrationInterface {
    name = 'AddAgeColumn1747817724875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
