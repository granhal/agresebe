import angular from 'angular';

import {hello} from './app/hello';
import {login} from './app/login';
import {blog} from './app/blog';
import Api from './api/api';
import sessionRecoverer from './api/session-recoverer';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, [uiRouter, ngResource, ngAria, ngAnimate, ngMessages, ngMaterial, ngCookies])
  .config(routesConfig)
  .service('api', Api)
  .factory('sessionRecoverer', sessionRecoverer)
  .component('app', hello)
  .component('login', login)
  .component('blog', blog);
