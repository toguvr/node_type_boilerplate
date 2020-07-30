import {MigrationInterface, QueryRunner} from "typeorm";

export class ServiceEnterpriseRelation1596057239413 implements MigrationInterface {
    name = 'ServiceEnterpriseRelation1596057239413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` ADD CONSTRAINT `FK_550cb02e1447f1da540314f2f83` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` DROP FOREIGN KEY `FK_550cb02e1447f1da540314f2f83`", undefined);
    }

}
