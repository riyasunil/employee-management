import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartmentEmployeeRelation1747942211292 implements MigrationInterface {
    name = 'AddDepartmentEmployeeRelation1747942211292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_9a2213262c1593bffb581e382f5" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
    }

}
