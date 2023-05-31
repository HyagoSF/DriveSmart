export type Dollars = number | null;
export type Liters = number | null;

export type TimeDriving = {
	hours: number;
	minutes: number;
	seconds: number;
};

export interface StatisticsType {
	date?: Date | string;
	liquidEarnings?: Dollars;
	gasLiters?: Liters;
	gasSpent?: Dollars;
	totalHours: any;
	totalKms: number;
	grossEarnings: Dollars;
	gasPrice: Dollars;
	fuelConsumption?: Liters;
}
