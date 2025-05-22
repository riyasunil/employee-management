import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToEmployee1747902869989 implements MigrationInterface {
    name = 'AddRoleToEmployee1747902869989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('UI', 'UX', 'DEV', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" "public"."employee_role_enum" NOT NULL DEFAULT 'DEV'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
    }

}
