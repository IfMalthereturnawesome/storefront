import React from 'react';

interface Props {
  children: string;
  wordsToHighlight: string[];
}

const BlueHighlight: React.FC<Props> = ({children, wordsToHighlight}) => {
  const highlightedText = children.split(' ').map(word => {
    if (wordsToHighlight.includes(word)) {
      return (
        <span key={word} className="bg-white text-black ">
          {word}
        </span>
      );
    } else {
      return (
        <span key={word} className="font-bold">
          {word}{' '}
        </span>
      );
    }
  });

  return <>{highlightedText}</>;
};

export default BlueHighlight;
