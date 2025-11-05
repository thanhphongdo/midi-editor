import { PropsWithChildren } from "react";
import { MidiEditorContext } from "./MidiEditorProvider.Context";
import { useMidiEditorManager } from "../hooks/use-midi-editor-manager";
import { MidiEditor } from "../definitions";

export const MidiEditorProvider = ({
  children,
  midiEditor,
}: PropsWithChildren & { midiEditor?: MidiEditor }) => {
  const midiEditorEditor = useMidiEditorManager({ initialMidiEditor: midiEditor });

  return (
    <MidiEditorContext.Provider value={{ ...midiEditorEditor }}>
      {children}
    </MidiEditorContext.Provider>
  );
};
