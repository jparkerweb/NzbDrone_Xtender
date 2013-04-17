function saveOptions() {
	var chk_DogNZB = $("input#chkDogNZB").is(':checked');
	var chk_NZBsDotOrg = $("input#chkNZBsDotOrg").is(':checked');
	var chk_nzb4u = $("input#chknzb4u").is(':checked');
	var chk_NZBsRus = $("input#chkNZBsRus").is(':checked');
	var chk_NZBIndex = $("input#chkNZBIndex").is(':checked');
	var chk_NzbFinder = $("input#chkNzbFinder").is(':checked');
	var chk_OMGWTFNZBz = $("input#chkOMGWTFNZBz").is(':checked');
	var chk_NzbX = $("input#chkNzbX").is(':checked');
	var chk_NZBFactor = $("input#chkNZBFactor").is(':checked');
	var chk_NewzB = $("input#chkNewzB").is(':checked');
	var chk_NZBMatrixEU = $("input#chkNZBMatrixEU").is(':checked');
	var chk_NzbSu = $("input#chkNzbSu").is(':checked');
	var chk_FindNzbsInfo = $("input#chkFindNzbsInfo").is(':checked');
	var chk_BTDigg = $("input#chkBTDigg").is(':checked');
	var chk_NewTorrents = $("input#chkNewTorrents").is(':checked');
	var chk_KickAssTorrents = $("input#chkKickAssTorrents").is(':checked');
	var chk_ThePirateBay = $("input#chkThePirateBay").is(':checked');
	var chk_l337x = $("input#chkl337x").is(':checked');
	var chk_h33t = $("input#chkh33t").is(':checked');
	var chk_TorrentzEu = $("input#chkTorrentzEu").is(':checked');
	var chk_FilesTube = $("input#chkFilesTube").is(':checked');
	var chk_MegaNzbX = $("input#chkMegaNzbX").is(':checked');
	var chk_OZNzb = $("input#chkOZNzb").is(':checked');

    chrome.storage.sync.set({
        prefs: {
            chk_DogNZB: chk_DogNZB,
			chk_NZBsDotOrg: chk_NZBsDotOrg,
			chk_nzb4u: chk_nzb4u,
			chk_NZBsRus: chk_NZBsRus,
			chk_NZBIndex: chk_NZBIndex,
			chk_NzbFinder: chk_NzbFinder,
			chk_OMGWTFNZBz: chk_OMGWTFNZBz,
			chk_NzbX: chk_NzbX,
			chk_NZBFactor: chk_NZBFactor,
			chk_NewzB: chk_NewzB,
			chk_NZBMatrixEU: chk_NZBMatrixEU,
			chk_NzbSu: chk_NzbSu,
			chk_FindNzbsInfo: chk_FindNzbsInfo,
			chk_BTDigg: chk_BTDigg,
			chk_NewTorrents: chk_NewTorrents,
			chk_KickAssTorrents: chk_KickAssTorrents,
			chk_ThePirateBay: chk_ThePirateBay,
			chk_l337x: chk_l337x,
			chk_h33t: chk_h33t,
			chk_TorrentzEu: chk_TorrentzEu,
			chk_FilesTube: chk_FilesTube,
			chk_MegaNzbX: chk_MegaNzbX,
			chk_OZNzb: chk_OZNzb
        }
    });

	$("div#status").html("Options Saved!");
	setTimeout(function() {
		$("div#status").fadeOut('slow');
	}, 750);
	$("div#status").show();
}

function loadOptions() {
    chrome.storage.sync.get({
        prefs: {
            chk_DogNZB: false,
			chk_NZBsDotOrg: false,
			chk_nzb4u: false,
			chk_NZBsRus: false,
			chk_NZBIndex: false,
			chk_NzbFinder: false,
			chk_OMGWTFNZBz: false,
			chk_NzbX: false,
			chk_NZBFactor: false,
			chk_NewzB: false,
			chk_NZBMatrixEU: false,
			chk_NzbSu: false,
			chk_FindNzbsInfo: false,
			chk_BTDigg: false,
			chk_NewTorrents: false,
			chk_KickAssTorrents: false,
			chk_ThePirateBay: false,
			chk_l337x: false,
			chk_h33t: false,
			chk_TorrentzEu: false,
			chk_FilesTube: false,
			chk_MegaNzbX: false,
			chk_OZNzb: false
        }
    },
    
	function(storage) {
		$("input#chkDogNZB").prop('checked',storage.prefs.chk_DogNZB);
		$("input#chkNZBsDotOrg").prop('checked',storage.prefs.chk_NZBsDotOrg);
		$("input#chknzb4u").prop('checked',storage.prefs.chk_nzb4u);
		$("input#chkNZBsRus").prop('checked',storage.prefs.chk_NZBsRus);
		$("input#chkNZBIndex").prop('checked',storage.prefs.chk_NZBIndex);
		$("input#chkNzbFinder").prop('checked',storage.prefs.chk_NzbFinder);
		$("input#chkOMGWTFNZBz").prop('checked',storage.prefs.chk_OMGWTFNZBz);
		$("input#chkNzbX").prop('checked',storage.prefs.chk_NzbX);
		$("input#chkNZBFactor").prop('checked',storage.prefs.chk_NZBFactor);
		$("input#chkNewzB").prop('checked',storage.prefs.chk_NewzB);
		$("input#chkNZBMatrixEU").prop('checked',storage.prefs.chk_NZBMatrixEU);
		$("input#chkNzbSu").prop('checked',storage.prefs.chk_NzbSu);
		$("input#chkFindNzbsInfo").prop('checked',storage.prefs.chk_FindNzbsInfo);
		$("input#chkBTDigg").prop('checked',storage.prefs.chk_BTDigg);
		$("input#chkNewTorrents").prop('checked',storage.prefs.chk_NewTorrents);
		$("input#chkKickAssTorrents").prop('checked',storage.prefs.chk_KickAssTorrents);
		$("input#chkThePirateBay").prop('checked',storage.prefs.chk_ThePirateBay);
		$("input#chkl337x").prop('checked',storage.prefs.chk_l337x);
		$("input#chkh33t").prop('checked',storage.prefs.chk_h33t);
		$("input#chkTorrentzEu").prop('checked',storage.prefs.chk_TorrentzEu);
		$("input#chkFilesTube").prop('checked',storage.prefs.chk_FilesTube);
		$("input#chkMegaNzbX").prop('checked',storage.prefs.chk_MegaNzbX);
		$("input#chkOZNzb").prop('checked',storage.prefs.chk_OZNzb);
	});
}

document.addEventListener('DOMContentLoaded', loadOptions());
document.querySelector('#save').addEventListener('click', saveOptions);