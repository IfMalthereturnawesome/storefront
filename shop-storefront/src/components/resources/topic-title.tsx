import Image from 'next/image';
import SleepEssentialsSVG from '../../../public/images/eight-athletics-sleep-essentials_resource.svg';
import SleepScienceSVG from '../../../public/images/eight-athletics-sleep-science_resource.svg';
import SleepAthleticsSVG from '../../../public/images/eight-athletics-sleep-athletics_resource.svg';

export default function TopicTitle({
  name,
  segment,
}: {
  name: string;
  segment: string;
}) {
  let svgSource;

  switch (segment) {
    case 'sleep-essentials':
      svgSource = SleepEssentialsSVG;
      break;
    case 'sleep-science':
      svgSource = SleepScienceSVG;
      break;
    case 'sleep-athletics':
      svgSource = SleepAthleticsSVG;
      break;
    default:
      break;
  }

  return (
    <>
      <Image src={svgSource} width={64} height={54} alt={segment} />
      <span
        className="ml-4 bg-gradient-to-r from-caction-700 via-csecondary-900 to-caction-800 bg-clip-text text-3xl font-bold 
  text-transparent transition duration-500 
  ease-in-out hover:from-caction-800 hover:via-csecondary-700 hover:to-caction-950 hover:bg-clip-text 
  dark:from-caction-300 dark:via-cgreen-100 dark:to-cgreen-300 
  dark:hover:from-caction-300 dark:hover:via-cgreen-200 dark:hover:to-caction-200"
      >
        {name}
      </span>
    </>
  );
}
