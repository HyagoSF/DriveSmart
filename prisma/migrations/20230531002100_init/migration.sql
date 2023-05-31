-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,
    "totalKms" DOUBLE PRECISION NOT NULL,
    "grossEarnings" DOUBLE PRECISION NOT NULL,
    "liquidEarnings" DOUBLE PRECISION,
    "gasPrice" DECIMAL(4,3) NOT NULL,
    "gasLiters" DOUBLE PRECISION,
    "gasSpent" DOUBLE PRECISION,
    "grossHourlyRate" DOUBLE PRECISION,
    "liquidHourlyRate" DOUBLE PRECISION,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odometerReading" DOUBLE PRECISION NOT NULL,
    "gasSpent" DOUBLE PRECISION NOT NULL,
    "serviceExpenses" DOUBLE PRECISION,
    "otherExpenses" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarExpense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odometerReading" DOUBLE PRECISION NOT NULL,
    "gasSpent" DOUBLE PRECISION NOT NULL,
    "serviceExpenses" DOUBLE PRECISION,
    "loanPayment" DOUBLE PRECISION NOT NULL,
    "insuranceCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CarExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalGasSpent" DOUBLE PRECISION NOT NULL,
    "totalGasLiters" DOUBLE PRECISION,
    "totalKms" DOUBLE PRECISION,
    "totalServiceExpenses" DOUBLE PRECISION,
    "totalOtherExpenses" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExpensesSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarExpensesSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalGasSpent" DOUBLE PRECISION NOT NULL,
    "totalGasLiters" DOUBLE PRECISION,
    "totalKms" DOUBLE PRECISION,
    "totalServiceExpenses" DOUBLE PRECISION,
    "totalLoanPayments" DOUBLE PRECISION NOT NULL,
    "totalInsuranceCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CarExpensesSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesStatistics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "avgCostPerLiter" DOUBLE PRECISION NOT NULL,
    "totalLitersPurchased" DOUBLE PRECISION NOT NULL,
    "totalSpentAfterGas" DOUBLE PRECISION NOT NULL,
    "avgCostPerKm" DOUBLE PRECISION NOT NULL,
    "avgCostPerDay" DOUBLE PRECISION NOT NULL,
    "avgCostPer30Days" DOUBLE PRECISION NOT NULL,
    "totalEarnings" DOUBLE PRECISION,
    "totalExpenses" DOUBLE PRECISION,
    "netEarnings" DOUBLE PRECISION,
    "liquidEarningsPercentage" DOUBLE PRECISION,
    "avgGrossHourlyRate" DOUBLE PRECISION,
    "avrLiquidHourlyRate" DOUBLE PRECISION,

    CONSTRAINT "ExpensesStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
