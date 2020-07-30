import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationEnterpriseAppointment1596127760382 implements MigrationInterface {
    name = 'RelationEnterpriseAppointment1596127760382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `appointments` ADD `enterprise_id` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE INDEX `appointments_enterprise_service_id_fk` ON `appointments` (`enterprise_id`)", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `FK_3a9590046dc1c1f3a517c35589d` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `FK_3a9590046dc1c1f3a517c35589d`", undefined);
        await queryRunner.query("DROP INDEX `appointments_enterprise_service_id_fk` ON `appointments`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP COLUMN `enterprise_id`", undefined);
    }

}
