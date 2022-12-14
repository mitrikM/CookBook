import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { AppLayout } from './components/AppLayoutStuff/AppLayout';
import { ApiTestPage } from './pages/ApiTestPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeListPage } from './pages/RecipeListPage';
import {RecipeDetailPage} from "./pages/RecipeDetailPage";
import {RecipeInsertFormPage} from "./pages/RecipeInsertFormularPage";
import {SideDishPage} from "./pages/SideDishPage";
import {EditPage} from "./pages/EditPage";

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<RecipeListPage />} />
            <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/recipe-insert" element={<RecipeInsertFormPage />} />
            <Route path="/side-dish" element={<SideDishPage/>} />
            <Route path="/recipe/:slug/edit" element={<EditPage/>}/>
          </Routes>
        </AppLayout>
      </ChakraProvider>
    </BrowserRouter>
  );
}
