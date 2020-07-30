import {MigrationInterface, QueryRunner} from "typeorm";

export class MountTable1596130281186 implements MigrationInterface {
    name = 'MountTable1596130281186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users_enterprises` (`id` varchar(36) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `accepted` tinyint UNSIGNED NOT NULL DEFAULT '0', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `users_enterprises_user_id_fk` (`user_id`), INDEX `users_enterprises_enterprise_id_fk` (`enterprise_id`), INDEX `accepted` (`accepted`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `plans` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `price` decimal(10,2) NOT NULL, `schedule_limit` int UNSIGNED NOT NULL, `days_to_expire` int UNSIGNED NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `plans_enterprises_enterprise_id_fk` (`enterprise_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `servicedescription` (`id` varchar(36) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `enterprise_description_enterprise_id_fk` (`enterprise_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `services` (`id` varchar(36) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `start_hour` varchar(255) NOT NULL, `description_id` varchar(255) NOT NULL, `category_id` varchar(255) NOT NULL, `capacity` int UNSIGNED NOT NULL, `day_week` int UNSIGNED NOT NULL, `pending_scheduling` tinyint UNSIGNED NOT NULL DEFAULT '0', `hour_to_schedule` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `service_descriptions_description_id_fk` (`description_id`), INDEX `service_categories_category_id_fk` (`category_id`), INDEX `enterprise_service_enterprise_id_fk` (`enterprise_id`), INDEX `pending_scheduling` (`pending_scheduling`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `servicecategory` (`id` varchar(36) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `enterprise_categories_enterprise_id_fk` (`enterprise_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `enterprises` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `area` varchar(255) NOT NULL, `owner_id` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `open_hour` varchar(255) NOT NULL, `close_hour` varchar(255) NOT NULL, `primary_color` varchar(255) NOT NULL, `secondary_color` varchar(255) NOT NULL, `isPrivate` tinyint UNSIGNED NOT NULL DEFAULT '1', `logo` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `user_enterprises_users_id_fk` (`owner_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_plans` (`id` varchar(36) NOT NULL, `user_id` varchar(255) NOT NULL, `plan_id` varchar(255) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `canceled_at` datetime NULL, `paused_at` datetime NULL, `expiration_at` datetime NULL, `active` tinyint UNSIGNED NOT NULL DEFAULT '1', INDEX `user_plans_enterprise_id_fk` (`enterprise_id`), INDEX `user_plans_plans_id_fk` (`plan_id`), INDEX `user_plans_users_id_fk` (`user_id`), INDEX `active` (`active`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `usertoken` (`id` varchar(36) NOT NULL, `token` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `user_id` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `email` (`email`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `appointments` (`id` varchar(36) NOT NULL, `service_id` varchar(255) NOT NULL, `user_id` varchar(255) NOT NULL, `enterprise_id` varchar(255) NOT NULL, `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `appointments_users_user_id_fk` (`user_id`), INDEX `appointments_service_service_id_fk` (`service_id`), INDEX `appointments_enterprise_service_id_fk` (`enterprise_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users_enterprises` ADD CONSTRAINT `FK_ef41607388fb28bddd0cbe7103e` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `users_enterprises` ADD CONSTRAINT `FK_c28ab732f3f67e658fee34d208a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `plans` ADD CONSTRAINT `FK_2b2e47670535a6d1bdb110b6e2c` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `servicedescription` ADD CONSTRAINT `FK_f052be921306d5a57d9402605de` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `services` ADD CONSTRAINT `FK_1f8d1173481678a035b4a81a4ec` FOREIGN KEY (`category_id`) REFERENCES `servicecategory`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `services` ADD CONSTRAINT `FK_bb265099f748d85952d3133ec3a` FOREIGN KEY (`description_id`) REFERENCES `servicedescription`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `services` ADD CONSTRAINT `FK_550cb02e1447f1da540314f2f83` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `servicecategory` ADD CONSTRAINT `FK_2fd2f9c22323bba6edbd0296b80` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `enterprises` ADD CONSTRAINT `FK_a6119f794fe01dbc13442a73159` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` ADD CONSTRAINT `FK_5de278825b590f2ef0c2426ec79` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` ADD CONSTRAINT `FK_08f964e4c9999e458f900a44a69` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` ADD CONSTRAINT `FK_638ae53bcdc1ff763dd5199f486` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `usertoken` ADD CONSTRAINT `FK_24a7d7d2e07e80100b1928ffb57` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `FK_2a2088e8eaa8f28d8de2bdbb857` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `FK_66dee3bea82328659a4db8e54b7` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `FK_3a9590046dc1c1f3a517c35589d` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `FK_3a9590046dc1c1f3a517c35589d`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `FK_66dee3bea82328659a4db8e54b7`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `FK_2a2088e8eaa8f28d8de2bdbb857`", undefined);
        await queryRunner.query("ALTER TABLE `usertoken` DROP FOREIGN KEY `FK_24a7d7d2e07e80100b1928ffb57`", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` DROP FOREIGN KEY `FK_638ae53bcdc1ff763dd5199f486`", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` DROP FOREIGN KEY `FK_08f964e4c9999e458f900a44a69`", undefined);
        await queryRunner.query("ALTER TABLE `user_plans` DROP FOREIGN KEY `FK_5de278825b590f2ef0c2426ec79`", undefined);
        await queryRunner.query("ALTER TABLE `enterprises` DROP FOREIGN KEY `FK_a6119f794fe01dbc13442a73159`", undefined);
        await queryRunner.query("ALTER TABLE `servicecategory` DROP FOREIGN KEY `FK_2fd2f9c22323bba6edbd0296b80`", undefined);
        await queryRunner.query("ALTER TABLE `services` DROP FOREIGN KEY `FK_550cb02e1447f1da540314f2f83`", undefined);
        await queryRunner.query("ALTER TABLE `services` DROP FOREIGN KEY `FK_bb265099f748d85952d3133ec3a`", undefined);
        await queryRunner.query("ALTER TABLE `services` DROP FOREIGN KEY `FK_1f8d1173481678a035b4a81a4ec`", undefined);
        await queryRunner.query("ALTER TABLE `servicedescription` DROP FOREIGN KEY `FK_f052be921306d5a57d9402605de`", undefined);
        await queryRunner.query("ALTER TABLE `plans` DROP FOREIGN KEY `FK_2b2e47670535a6d1bdb110b6e2c`", undefined);
        await queryRunner.query("ALTER TABLE `users_enterprises` DROP FOREIGN KEY `FK_c28ab732f3f67e658fee34d208a`", undefined);
        await queryRunner.query("ALTER TABLE `users_enterprises` DROP FOREIGN KEY `FK_ef41607388fb28bddd0cbe7103e`", undefined);
        await queryRunner.query("DROP INDEX `appointments_enterprise_service_id_fk` ON `appointments`", undefined);
        await queryRunner.query("DROP INDEX `appointments_service_service_id_fk` ON `appointments`", undefined);
        await queryRunner.query("DROP INDEX `appointments_users_user_id_fk` ON `appointments`", undefined);
        await queryRunner.query("DROP TABLE `appointments`", undefined);
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `email` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP INDEX `user_id` ON `usertoken`", undefined);
        await queryRunner.query("DROP TABLE `usertoken`", undefined);
        await queryRunner.query("DROP INDEX `active` ON `user_plans`", undefined);
        await queryRunner.query("DROP INDEX `user_plans_users_id_fk` ON `user_plans`", undefined);
        await queryRunner.query("DROP INDEX `user_plans_plans_id_fk` ON `user_plans`", undefined);
        await queryRunner.query("DROP INDEX `user_plans_enterprise_id_fk` ON `user_plans`", undefined);
        await queryRunner.query("DROP TABLE `user_plans`", undefined);
        await queryRunner.query("DROP INDEX `user_enterprises_users_id_fk` ON `enterprises`", undefined);
        await queryRunner.query("DROP TABLE `enterprises`", undefined);
        await queryRunner.query("DROP INDEX `enterprise_categories_enterprise_id_fk` ON `servicecategory`", undefined);
        await queryRunner.query("DROP TABLE `servicecategory`", undefined);
        await queryRunner.query("DROP INDEX `pending_scheduling` ON `services`", undefined);
        await queryRunner.query("DROP INDEX `enterprise_service_enterprise_id_fk` ON `services`", undefined);
        await queryRunner.query("DROP INDEX `service_categories_category_id_fk` ON `services`", undefined);
        await queryRunner.query("DROP INDEX `service_descriptions_description_id_fk` ON `services`", undefined);
        await queryRunner.query("DROP TABLE `services`", undefined);
        await queryRunner.query("DROP INDEX `enterprise_description_enterprise_id_fk` ON `servicedescription`", undefined);
        await queryRunner.query("DROP TABLE `servicedescription`", undefined);
        await queryRunner.query("DROP INDEX `plans_enterprises_enterprise_id_fk` ON `plans`", undefined);
        await queryRunner.query("DROP TABLE `plans`", undefined);
        await queryRunner.query("DROP INDEX `accepted` ON `users_enterprises`", undefined);
        await queryRunner.query("DROP INDEX `users_enterprises_enterprise_id_fk` ON `users_enterprises`", undefined);
        await queryRunner.query("DROP INDEX `users_enterprises_user_id_fk` ON `users_enterprises`", undefined);
        await queryRunner.query("DROP TABLE `users_enterprises`", undefined);
    }

}
