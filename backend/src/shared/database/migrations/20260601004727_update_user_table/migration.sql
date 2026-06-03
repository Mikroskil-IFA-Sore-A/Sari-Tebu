/*
  Warnings:

  - You are about to drop the column `password_salt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_address` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `password_salt`,
    ADD COLUMN `email_address` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_address_key` ON `users`(`email_address`);
