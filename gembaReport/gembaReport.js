import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

import moment from 'moment';

import './modalOpenReport/modalOpenReport.js';
import './locationsReports/locationReport.js';
import './gembaReport.html';

Template.gembaReport.rendered = function(){
  $("#page-wrap").wrapInner("<table cellspacing='30'><tr>");
  $(".columnScroll").wrap("<td class='tableScroll'></td>");

  $('#loadingReport').hide();
  $('.more').hide();
}
Template.gembaReport.events({
  'click .info'(e) {
    e.preventDefault();
    let textMore = $(e.target).closest('.info').next('.more');
    textMore.toggle(200);
  },

  'click #reportGemba'(e, template) {

    $('#loadingReport').show();
    let historyId = template.data.history._id;

    Meteor.call('getUrlForHistoryReport', historyId, function(error, result) {

      $('#loadingReport').hide();

      if (error) {
        console.log(error);
        let message = error.reason || 'Error';
        Session.set('ERROR_MESSAGE', message);
        $('#modalError').modal('show');
      }

      if (result) {
        console.log(result);
        Session.set('REPORT_URL', result);

        //TODO Esperar a que este la URL en la variable de sesion
        setTimeout(function(){ 
          $('#modalOpenReport').modal('show');
        }, 30);

      }

    });

  }

});

Template.gembaReport.helpers({

  labelDate() {
    console.log('Label date: ', this);
    if (this.history) {
      return moment(this.history.completeDate).format('MMM-DD-YYYY hh:mm A');
    }
  },

  getDataToLoc() {
    return {
      tasks  : this.tasks,
      docs   : this.docs,
      report : this.report
    }
  },

});
