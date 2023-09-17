/*
  Warnings:

  - Added the required column `address` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `denomination` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "ContractState" AS ENUM ('CREATED', 'FUNDED', 'SIGNED', 'CANCELLED', 'EXPIRED', 'PAID', 'FAILED', 'REFUNDED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USDT', 'DAI', 'ETH', 'BTC', 'BNB', 'MATIC', 'ADA', 'DOT', 'SOL');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "currency" "CurrencyType" NOT NULL,
ADD COLUMN     "denomination" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "state" "ContractState" NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");
