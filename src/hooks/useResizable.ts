import { useState, useCallback, useMemo } from 'react';

export const useResizableHeight = (
  initialEditorHeight: number,
  initialTabsHeight: number,
  minHeight: number = 50,
  maxHeightInput: number
) => {
  const totalHeight = useMemo(
    () => initialEditorHeight + initialTabsHeight,
    [initialEditorHeight, initialTabsHeight]
  );
  const maxHeight = useMemo(
    () => maxHeightInput || totalHeight - minHeight,
    [maxHeightInput, totalHeight, minHeight]
  );

  const [heights, setHeights] = useState({
    editorHeight: initialEditorHeight,
    tabsHeight: initialTabsHeight,
  });

  const handleResizeHeight = useCallback(
    (delta: number) => {
      setHeights(({ editorHeight }) => {
        const newEditorHeight = Math.min(Math.max(editorHeight + delta, minHeight), maxHeight);
        const newTabsHeight = totalHeight - newEditorHeight;
        return { editorHeight: newEditorHeight, tabsHeight: newTabsHeight };
      });
    },
    [minHeight, maxHeight, totalHeight]
  );

  return { ...heights, handleResizeHeight };
};

export const useResizableWidth = (
  initialEditorWidth: number,
  initialResponseWidth: number,
  minWidth: number = 50,
  maxWidthInput: number
) => {
  const totalWidth = useMemo(
    () => initialEditorWidth + initialResponseWidth,
    [initialEditorWidth, initialResponseWidth]
  );
  const maxWidth = useMemo(
    () => maxWidthInput || totalWidth - minWidth,
    [maxWidthInput, totalWidth, minWidth]
  );

  const [widths, setWidths] = useState({
    editorWidth: initialEditorWidth,
    responseWidth: initialResponseWidth,
  });

  const handleResizeWidth = useCallback(
    (delta: number) => {
      setWidths(({ editorWidth }) => {
        const newEditorWidth = Math.min(Math.max(editorWidth + delta, minWidth), maxWidth);
        const newResponseWidth = totalWidth - newEditorWidth;
        return { editorWidth: newEditorWidth, responseWidth: newResponseWidth };
      });
    },
    [minWidth, maxWidth, totalWidth]
  );

  return { ...widths, handleResizeWidth };
};
