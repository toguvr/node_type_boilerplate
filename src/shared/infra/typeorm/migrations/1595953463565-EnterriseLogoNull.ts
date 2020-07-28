import {MigrationInterface, QueryRunner} from "typeorm";

export class EnterriseLogoNull1595953463565 implements MigrationInterface {
    name = 'EnterriseLogoNull1595953463565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `enterprises` CHANGE `logo` `logo` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `enterprises` CHANGE `logo` `logo` varchar(255) NOT NULL", undefined);
    }

}
