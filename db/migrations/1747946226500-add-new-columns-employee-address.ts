import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsEmployeeAddress1747946226500 implements MigrationInterface {
    name = 'AddNewColumnsEmployeeAddress1747946226500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying`);
        await queryRunner.query(`UPDATE "address" SET "line2"='N/A' WHERE "line2" IS NULL` );
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying`);
        await queryRunner.query(`UPDATE "address" SET "house_no"='N/A' WHERE "house_no" IS NULL` );
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "employee_id"='N/A' WHERE "employee_id" IS NULL` );
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" date`);
        await queryRunner.query(`UPDATE "employee" SET "date_of_joining"='2025-05-23 14:30:00' WHERE "date_of_joining" IS NULL` );
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
        await queryRunner.query(`UPDATE "employee" SET "experience"=0 WHERE "experience" IS NULL` );
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL `);
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'INACTIVE'`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
