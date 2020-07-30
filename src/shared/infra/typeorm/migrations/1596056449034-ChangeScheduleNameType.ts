import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeScheduleNameType1596056449034 implements MigrationInterface {
    name = 'ChangeScheduleNameType1596056449034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` DROP COLUMN `user_name`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` ADD `user_name` varchar(255) NOT NULL", undefined);
    }

}
