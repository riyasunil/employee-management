import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManagerToRole1747977196606 implements MigrationInterface {
    name = 'AddedManagerToRole1747977196606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_role_enum" RENAME TO "employee_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('UI', 'UX', 'DEV', 'HR', 'MANAGER')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" TYPE "public"."employee_role_enum" USING "role"::"text"::"public"."employee_role_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET DEFAULT 'DEV'`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum_old" AS ENUM('UI', 'UX', 'DEV', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" TYPE "public"."employee_role_enum_old" USING "role"::"text"::"public"."employee_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET DEFAULT 'DEV'`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_role_enum_old" RENAME TO "employee_role_enum"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81" FOREIGN KEY ("manager_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
