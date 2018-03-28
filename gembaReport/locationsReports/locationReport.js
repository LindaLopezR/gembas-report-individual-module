import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Tasks } from 'meteor/igoandsee:tasks-collection';

import '../tasksReports/taskReport.js';
import './locationReport.html';

Template.locationReport.helpers({

  getTasks(report, location) {

    console.log(report);
    let ids = [];

    _.each(report.locationsReports, function(item){

      if(item.location == location._id){
        _.each(item.tasksReports, function(tr){
          ids.push(tr.task);
        });
      }

    });

    return Tasks.find({_id:{$in:ids}},{sort:{createdAt:1}});
  },

  getScore() {
    let id = this.location._id;
    let report = this.report;
    let score = 0;
    _.each(report.locationsReports, function(item){
      if (item.location == id) {
        score = item.score;
      }
    });
    return score;
  }

});
