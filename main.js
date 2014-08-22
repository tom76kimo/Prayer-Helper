var gmail, $cover, $banner;


function refresh(f) {
  if(/in/.test(document.readyState)) {
    setTimeout('refresh(' + f + ')', 700);
  } else {
    f();
  }
}

var addEntry = function (mailEntry) {
	var $content = $('.prayer-content', $banner);
	$('<div style="font-weight: bold;"><h1>' + mailEntry.from + '</h1></div>').appendTo($content);
	$('<span>'+mailEntry.content_html+'</span>').appendTo($content);
	$('<hr>').appendTo($content);
};

var readEvent = function (e) {
	var id,
	    data = gmail.dom.inboxes(),
	    prayerLetters = [];

	var loadData = function () {
		console.log(gmail.get.visible_emails());
		return;
		for (var i = 0; i < data.length; ++i) {
			if (/代禱信/.test(data[i].title)) {
				prayerLetters.push(data[i].id);
			}
			//gmail.get.email_data(data[i].id);
		}
		console.log(data)

		for (i=0; i<prayerLetters.length; ++i) {
			var mail = gmail.get.email_data(prayerLetters[i]);
			var mailEntry = mail.threads[prayerLetters[i]];
			//console.log(gmail.get.email_data(prayerLetters[i]));
			addEntry(mailEntry);
			console.log(mailEntry);
		}		
	};

	$cover.show('fast', function() {
		//$banner.empty();
		loadData();
	});


	
	//console.log(prayerLetters);
};


var main = function(){
	$(function () {
  		gmail = new Gmail();
  		
  		setTimeout(function () {
  			var readButton = $('<div class="G-Ni J-J5-Ji"><div class="T-I J-J5-Ji ar7 nf T-I-ax7 L3" style="background: #449D44; color: #fff;" role="button" tabindex="0" aria-haspopup="false" aria-expanded="false" style="-webkit-user-select: none;"><span class="Ykrj7b">閱讀代禱信</span></div></div>').appendTo('div[gh=mtb] > div > div');
  			readButton.click(readEvent);

  			$cover = $('<div class="prayer-cover">').appendTo('body');
  			$cover.click(function () {
  				//$(this).toggle('fast');
  			});

  			$banner = $('<div class="prayer-banner"><div class="prayer-content"></div><div class="prayer-footer"></div></div>').appendTo($cover);
  			var $closeButton = $('<button class="prayer-close-button">Close</button>').appendTo($('.prayer-footer', $banner));
  			$closeButton.click(function(event) {
  				$cover.hide();
  			});
  			$banner.click(function (e) {
  				e.preventDefault();
  			});
  		}, 500);
  				
	});
}


refresh(main);