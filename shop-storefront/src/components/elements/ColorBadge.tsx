import React from 'react';

type ColorBadgeProps = {
  color: string;
};

const allowedColors = [
  'blue',
  'gray',
  'red',
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
];

const ColorBadge: React.FC<ColorBadgeProps> = ({color}) => {
  if (!allowedColors.includes(color)) {
    throw new Error(`Invalid color: ${color}`);
  }

  const bgColor = `bg-${color}-100 dark:bg-${color}-900`;
  const textColor = `text-${color}-800 dark:text-${color}-300`;

  return (
    <span
      className={`mr-2 rounded px-2.5 py-0.5 text-sm font-medium ${bgColor} ${textColor}`}
    >
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </span>
  );
};

export default ColorBadge;
