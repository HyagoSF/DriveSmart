import Image from 'next/image';
import smartAreaIcon from '../../images/navbar/SmartAreaIcon.png';

export default function SmartAreaIcon({
	width,
	height,
}: {
	width: number;
	height: number;
}) {
	return (
		<Image
			src={smartAreaIcon}
			alt="SmartAreaIcon"
			width={width}
			height={height}
		/>
	);
}
