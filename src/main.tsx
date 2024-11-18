import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import router from "./AppRoutes.tsx";
import {RouterProvider} from "react-router-dom";


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppTheme from "./theme/AppTheme.tsx";
import {Provider} from "react-redux";
import {store} from "./store";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppTheme>
          <Provider store={store}>
            <RouterProvider router={ router } />
          </Provider>
      </AppTheme>
  </StrictMode>,
)
