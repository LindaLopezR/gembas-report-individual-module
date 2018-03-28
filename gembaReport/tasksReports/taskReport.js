import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import '../docsReports/docsReport.js';
import './taskReport.html';

Template.taskReport.rendered = function(){
  console.log('Task report: ', this);
};

Template.taskReport.helpers({

  getIcon() {
    let id = this.location._id;
    let task = this.task;
    let report = this.report;
    let compilance = false;

    let jsonTemp = {};

    _.each(report.locationsReports, function(item){
      if(item.location == id){
        jsonTemp = item;
      }
    });

    _.each(jsonTemp.tasksReports, function(temp){
      if(task._id == temp.task){
        compilance = temp.compilance;
      }
    });

		return compilance?'checkmark':'remove';
	},

  getColor() {
    let id = this.location._id;
    let task = this.task;
    let report = this.report;
    let compilance = false;

    let jsonTemp = {};

    _.each(report.locationsReports, function(item){
      if(item.location == id){
        jsonTemp = item;
      }
    });

    _.each(jsonTemp.tasksReports, function(temp){
      if(task._id == temp.task){
        compilance = temp.compilance;
      }
    });

    return compilance?'green':'red';
  },

  getDocs() {
    let locationId = this.location._id;
    let taskId = this.task._id;

    let reports = this.report.locationsReports.filter(function(report) {
      return report.location == locationId;
    });
    let report = reports[0];
    let tasks = report.tasksReports.filter(function(taskReport) {
      return taskReport.task === taskId;
    })
    let task = tasks[0];

    return task.docs;
  }

});
