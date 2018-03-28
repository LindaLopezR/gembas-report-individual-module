import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './docsReport.html';

Template.docsReport.helpers({

	getDataCell(data) {
		let type = getTypeFromUrl(data);
		switch(type){
			case 0 :
				return Spacebars.SafeString('<img class="ui tiny image" src="' + data + '">');
			case 1 :
				return Spacebars.SafeString('<a href="' + data +'">' + data +'</a>');
			case 5 :
				return data + ' ' + TAPi18n.__('seconds');
			case 6 :
				return data;
			case 7 : 
				return Spacebars.SafeString(
					'<a href="https://maps.google.com/?ll=' + data + ',' + data + '&z=18" target="_blank"><img class="ui small image" src="/img/mapa-09.png"></a>'
				);
			default :
				return TAPi18n.__('n_a');
		}

	},

	getTypeCell(data) {
		let type = getTypeFromUrl(data);
		switch(type){
			case 0 :
				return TAPi18n.__('picture');
			case 1 :
				return TAPi18n.__('audio');
			case 5 :
				return TAPi18n.__('time');
			case 6 :
				return TAPi18n.__('note');
			case 7 :
				return TAPi18n.__('gps');
			default :
				return TAPi18n.__('n_a') + type;
		}

	}

});

function getTypeFromUrl(data) {
	if (data.endsWith('jpg') || data.endsWith('png')) {
		return 0;
	}
	if (data.endsWith('mp4') || data.endsWith('webm')) {
		return 1;
	}
	if (data.indexOf(':') > -1) {
		return 5;
	}
	else {
		return 6;
	}
}
