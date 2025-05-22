import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToEmployee1747898803715 implements MigrationInterface {
    name = 'AddPasswordToEmployee1747898803715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "password"="password" WHERE "password" IS NULL` );
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
