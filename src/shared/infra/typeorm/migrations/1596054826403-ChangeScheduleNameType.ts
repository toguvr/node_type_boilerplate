import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeScheduleNameType1596054826403 implements MigrationInterface {
    name = 'ChangeScheduleNameType1596054826403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` CHANGE `time_schedule` `hour_to_schedule` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `services` DROP COLUMN `hour_to_schedule`", undefined);
        await queryRunner.query("ALTER TABLE `services` ADD `hour_to_schedule` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `services` DROP COLUMN `hour_to_schedule`", undefined);
        await queryRunner.query("ALTER TABLE `services` ADD `hour_to_schedule` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `services` CHANGE `hour_to_schedule` `time_schedule` varchar(255) NOT NULL", undefined);
    }

}
