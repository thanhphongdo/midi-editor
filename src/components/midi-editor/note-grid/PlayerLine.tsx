import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useMidiEditorContext } from "../providers/MidiEditorProvider.Context";

export function PlayerLine() {
  const { player, gridOptions, gridRef } = useMidiEditorContext();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [lineWidth, setLineWidth] = useState(0);

  const updateWidth = () => {
    const scrollWidth = gridRef.current?.scrollWidth ?? 0;
    const padding = isMobile ? 72 : 80;
    setLineWidth(scrollWidth - padding);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isMobile, gridRef]);

  useEffect(() => {
    updateWidth();
  }, [gridRef.current?.scrollWidth]);

  return (
    <div
      className="absolute lg:w-[calc(100%_+_1rem)] bg-red-500 h-[2px] left-16 z-0 mt-12 transition-all duration-75"
      style={{
        top: gridOptions.timeScalePer1s * player.time - (player.time ? 2 : 0),
        width: lineWidth,
      }}
    ></div>
  );
}
