import { useState, useCallback } from 'react';

export const useResizableHeight = (minHeightPercent = 20, maxHeightPercent = 80) => {
  const [editorHeightPercent, setEditorHeightPercent] = useState(50);

  const handleResizeHeight = useCallback(
    (deltaY: number, containerHeight: number) => {
      setEditorHeightPercent((prevHeightPercent) => {
        const deltaPercent = (deltaY / containerHeight) * 100;
        const newHeightPercent = Math.min(
          Math.max(prevHeightPercent + deltaPercent, minHeightPercent),
          maxHeightPercent
        );
        return newHeightPercent;
      });
    },
    [minHeightPercent, maxHeightPercent]
  );

  const tabsHeightPercent = 100 - editorHeightPercent;

  return { editorHeightPercent, tabsHeightPercent, handleResizeHeight };
};

export const useResizableWidth = (minWidthPercent = 20, maxWidthPercent = 90) => {
  const [editorWidthPercent, setEditorWidthPercent] = useState(50);

  const handleResizeWidth = useCallback(
    (deltaX: number, containerWidth: number) => {
      setEditorWidthPercent((prevWidthPercent) => {
        const deltaPercent = (deltaX / containerWidth) * 100;
        const newWidthPercent = Math.min(
          Math.max(prevWidthPercent + deltaPercent, minWidthPercent),
          maxWidthPercent
        );
        return newWidthPercent;
      });
    },
    [minWidthPercent, maxWidthPercent]
  );

  const responseWidthPercent = 100 - editorWidthPercent;

  return { editorWidthPercent, responseWidthPercent, handleResizeWidth };
};
