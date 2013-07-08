$(function() {
	var versionNumber = '-- NzbDrone Xtender v1.0.15 --';
	var thisURL = window.location.pathname;
		thisURL = thisURL.toLowerCase();
	var thisTitle = document.title;
		thisTitle = thisTitle.toLowerCase();
	var iconsPath = chrome.extension.getURL("icons");
	var tSeason = '';
	var tEpisode = '';
	var tSearchString = '';
	var tSearchStringPlus = '';
	var tSearchStringX = '';
	var tSearchStringXPlus = '';

	if (thisURL.indexOf("series/detail") >= 0) {
		//loads prefs
		chrome.storage.sync.get('prefs', function(items) {
			$("body").append("<input type='hidden' id='chk_DogNZB' value='" + items.prefs.chk_DogNZB + "'>");
			$("body").append("<input type='hidden' id='chk_NZBsDotOrg' value='" + items.prefs.chk_NZBsDotOrg + "'>");
			$("body").append("<input type='hidden' id='chk_NZBIndex' value='" + items.prefs.chk_NZBIndex + "'>");
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

	//find/format ShowName
	var tShow = $("body>div>div#logo>span").text();
		tShow = tShow.replace(/ \(([0-9]{4})\)/, '');
		tShow = tShow.replace(' (US)', '');
		tShow = tShow.replace(':', ' ');
		tShow = tShow.replace('&', ' ');
		tShow = tShow.replace('\'', '');

	// === main series page functions === //
	setTimeout(function() {
		if (thisTitle.indexOf("nzbdrone") >= 0) {
			// --- Set Low Voltage Free Text Page Link --- //
			$("div#menu > ul").append("<li><a target='_blank' title='Low Voltage Generator' href='http://dl.dropbox.com/u/2569529/webpages/low_voltage_generator/lowvoltagegenerator.html'> <img width='48px' height='48px' border='0' align='absmiddle' src='" + iconsPath + "/lowvoltage.png' style='margin-top: -8px;' /></a></li>");

			// --- add click js to hide 100% episodes
			$('th[aria-label="Episodes"]').attr("onClick","$('div.progressbar[data-value=100]').parent().parent().toggle();").css('cursor','pointer');

			// --- add thetvdb show link --- //
			$("tr[data-series-id]").each(function () {
				$(this).children("td:first").prepend("<a target='_blank' href='http://thetvdb.com/?tab=series&id=" + $(this).attr("data-series-id") + "'><img title='thetvdb' src='" + iconsPath + "/thetvdb.png'></a> ");
			});
			
			// --- cleanup status column icons --- //
			$("td.statusColumn>i.icon-play").each(function () {
				$(this).replaceWith("<img title='continuing' src='" + iconsPath + "/yes.png'>");
			});
			$("td.statusColumn>i.icon-stop").each(function () {
				$(this).replaceWith("<img title='ended' src='" + iconsPath + "/no.png'>");
			});

			// --- Set Foot version number --- //
			$("div#footer").append("<span style='font-size:10px; color:#FFFFFF; float:right;'> " + versionNumber + " </span>");
		};
	}, 100);

	// === series details page functions === //
	setTimeout(function() {
		if (thisURL.indexOf("series/detail") >= 0) {

			//-----SEASON SEARCHES------
			$("div.seasonSection>h1").each(function (){
				tSearchString = '';
				tSearchStringPlus = '';
				tSeason = '';

				//format Season
				tSeason = $(this).text().trim();
				tSeason = tSeason.replace('Season ', '');
				tSeason = tSeason.replace('Specials', '00');
				if (tSeason.match(/[0-9]{2}/)) {
					tSeason = tSeason.replace(/([0-9]{2})/, '$1');
				} else if (tSeason.match(/[0-9]{1}/)) {
					tSeason = tSeason.replace(/([0-9]{1})/, '0$1');
				}

				//final cleanup
				tSearchString = tShow + ' s' + tSeason;
				tSearchString = tSearchString.replace(/  /g, ' ');
				tSearchString = tSearchString.replace(/  /g, ' ');
				tSearchStringPlus = tSearchString.replace(/ /g, '+');


				//Usenet Link
				var DogNZB,
					NZBsDotOrg,
					NZBIndex,
					NzbFinder,
					OMGWTFNZBz;
					DogNZB = " <a style='background-color: white;' target='_blank' title='DogNZB' href='https://dognzb.cr/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/dognzb.png' /></a> ";
					NZBsDotOrg = " <a style='background-color: white;' target='_blank' title='NZBsDotOrg' href='https://nzbs.org/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsdotorg.png' /></a> ";
					NZBIndex = " <a style='background-color: white;' target='_blank' title='NZBIndex' href='http://www.nzbindex.nl/search/?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbindex.png' \/><\/a> ";
					NzbFinder = " <a style='background-color: white;' target='_blank' title='NzbFinder' href='https://www.nzbfinder.ws/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbfinder.png' \/><\/a> ";
					OMGWTFNZBz = " <a style='background-color: white;' target='_blank' title='OMGWTFNZBs' href='http://omgwtfnzbs.org/browse.php?search=" + tSearchStringPlus + "&amp;cat=default&amp;sort=1&amp;type=1'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/omg.png' /></a> ";
				
				//newznab public
				var OZNzb,
					NewzB,
					NzbSu;
					OZNzb = " <a style='background-color: white;' target='_blank' title='OZNzb' href='https://www.oznzb.com/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/oznzb.png' \/><\/a> ";
					NewzB = " <a style='background-color: white;' target='_blank' title='NewzB' href='https://newzb.net/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newzb.png' \/><\/a> ";
					NzbSu = " <a style='background-color: white;' target='_blank' title='NzbSu' href='https://nzb.su/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsu.png' \/><\/a> ";

				//Bit Torrent Links
				var BTDigg,
					NewTorrents,
					KickAssTorrents,
					ThePirateBay,
					l337x,
					h33t,
					Fenopy,
					TorrentzEu;
					BTDigg = " <a style='background-color: white;' target='_blank' title='BTDigg' href='https://btdigg.org/search?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/btdigg.png' /></a> ";
					NewTorrents = " <a style='background-color: white;' target='_blank' title='NewTorrents' href='http://www.newtorrents.info/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newtorrents.png' /></a> ";
					KickAssTorrents = " <a style='background-color: white;' target='_blank' title='KickAssTorrents' href='http://kickass.to/usearch/" + tSearchString + "/'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/kickasstorrents.png' /></a> ";		
					ThePirateBay = " <a style='background-color: white;' target='_blank' title='ThePirateBay' href='http://thepiratebay.se/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/thepiratebay.png' /></a> ";
					l337x = " <a style='background-color: white;' target='_blank' title='1337x' href='http://1337x.org/search/" + tSearchStringPlus + "/0/'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/1337x.png' /></a> ";
					h33t = " <a style='background-color: white;' target='_blank' title='h33t' href='http://h33t.com/search/" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/h33t.png' /></a> ";
					Fenopy = " <a style='background-color: white;' target='_blank' title='Fenopy' href='http://fenopy.se/?keyword=" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/fenopy.png' /></a> ";
					TorrentzEu = " <a style='background-color: white;' target='_blank' title='TorrentzEu' href='http://torrentz.eu/search?f=" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/torrentzeu.png' /></a> ";
				
				//File Lockers
				var FilesTube;
					FilesTube = " <a style='background-color: white;' target='_blank' title='FilesTube' href='http://www.filestube.com/search.html?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/filestube.png' /></a> ";
				
				var ShowSearchLinks = '';
					if($("input#chk_NZBsDotOrg").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBsDotOrg;
					if($("input#chk_OZNzb").val() !== "true") ShowSearchLinks = ShowSearchLinks + OZNzb;
					if($("input#chk_DogNZB").val() !== "true") ShowSearchLinks = ShowSearchLinks + DogNZB;
					if($("input#chk_NZBIndex").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBIndex;
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

				$(this).append(' <img alt="'+ tSearchString +'" id="LowVoltageToggle" width="32px" height="32px" border="0" align="absmiddle" style="cursor: pointer; margin-top: 3px; vertical-align: text-top;" src="' + iconsPath + '/lowvoltage.png" /><br><div id="Xtender" style="display: none;">' + ShowSearchLinks + '</div>');
			});

			//-----EPISODE SEARCHES------
			$("table.seriesTable > tbody > tr.data-row").each(function () {
				tSearchString = '';
				tSearchStringPlus = '';
				tSearchStringX = '';
				tSearchStringXPlus = '';

				tEpisode = $(this).children("td:first").text();
				tSeason = $(this).parents("div.seasonSection").attr('id');
				tSeason = tSeason.replace('SeasonSection_', '');
				
				//find/format Season
				if (tSeason.match(/[0-9]{2}/)) {
					tSeason = tSeason.replace(/([0-9]{2})/, '$1');
				} else if (tSeason.match(/[0-9]{1}/)) {
					tSeason = tSeason.replace(/([0-9]{1})/, '0$1');
				}
				tSeason = tSeason.replace('Specials', '00');
				
				//find/format Episode
				if (tEpisode.match(/[0-9]{2}/)) {
					tEpisode = tEpisode.replace(/([0-9]{2})/, '$1');
				} else if (tEpisode.match(/[0-9]{1}/)) {
					tEpisode = tEpisode.replace(/([0-9]{1})/, '0$1');
				}
				
				tSearchString = tSeason + 'x' +  tEpisode;
				tSearchStringX = tSearchString;
				tSearchStringX = tShow + tSearchStringX;
				tSearchStringX = tSearchStringX.replace('01x', '1x');
				tSearchStringX = tSearchStringX.replace('02x', '2x');
				tSearchStringX = tSearchStringX.replace('03x', '3x');
				tSearchStringX = tSearchStringX.replace('04x', '4x');
				tSearchStringX = tSearchStringX.replace('05x', '5x');
				tSearchStringX = tSearchStringX.replace('06x', '6x');
				tSearchStringX = tSearchStringX.replace('07x', '7x');
				tSearchStringX = tSearchStringX.replace('08x', '8x');
				tSearchStringX = tSearchStringX.replace('09x', '9x');
				
				//cleanup Search String From 00x00 --> S00E00
				tSearchString = tSearchString.replace(/([0-9]{2})x([0-9]{2})/, 's$1e$2');
				tSearchString = tShow + ' ' + tSearchString;
				
				//final cleanup
				tSearchString = tSearchString.replace(/  /g, ' ');
				tSearchString = tSearchString.replace(/  /g, ' ');
				tSearchStringPlus = tSearchString.replace(/ /g, '+');
				tSearchStringX = tSearchStringX.replace(/  /g, ' ');
				tSearchStringX = tSearchStringX.replace(/  /g, ' ');
				tSearchStringXPlus = tSearchStringX.replace(/ /g, '+');
				
				//Usenet Link
				var DogNZB,
					NZBsDotOrg,
					NZBIndex,
					NzbFinder,
					OMGWTFNZBz;
					DogNZB = " <a target='_blank' title='DogNZB' href='https://dognzb.cr/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/dognzb.png' /></a> ";
					NZBsDotOrg = " <a target='_blank' title='NZBsDotOrg' href='https://nzbs.org/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsdotorg.png' /></a> ";
					NZBIndex = " <a target='_blank' title='NZBIndex' href='http://www.nzbindex.nl/search/?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbindex.png' \/><\/a> ";
					NzbFinder = " <a target='_blank' title='NzbFinder' href='https://www.nzbfinder.ws/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbfinder.png' \/><\/a> ";
					OMGWTFNZBz = " <a target='_blank' title='OMGWTFNZBs' href='http://omgwtfnzbs.org/browse.php?search=" + tSearchStringPlus + "&amp;cat=default&amp;sort=1&amp;type=1'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/omg.png' width='16' height='16' /></a> ";
				
				//newznab public
				var OZNzb,
					NewzB,
					NzbSu;
					OZNzb = " <a target='_blank' title='OZNzb' href='https://www.oznzb.com/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/oznzb.png' \/><\/a> ";
					NewzB = " <a target='_blank' title='NewzB' href='https://newzb.net/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newzb.png' \/><\/a> ";
					NzbSu = " <a target='_blank' title='NzbSu' href='https://nzb.su/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/nzbsu.png' \/><\/a> ";

				//Bit Torrent Links
				var BTDigg,
					NewTorrents,
					KickAssTorrents,
					ThePirateBay,
					l337x,
					h33t,
					Fenopy,
					TorrentzEu;
					BTDigg = " <a target='_blank' title='BTDigg' href='https://btdigg.org/search?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/btdigg.png' /></a> ";
					NewTorrents = " <a target='_blank' title='NewTorrents' href='http://www.newtorrents.info/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/newtorrents.png' /></a> ";
					KickAssTorrents = " <a target='_blank' title='KickAssTorrents' href='http://kickass.to/usearch/" + tSearchString + "/'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/kickasstorrents.png' /></a> ";		
					ThePirateBay = " <a target='_blank' title='ThePirateBay' href='http://thepiratebay.se/search/" + tSearchString + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/thepiratebay.png' /></a> ";
					l337x = " <a target='_blank' title='1337x' href='http://1337x.org/search/" + tSearchStringPlus + "/0/'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/1337x.png' /></a> ";
					h33t = " <a target='_blank' title='h33t' href='http://h33t.com/search/" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/h33t.png' /></a> ";
					Fenopy = " <a target='_blank' title='h33t' href='http://fenopy.se/?keyword=" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/fenopy.png' /></a> ";
					TorrentzEu = " <a target='_blank' title='TorrentzEu' href='http://torrentz.eu/search?f=" + tSearchStringPlus + "'> <img height='16px' width='16px' border='0' align='absmiddle' src='" + iconsPath + "/torrentzeu.png' /></a> ";
				
				//File Lockers
				var FilesTube;
					FilesTube = " <a target='_blank' title='FilesTube' href='http://www.filestube.com/search.html?q=" + tSearchStringPlus + "'> <img width='16px' height='16px' border='0' align='absmiddle' src='" + iconsPath + "/filestube.png' /></a> ";

				var ShowSearchLinks = '';
					if($("input#chk_NZBsDotOrg").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBsDotOrg;
					if($("input#chk_OZNzb").val() !== "true") ShowSearchLinks = ShowSearchLinks + OZNzb;
					if($("input#chk_DogNZB").val() !== "true") ShowSearchLinks = ShowSearchLinks + DogNZB;
					if($("input#chk_NZBIndex").val() !== "true") ShowSearchLinks = ShowSearchLinks + NZBIndex;
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

				//add new html content to page
				$(this).children("td:first").next().attr('nowrap', 'nowrap');
				$(this).children("td:first").next().attr("align", "left");
				$(this).children("td:first").next().prepend(' <img id="LowVoltageToggle" width="24px" height="24px" border="0" align="absmiddle" style="cursor:pointer;" src="' + iconsPath + '/lowvoltage.png" />');
				$(this).children("td:first").next().append('<br><div id="Xtender" style="display: none;">' + ShowSearchLinks + '</div>');
			});

			//init episode lowvoltage toggle
			$("img#LowVoltageToggle").click(function () {
				$(this).next().next().toggle('slow');
			});
		};
	}, 100);
});