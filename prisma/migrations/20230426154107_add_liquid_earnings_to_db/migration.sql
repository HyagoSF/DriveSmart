/*
  Warnings:

  - You are about to drop the column `totalServicesExpenses` on the `CarExpensesSummary` table. All the data in the column will be lost.
  - You are about to alter the column `gasPrice` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(4,3)`.
  - You are about to drop the column `servicesExpenses` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `totalServicesExpenses` on the `ExpensesSummary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarExpense" ALTER COLUMN "serviceExpenses" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarExpensesSummary" DROP COLUMN "totalServicesExpenses",
ADD COLUMN     "totalGasLiters" DOUBLE PRECISION,
ADD COLUMN     "totalKms" DOUBLE PRECISION,
ADD COLUMN     "totalServiceExpenses" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "gasLiters" DOUBLE PRECISION,
ADD COLUMN     "gasSpent" DOUBLE PRECISION,
ADD COLUMN     "liquidEarnings" DOUBLE PRECISION,
ALTER COLUMN "gasPrice" SET DATA TYPE DECIMAL(4,3);

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "servicesExpenses",
ADD COLUMN     "serviceExpenses" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ExpensesStatistics" ADD COLUMN     "liquidEarningsPercentage" DOUBLE PRECISION,
ADD COLUMN     "netEarnings" DOUBLE PRECISION,
ADD COLUMN     "totalEarnings" DOUBLE PRECISION,
ADD COLUMN     "totalExpenses" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ExpensesSummary" DROP COLUMN "totalServicesExpenses",
ADD COLUMN     "totalGasLiters" DOUBLE PRECISION,
ADD COLUMN     "totalKms" DOUBLE PRECISION,
ADD COLUMN     "totalServiceExpenses" DOUBLE PRECISION;
