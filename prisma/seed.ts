// prisma/seed.js

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

import prisma from './client';

async function main() {
	const user1 = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john.dojkhje@example.com',
		},
	});

	const user2 = await prisma.user.create({
		data: {
			name: 'Jane Smith',
			email: 'jane.smithgg@example.com',
		},
	});

	const delivery1 = await prisma.delivery.create({
		data: {
			userId: user1.id,
			date: new Date('2022-01-01T10:00:00Z'),
			totalHours: 8,
			totalKms: 100,
			grossEarnings: 100,
			gasPrice: 1.5,
		},
	});

	const delivery2 = await prisma.delivery.create({
		data: {
			userId: user1.id,
			date: new Date('2022-01-02T10:00:00Z'),
			totalHours: 6,
			totalKms: 80,
			grossEarnings: 80,
			gasPrice: 1.6,
		},
	});

	const expense1 = await prisma.expense.create({
		data: {
			userId: user1.id,
			expenseType: 'Gas',
			date: new Date('2022-01-01T10:00:00Z'),
			odometerReading: 1000,
			gasSpent: 50,
			servicesExpenses: 0,
			otherExpenses: 0,
		},
	});

	const expense2 = await prisma.expense.create({
		data: {
			userId: user1.id,
			expenseType: 'Maintenance',
			date: new Date('2022-01-02T10:00:00Z'),
			odometerReading: 1100,
			gasSpent: 0,
			servicesExpenses: 100,
			otherExpenses: 0,
		},
	});

	const carExpense1 = await prisma.carExpense.create({
		data: {
			userId: user1.id,
			date: new Date('2022-01-01T10:00:00Z'),
			odometerReading: 1000,
			gasSpent: 50,
			serviceExpenses: 0,
			loanPayment: 200,
			insuranceCost: 100,
		},
	});

	const carExpense2 = await prisma.carExpense.create({
		data: {
			userId: user1.id,
			date: new Date('2022-01-02T10:00:00Z'),
			odometerReading: 1100,
			gasSpent: 0,
			serviceExpenses: 100,
			loanPayment: 200,
			insuranceCost: 100,
		},
	});

	const expensesSummary1 = await prisma.expensesSummary.create({
		data: {
			userId: user1.id,
			month: 1,
			year: 2022,
			totalGasSpent: 50,
			totalServicesExpenses: 100,
			totalOtherExpenses: 0,
		},
	});

	const carExpensesSummary1 = await prisma.carExpensesSummary.create({
		data: {
			userId: user1.id,
			month: 1,
			year: 2022,
			totalGasSpent: 50,
			totalServicesExpenses: 100,
			totalLoanPayments: 400,
			totalInsuranceCost: 200,
		},
	});

	const expensesStatistics1 = await prisma.expensesStatistics.create({
		data: {
			userId: user1.id,
			month: 1,
			year: 2022,
			avgCostPerLiter: 1.5,
			totalLitersPurchased: 33.33,
			totalSpentAfterGas: 300,
			avgCostPerKm: 3,
			avgCostPerDay: 25,
			avgCostPer30Days: 750,
		},
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
