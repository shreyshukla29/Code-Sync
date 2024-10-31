import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SocketEvent } from "../../types/socket";
import { useCallback, useEffect } from "react";
import { Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";

function DrawingEditor() {
  const { isMobile } = useWindowDimensions();

  return (
    <Tldraw
      inferDarkMode
      forceMobile={isMobile}
      defaultName="Editor"
      className="z-0"
    >
      <ReachEditor />
    </Tldraw>
  );
}

function ReachEditor() {
  const editor = useEditor();
  const { drawingData, setDrawingData } = useAppContext();
  const { socket } = useSocket();

  // handleChangeEvent - called when local drawing changes
  const handleChangeEvent = useCallback(
    (change /* HistoryEntry<TLRecord> */) => {
      const snapshot = change.changes;
      setDrawingData(editor.store.getSnapshot());
      socket.emit(SocketEvent.DRAWING_UPDATE, { snapshot });
    },
    [editor.store, setDrawingData, socket]
  );

  // handleRemoteDrawing - processes incoming drawing data from other users
  const handleRemoteDrawing = useCallback(
    ({ snapshot } /* { snapshot: RecordsDiff<TLRecord> } */) => {
      editor.store.mergeRemoteChanges(() => {
        const { added, updated, removed } = snapshot;

        for (const record of Object.values(added)) {
          editor.store.put([record]);
        }
        for (const [, to] of Object.values(updated)) {
          editor.store.put([to]);
        }
        for (const record of Object.values(removed)) {
          editor.store.remove([record.id]);
        }
      });

      setDrawingData(editor.store.getSnapshot());
    },
    [editor.store, setDrawingData]
  );

  // Load drawing data from context if available
  useEffect(() => {
    if (drawingData && Object.keys(drawingData).length > 0) {
      editor.store.loadSnapshot(drawingData);
    }
  }, [drawingData, editor.store]);

  // Set up and clean up event listeners for local and remote drawing updates
  useEffect(() => {
    const cleanupFunction = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "document",
    });

    socket.on(SocketEvent.DRAWING_UPDATE, handleRemoteDrawing);

    return () => {
      cleanupFunction();
      socket.off(SocketEvent.DRAWING_UPDATE);
    };
  }, [editor.store, handleChangeEvent, handleRemoteDrawing, socket]);

  return null;
}

export default DrawingEditor;
