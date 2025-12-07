import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "@/components/ui/provider"
import App from './App'
import './index.css'

const isStrict = import.meta.env.VITE_STRICT_MODE === "true";

console.log(isStrict);
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {isStrict ?
      (
        <StrictMode>
          <Provider>
            <App />
          </Provider>
        </StrictMode>
      ) : (
          <Provider>
            <App />
          </Provider>
      )}
  </BrowserRouter>
)
