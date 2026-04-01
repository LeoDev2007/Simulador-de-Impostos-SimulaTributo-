import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IRProvider } from "./contexts/IRContext.tsx";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import "./index.css";
import App from "./App.tsx";
import { ICMSProvider } from "./contexts/ICMSContext.tsx";
import { ActiveTaxProvider } from "./contexts/ActiveTaxContext.tsx";
import { HistoryProvider } from "./contexts/HistoryContext.tsx";
import { IPVAProvider } from "./contexts/IPVAContext.tsx";

const system = createSystem(defaultConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ActiveTaxProvider>
        <HistoryProvider>
          <IPVAProvider>
            <ICMSProvider>
              <IRProvider>
                <App />
              </IRProvider>
            </ICMSProvider>
          </IPVAProvider>
        </HistoryProvider>
      </ActiveTaxProvider>
    </ChakraProvider>
  </StrictMode>,
);
