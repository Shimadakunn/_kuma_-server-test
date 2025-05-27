/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RampType" AS ENUM ('ONRAMP', 'OFFRAMP');

-- DropIndex
DROP INDEX "User_address_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "wallet" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserRamp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL,
    "type" "RampType" NOT NULL,
    "amount" TEXT NOT NULL,
    "txId" TEXT NOT NULL,

    CONSTRAINT "UserRamp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- AddForeignKey
ALTER TABLE "UserRamp" ADD CONSTRAINT "UserRamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
