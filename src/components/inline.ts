import { createContext, useContext } from "react";

/** True when a page is being rendered as terminal output rather than as the routed page. */
export const InlineContext = createContext(false);

export const useInline = () => useContext(InlineContext);
