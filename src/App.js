import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';

const Home = lazy(() => import("./pages/Home"));
const EstateRedactor = lazy(() => import("./Components/EstatesRedactor/EstatesRedactor"));
const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm"));

function App({ history }) {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>...Загрузка</div>}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/admin" component={EstateRedactor}/>
                    <Route path="/login/:quest_key?" history={history} exact component={LoginForm}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
