import Image from 'next/image';
import redArrowIcon from '../../images/navbar/RedArrowIcon.png';

export default function RedArrowIcon({
	width,
	height,
	paddingY,
}: {
	width: number;
	height: number;
	paddingY: number;
}) {
	return (
		<Image
			src={redArrowIcon}
			alt="RedArrowIcon"
			width={width}
			height={height}
			className={`py-${paddingY}`}
		/>
	);
}
