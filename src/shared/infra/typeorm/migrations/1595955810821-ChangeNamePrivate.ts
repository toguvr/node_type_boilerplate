import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNamePrivate1595955810821 implements MigrationInterface {
  name = 'ChangeNamePrivate1595955810821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `enterprises` DROP COLUMN `private`',
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `enterprises` ADD `isPrivate` tinyint UNSIGNED NOT NULL DEFAULT '1'",
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `enterprises` CHANGE `logo` `logo` varchar(255) NULL',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `enterprises` CHANGE `logo` `logo` varchar(255) NOT NULL',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `enterprises` DROP COLUMN `isPrivate`',
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `enterprises` ADD `private` tinyint UNSIGNED NOT NULL DEFAULT '1'",
      undefined,
    );
  }
}
