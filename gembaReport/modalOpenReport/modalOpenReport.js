import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

import './modalOpenReport.html';

Template.modalOpenReport.helpers({

  getOpenUrl() {
    return Session.get('REPORT_URL');
  },

});
