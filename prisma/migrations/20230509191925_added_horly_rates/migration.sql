-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "grossHourlyRate" DOUBLE PRECISION,
ADD COLUMN     "liquidHourlyRate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ExpensesStatistics" ADD COLUMN     "avgGrossHourlyRate" DOUBLE PRECISION,
ADD COLUMN     "avrLiquidHourlyRate" DOUBLE PRECISION;
