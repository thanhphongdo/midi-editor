import { createContext, useContext } from "react";
import { useMidiEditorManager } from "../hooks/use-midi-editor-manager";

export type ContextValue = ReturnType<typeof useMidiEditorManager>;

export const MidiEditorContext = createContext<ContextValue | undefined>(undefined);

export const useMidiEditorContext = () => {
  const context = useContext(MidiEditorContext);
  if (!context) {
    throw new Error("useMidiEditorContext must be used within MidiEditorProvider");
  }
  return context;
};
