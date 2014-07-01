var versionNumber = "Xtender v2.0.10";
var thisURL = window.location.pathname;
	thisURL = thisURL.toLowerCase();
var thisTitle = document.title;
	thisTitle = thisTitle.toLowerCase();

window.onload = function() {
	//loads prefs
	if (thisTitle.indexOf("nzbdrone") >= 0) {
		chrome.storage.sync.get('prefs', function(items) {
			$("body").append("<input type='hidden' id='chk_DogNZB' value='" + items.prefs.chk_DogNZB + "'>");
			$("body").append("<input type='hidden' id='chk_NZBsDotOrg' value='" + items.prefs.chk_NZBsDotOrg + "'>");
			$("body").append("<input type='hidden' id='chk_NZBIndex' value='" + items.prefs.chk_NZBIndex + "'>");
			$("body").append("<input type='hidden' id='chk_Binsearch' value='" + items.prefs.chk_Binsearch + "'>");
			$("body").append("<input type='hidden' id='chk_NzbFinder' value='" + items.prefs.chk_NzbFinder + "'>");
			$("body").append("<input type='hidden' id='chk_OMGWTFNZBz' value='" + items.prefs.chk_OMGWTFNZBz + "'>");
			$("body").append("<input type='hidden' id='chk_NewzB' value='" + items.prefs.chk_NewzB + "'>");
			$("body").append("<input type='hidden' id='chk_NzbSu' value='" + items.prefs.chk_NzbSu + "'>");
			$("body").append("<input type='hidden' id='chk_BTDigg' value='" + items.prefs.chk_BTDigg + "'>");
			$("body").append("<input type='hidden' id='chk_NewTorrents' value='" + items.prefs.chk_NewTorrents + "'>");
			$("body").append("<input type='hidden' id='chk_KickAssTorrents' value='" + items.prefs.chk_KickAssTorrents + "'>");
			$("body").append("<input type='hidden' id='chk_ThePirateBay' value='" + items.prefs.chk_ThePirateBay + "'>");
			$("body").append("<input type='hidden' id='chk_l337x' value='" + items.prefs.chk_l337x + "'>");
			$("body").append("<input type='hidden' id='chk_h33t' value='" + items.prefs.chk_h33t + "'>");
			$("body").append("<input type='hidden' id='chk_Fenopy' value='" + items.prefs.chk_Fenopy + "'>");
			$("body").append("<input type='hidden' id='chk_TorrentzEu' value='" + items.prefs.chk_TorrentzEu + "'>");
			$("body").append("<input type='hidden' id='chk_FilesTube' value='" + items.prefs.chk_FilesTube + "'>");
			$("body").append("<input type='hidden' id='chk_OZNzb' value='" + items.prefs.chk_OZNzb + "'>");
		});
	}
};

var intervalsUpdateNavbarAndFooter = 0;
var updateNavbarAndFooter = setInterval(function() {
	
	if ($('.navbar-nzbdrone ul.navbar-nav:not(.navbar-right)').length) {
		// --- Set Low Voltage Free Text Page Link --- //
		var iconsPath = chrome.extension.getURL("icons");			
		$(".navbar-nzbdrone ul.navbar-nav:not(.navbar-right)").append("<li id='li-low-voltage'><a target='_blank' style='margin:0; padding:3px;' href='http://dl.dropbox.com/u/2569529/webpages/low_voltage_generator/lowvoltagegenerator.html'><img width='48px' height='48px' border='0' align='absmiddle' src='" + iconsPath + "/lowvoltage.png' /><br>Low Voltage</a></li>");
		// --- Set Foot version number --- //
		$("div#footer-region").append("<span style='padding-left:15px;'> " + versionNumber + " </span>");
		// call add click events to navbar li items
		addClickEventsToMainNavbarItems();    
		clearInterval(updateNavbarAndFooter);
	}
	intervalsUpdateNavbarAndFooter = intervalsUpdateNavbarAndFooter + 1;
	if (intervalsUpdateNavbarAndFooter > 20) { clearInterval(updateNavbarAndFooter) }
}, 200); // check every 200ms

var checkToAddToggle100PctSeries = setInterval(function() {
	if ($("div#x-series > table").length > 0 && $('#btnXtenderEpisodes').length == 0) {
		addToggle100PctSeries();
		clearInterval(checkToAddToggle100PctSeries);
	}
}, 1000);

function addToggle100PctSeries() {
	if($("div#x-series > table").length > 0 && $('#btnXtenderEpisodes').length == 0) {
		$("div#x-series").prepend("<div class='pull-right'><button id='btnXtenderEpisodes' style='border: 0; padding: 3px 7px; border-radius: 50%; background: #C4273C; color: white; cursor: pointer; font-size: 18px; font-weight: 300; width: 32px; height: 30px;'><i class='icon-tasks' style='cursor: pointer;'></i></button></div>");
		$('#btnXtenderEpisodes').click(function () {
			$('div.progress-bar.episode-progress[style=\"width:100%\"]').closest("tr").toggle();
		});
	}
}

