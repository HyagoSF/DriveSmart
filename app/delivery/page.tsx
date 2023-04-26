import Link from 'next/link';
import {
	User,
	BellIcon,
	Car,
	ChevronDown,
	Home as HomeIcon,
	CalendarSearch,
	DollarSign,
	Receipt,
} from 'lucide-react';
import DeliveryForm from '../components/DeliveryForm';

export default function Delivery() {
	return (
		<div className=" min-h-screen">
			<DeliveryForm />
		</div>
	);
}
