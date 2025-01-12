import type * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import type { WebSocketContext } from "@fern-api/fdr-sdk/api-definition";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ExplorerWebSocketRequestFormState } from "../types";
import { ExplorerWebSocketSessionForm } from "./ExplorerWebSocketSessionForm";

interface ExplorerWebSocketContentProps {
  context: WebSocketContext;
  formState: ExplorerWebSocketRequestFormState;
  setFormState: Dispatch<SetStateAction<ExplorerWebSocketRequestFormState>>;
  startSesssion: () => void;
  clearMessages: () => void;
  sendMessage: (message: ApiDefinition.WebSocketMessage, data: unknown) => void;
  connected: boolean;
  error: string | null;
}

export const ExplorerWebSocketContent: FC<ExplorerWebSocketContentProps> = ({
  context,
  formState,
  setFormState,
  sendMessage,
  startSesssion,
  clearMessages,
  connected,
  error,
}) => {
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || scrollAreaRef.current == null) {
      return;
    }
    const resizeObserver = new window.ResizeObserver(([size]) => {
      if (size != null) {
        setScrollAreaHeight(size.contentRect.height);
      }
    });
    resizeObserver.observe(scrollAreaRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-0 w-full flex-1 shrink items-stretch divide-x">
      <div
        ref={scrollAreaRef}
        className="mask-grad-top-6 w-full overflow-x-hidden overflow-y-scroll overscroll-contain"
      >
        <ExplorerWebSocketSessionForm
          context={context}
          formState={formState}
          scrollAreaHeight={scrollAreaHeight}
          setFormState={setFormState}
          sendMessage={sendMessage}
          startSession={startSesssion}
          clearMessages={clearMessages}
          connected={connected}
          error={error}
        />
      </div>
    </div>
  );
};
