export type Dollars = number ;
export type Liters = number ;

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

export type EntryType = {
	id: string;
	userId: string;
	date: string;
	totalHours: number;
	totalKms: number;
	grossEarnings: number;
	liquidEarnings: number;
	gasPrice: string;
	gasLiters: number;
	gasSpent: number;
	grossHourlyRate: number;
	liquidHourlyRate: number;
};
