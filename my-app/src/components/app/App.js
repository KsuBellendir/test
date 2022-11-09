import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import("../pages/MainPages"));
const ComicsPage = lazy(() => import('../pages/ComicsPages'));
const SingleComicPage = lazy(() => import('../pages/SingalComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SearcCharForm = lazy(() => import('../pages/SearcCharForm'));
const App = () => {
    return (
      <Router>
        <div className="app">
          <AppHeader/>
          <main>
            <Suspense fallback={<span>Loading...</span>}>
              <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/characters/:id' element={<SearcCharForm/>} dataType='character' />
                <Route path='/comics' element={<ComicsPage/>}/>
                <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                <Route path='*' element={<Page404/>}/>
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    );
}



export default App;