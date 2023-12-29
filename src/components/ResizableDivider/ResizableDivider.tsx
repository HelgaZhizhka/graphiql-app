import { useRef, useState, useCallback } from 'react';

import styles from './ResizableDivider.module.scss';

type Props = {
  onResize(delta: number, containerSize: number): void;
  direction: 'horizontal' | 'vertical';
};

const ResizableDivider: React.FC<Props> = ({ onResize, direction }) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const classDivider = `${styles.root} ${isDragging ? styles.dragging : ''} ${
    direction === 'vertical' ? styles.vertical : styles.horizontal
  }`;

  const getContainerSize = useCallback(() => {
    const container = dividerRef.current?.parentElement;
    return container ? container.getBoundingClientRect() : { width: 0, height: 0 };
  }, []);

  const onDragging = useCallback(
    (event: MouseEvent) => {
      if (!dividerRef.current) return;

      const { width, height } = getContainerSize();
      const delta = direction === 'vertical' ? event.movementX : event.movementY;
      const containerSize = direction === 'vertical' ? width : height;

      onResize(delta, containerSize);
    },
    [direction, onResize, getContainerSize]
  );

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', onDragging);
    document.removeEventListener('mouseup', stopDragging);
  }, [onDragging]);

  const startDragging = useCallback(() => {
    setIsDragging(true);
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', stopDragging);
  }, [onDragging, stopDragging]);

  return <div ref={dividerRef} className={classDivider} onMouseDown={startDragging} />;
};

export default ResizableDivider;
