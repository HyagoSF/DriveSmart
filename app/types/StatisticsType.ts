export type Dollars = number | null;
export type Liters = number | null;

export type TimeDriving = {
	hours: number;
	minutes: number;
	seconds: number;
};

export interface StatisticsType {
	totalHours: TimeDriving;
	totalKms: number;
	grossEarnings: Dollars;
	gasPrice: Dollars;
	fuelConsumption: Liters;
}
