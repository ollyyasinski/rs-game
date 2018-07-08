import 'bootstrap/dist/css/bootstrap.min.css';
import './screens/home/css/style.css';
import $ from 'jquery';
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/widgets/draggable');
require('jquery-ui/ui/disable-selection');
import _ from 'lodash';
const HTML = require('./screens/home/index.html');
const FONTS = require('./screens/home/fonts/GWENT-ExtraBold.ttf');

import { HomeScreen } from './screens/home/homeScreen';
new HomeScreen().createHomeScreen();
