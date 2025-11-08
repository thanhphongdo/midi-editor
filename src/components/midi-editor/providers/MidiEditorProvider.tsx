import { PropsWithChildren } from "react";
import { MidiEditorContext } from "./MidiEditorProvider.Context";
import { useMidiEditorManager } from "../hooks/use-midi-editor-manager";

export const MidiEditorProvider = ({
  children,
  id,
}: PropsWithChildren & { id: string }) => {
  const midiEditorEditor = useMidiEditorManager({ id });

  return (
    <MidiEditorContext.Provider value={{ ...midiEditorEditor }}>
      {children}
    </MidiEditorContext.Provider>
  );
};
