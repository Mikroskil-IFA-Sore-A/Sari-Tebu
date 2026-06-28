/*
  Warnings:

  - Added the required column `expires_at` to the `account_deletion_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `email_address_update_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `password_reset_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `password_update_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `signup_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account_deletion_sessions` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `email_address_update_sessions` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `password_reset_sessions` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `password_update_sessions` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `signup_sessions` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;
