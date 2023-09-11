import {useState, useEffect, useRef} from 'react';

export const useDropdownHoverMenu = () => {
  let timeout: NodeJS.Timeout;
  const timeoutDuration = 20;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);
  const [hoverInProgress, setHoverInProgress] = useState(false);  // <-- add this line

  const toggleMenu = (open: any) => {
    setOpenState(openState => !openState);
    buttonRef?.current?.click();
  };

  const onHover = (open: any, action: string) => {
    setHoverInProgress(true);  // <-- add this line

    if (
        (open && !openState && action === 'onMouseEnter') ||
        (!open && openState && action === 'onMouseLeave')
    ) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        toggleMenu(open);
        setHoverInProgress(false);  // <-- add this line
      }, timeoutDuration);
    }
  };

  const handleClick = (open: boolean) => {
    if (!hoverInProgress) {  // <-- add this line
      setOpenState(!open);
      clearTimeout(timeout);
    }
  };

  const handleClickOutside = (event: {
    target: any;
    stopPropagation: () => void;
  }) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return {
    buttonRef,
    openState,
    toggleMenu,
    onHover,
    handleClick,
  };
};
