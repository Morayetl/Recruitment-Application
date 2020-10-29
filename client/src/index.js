import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Jobs from './Pages/Jobs/Jobs';
import RegisterRecruiter from './Pages/RegisterRecruiter/RegisterRecruiter';
import { Route, Redirect, Router, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './css/custom-style.css';
import reducer from './redux/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import RecruiterPage from './Pages/RecruiterPage/RecruiterPage';
import CandidatePages from './Pages/CandidatePages/CandidatePages';
import cookie from 'js-cookie';
import { USER_ROLES, COOKIES } from './Utils/constants';
import Products from './Pages/Products/Products';
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n";
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Faq from './Pages/Faq/Faq';
import CookiePolicyPopUp from './Shared/CookiePolicyPopUp/CookiePolicyPopUp';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import ReactGA from 'react-ga';

import { ConfigProvider } from 'antd';
import NetworkError from './Pages/NetworkError/NetworkError';
import { SignUpContextProvider } from './Shared/Modals/SignUpModal/SignUpContextProvider';
import { getLanguageByLocalization, getLanguage } from './Utils/localization';
import ScrollToTop from './Utils/ScrollToTop';

const history = require('history');

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const role = rest.role || null;
        if(cookie.get('role') === role && cookie.get('authorization') !== undefined){
          return (children);
        }else{
          return (<Redirect
            to={{
              pathname: "/"
            }}
          />)
        }
      }
      }
    />
  );
}

const store = createStore(
  reducer
);

let locale = null;

const language = cookie.get(COOKIES.language);

if(language){
  const localization = getLanguage(language);
  locale = localization.locale;
}else{
  const localization = getLanguageByLocalization();
  locale = localization.locale;
}

// initialize google analytics

const browserHistory = history.createBrowserHistory();
ReactGA.initialize('YOUR GA-KEY');
browserHistory.listen((location, action) => {
  // in production mode send analytics
  if(process.env.NODE_ENV !== 'development'){
    // Send urls to google analytics
    if(location.pathname === '/jobs'){
      ReactGA.pageview(location.pathname + location.search);  
    }else{
      ReactGA.pageview(location.pathname);
    }
  }
});

const routing = (
  <SignUpContextProvider>
    <ConfigProvider locale={locale}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router history={browserHistory}>
            <ScrollToTop/>
            { cookie.get(COOKIES.cookiePolicyAgreement) ? null : <CookiePolicyPopUp/> }
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/employers" component={Products} />
              <Route path="/network-error" component={NetworkError} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/recruiters" component={RegisterRecruiter} />
              <Route path="/confirm-email" component={ConfirmEmail} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/faq" component={Faq} />
              <PrivateRoute path="/products" role={USER_ROLES.employer}>
                <Route component={Products}/>
              </PrivateRoute>      
              <PrivateRoute path="/employer" role={USER_ROLES.employer}>
                <Route component={RecruiterPage}/>
              </PrivateRoute>
              <PrivateRoute path="/user" role={USER_ROLES.employee}>
                <Route component={CandidatePages}/>
              </PrivateRoute>
              <Route component={PageNotFound}/>
            </Switch>
          </Router>
        </Provider>
      </I18nextProvider>  
    </ConfigProvider>    
  </SignUpContextProvider>


);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