function addClickEventsToMainNavbarItems() {
	$("ul.navbar-nav:not(.navbar-right) li").on("click", function() {
		var checkToAddToggle100PctSeries = setInterval(function() {
			if ($("div#x-series > table").length) {
				addToggle100PctSeries();
				clearInterval(checkToAddToggle100PctSeries);
			}
		}, 1000);
	});
}


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observerMenu = new MutationObserver(function(mutations, observer) {
	if (thisTitle.indexOf("nzbdrone") >= 0) {
		// --- add click js to hide 100% episodes
		if($('#btnXtenderEpisodes').length == 0) {
			addToggle100PctSeries();
		}
	}
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
if (document.getElementById('main-region')){
	observerMenu.observe(document.getElementById('main-region'), {
	  //childList: true
	  subtree: true,
	  attributes: true
	  //...
	});	
}

var observerModal = new MutationObserver(function(mutations, observer) {
	// fired when a mutation occurs
	//console.log(mutations, observer);

	if (thisTitle.indexOf("nzbdrone") >= 0 && $('div.episode-detail-modal').length > 0 && $("#Xtender").length == 0) {
		var iconsPath = chrome.extension.getURL("icons");

		var xSeries = '';
			if( $('a:contains("open series")').length > 0 ) {
				xSeries = $('a:contains("open series")').attr('href').replace('/series/','');
			}
			else {
				xSeries = (document.title).replace(/(.*) - NzbDrone/, '$1');
			}

			// -- Series Search Exceptions --
			xSeries = xSeries.replace('Crime Scene Investigation', '');

			// -- Series Name Formatting --
			xSeries = xSeries.replace(/ \(([0-9]{4})\)/, '');
			xSeries = xSeries.replace(' (US)', '');
			xSeries = xSeries.replace(' (UK)', '');
			xSeries = xSeries.replace(':', ' ');
			xSeries = xSeries.replace('&', ' ');
			//xSeries = xSeries.replace('-', ' ');
			xSeries = xSeries.replace(/-*,-*|-+/g, ' ');
			xSeries = xSeries.replace('\'', '');
			xSeries = xSeries.replace(/\s{2,}/g, ' ');	

		var xEpisode = $('div.episode-detail-modal div.modal-header > h3').text();
			if (xEpisode.match(/[0-9]{2}x/)) {
				xEpisode = xEpisode.replace(/([0-9]{2})x/, 's$1e');
			} else if (xEpisode.match(/[0-9]{1}x/)) {
				xEpisode = xEpisode.replace(/([0-9]{1})x/, 's0$1e');
			}
			xEpisode = xEpisode.replace(/[\n\r]/g, '');
			xEpisode = xEpisode.replace(/(.*)(s[0-9]{2}e[0-9]{2})/, '$2');
			xEpisode = xEpisode.replace(/\s{1,}/g, '');
			xEpisode = xEpisode.replace(/(s[0-9]{2}e[0-9]{2})(.*)/, '$1');
			

		var xSearchString = xSeries + ' ' + xEpisode;
		var xSearchStringPlus = xSearchString.replace(/ /g, '+');

		//Usenet Link
		var DogNZB,
			NZBsDotOrg,
			NZBIndex,
			Binsearch,
			NzbFinder,
			OMGWTFNZBz;
			DogNZB = " <a target='_blank' class='btn btn-mini' href='https://dognzb.cr/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/dognzb.png' /></a> ";
			NZBsDotOrg = " <a target='_blank' class='btn btn-mini' href='https://nzbs.org/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsdotorg.png' /></a> ";
			NZBIndex = " <a target='_blank' class='btn btn-mini' href='http://www.nzbindex.nl/search/?q=" + xSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbindex.png' \/><\/a> ";
			Binsearch = " <a target='_blank' class='btn btn-mini' href='http://www.binsearch.info/?q=" + xSearchStringPlus + "&max=100&adv_age=1100'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/binsearch.png' \/><\/a> ";
			NzbFinder = " <a target='_blank' class='btn btn-mini' href='https://www.nzbfinder.ws/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbfinder.png' \/><\/a> ";
			OMGWTFNZBz = " <a target='_blank' class='btn btn-mini' href='http://omgwtfnzbs.org/browse.php?search=" + xSearchStringPlus + "&amp;cat=default&amp;sort=1&amp;type=1'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/omg.png' width='16' height='16' /></a> ";
		
		//newznab public
		var OZNzb,
			NewzB,
			NzbSu;
			OZNzb = " <a target='_blank' class='btn btn-mini' href='https://www.oznzb.com/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/oznzb.png' \/><\/a> ";
			NewzB = " <a target='_blank' class='btn btn-mini' href='https://newzb.net/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newzb.png' \/><\/a> ";
			NzbSu = " <a target='_blank' class='btn btn-mini' href='https://nzb.su/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsu.png' \/><\/a> ";

		//Bit Torrent Links
		var BTDigg,
			NewTorrents,
			KickAssTorrents,
			ThePirateBay,
			l337x,
			h33t,
			Fenopy,
			TorrentzEu;
			BTDigg = " <a target='_blank' class='btn btn-mini' href='https://btdigg.org/search?q=" + xSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/btdigg.png' /></a> ";
			NewTorrents = " <a target='_blank' class='btn btn-mini' href='http://www.newtorrents.info/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newtorrents.png' /></a> ";
			KickAssTorrents = " <a target='_blank' class='btn btn-mini' href='http://kickass.to/usearch/" + xSearchString + "/'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/kickasstorrents.png' /></a> ";		
			ThePirateBay = " <a target='_blank' class='btn btn-mini' href='http://thepiratebay.se/search/" + xSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/thepiratebay.png' /></a> ";
			l337x = " <a target='_blank' class='btn btn-mini' href='http://1337x.org/search/" + xSearchStringPlus + "/0/'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/1337x.png' /></a> ";
			h33t = " <a target='_blank' class='btn btn-mini' href='http://h33t.to/search/" + xSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/h33t.png' /></a> ";
			Fenopy = " <a target='_blank' class='btn btn-mini' href='http://fenopy.se/?keyword=" + xSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/fenopy.png' /></a> ";
			TorrentzEu = " <a target='_blank' class='btn btn-mini' href='http://torrentz.eu/search?f=" + xSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/torrentzeu.png' /></a> ";
		
		//File Lockers
		var FilesTube;
			FilesTube = " <a target='_blank' class='btn btn-mini' href='http://www.filestube.com/search.html?q=" + xSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/filestube.png' /></a> ";

		var ShowSearchLinks = '';
			if($("input#chk_NZBsDotOrg").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBsDotOrg;
			if($("input#chk_OZNzb").val() !== "true") ShowSearchLinks = ShowSearchLinks + OZNzb;
			if($("input#chk_DogNZB").val() !== "true") ShowSearchLinks = ShowSearchLinks + DogNZB;
			if($("input#chk_NZBIndex").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBIndex;
			if($("input#chk_Binsearch").val() !== "true") ShowSearchLinks = ShowSearchLinks + Binsearch;
			if($("input#chk_NzbFinder").val() !== "true") ShowSearchLinks = ShowSearchLinks + NzbFinder;
			if($("input#chk_OMGWTFNZBz").val() !== "true") ShowSearchLinks = ShowSearchLinks + OMGWTFNZBz;
			if($("input#chk_NewzB").val() !== "true") ShowSearchLinks = ShowSearchLinks + NewzB;
			if($("input#chk_NzbSu").val() !== "true") ShowSearchLinks = ShowSearchLinks + NzbSu;
			if($("input#chk_BTDigg").val() !== "true") ShowSearchLinks = ShowSearchLinks + BTDigg;
			if($("input#chk_NewTorrents").val() !== "true") ShowSearchLinks = ShowSearchLinks + NewTorrents;
			if($("input#chk_KickAssTorrents").val() !== "true") ShowSearchLinks = ShowSearchLinks + KickAssTorrents;
			if($("input#chk_ThePirateBay").val() !== "true") ShowSearchLinks = ShowSearchLinks + ThePirateBay;
			if($("input#chk_l337x").val() !== "true") ShowSearchLinks = ShowSearchLinks + l337x;
			if($("input#chk_h33t").val() !== "true") ShowSearchLinks = ShowSearchLinks + h33t;
			if($("input#chk_Fenopy").val() !== "true") ShowSearchLinks = ShowSearchLinks + Fenopy;
			if($("input#chk_TorrentzEu").val() !== "true") ShowSearchLinks = ShowSearchLinks + TorrentzEu;
			if($("input#chk_FilesTube").val() !== "true") ShowSearchLinks = ShowSearchLinks + FilesTube;	

		$('div.episode-detail-modal div.modal-body').append('<div style="width:610px; margin:0 auto; text-align:center; padding-top:15px;"id="Xtender">' + ShowSearchLinks +'</div>');
	}   
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
if(document.getElementById('modal-region')) {
	observerModal.observe(document.getElementById('modal-region'), {
	  //childList: true
	  subtree: true,
	  attributes: true
	  //...
	});
}
