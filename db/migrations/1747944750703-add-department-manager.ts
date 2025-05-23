import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartmentManager1747944750703 implements MigrationInterface {
    name = 'AddDepartmentManager1747944750703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD "managerId" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "departmentId" integer`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_2147eb9946aa96094b7f78b1954" FOREIGN KEY ("managerId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_2147eb9946aa96094b7f78b1954"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_9a2213262c1593bffb581e382f5" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "managerId"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
