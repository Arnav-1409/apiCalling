document.getElementById('search').addEventListener('keyup', loadArtists);

// Load Artists 
function loadArtists() {
    var artists ={};
    var output ="";
    var special = "/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/";
    var art = document.getElementById('search').value;
    if (art == ""  || !special) {
        document.getElementById('search').value = "";
        artists =null;
        output = "";
        document.getElementById('artists').innerHTML = output;
        document.getElementById('artists').innerHTML = "search box empty";
    }
    else {
        // Spliting api url
        art = document.getElementById('search').value;
        var key = '?app_id="510"';
        var URL = 'https://rest.bandsintown.com/artists/'+art+key;
        var xhr;
        if(window.XMLHttpRequest){
            
         xhr = new XMLHttpRequest();
        }
        else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', URL, true);
        xhr.onload = function () {
            if (this.status == 200) {
                 artists = JSON.parse(this.responseText);
                 output = '';
                output +=
                    '<div class="artists">' +
                    '<img src="' + artists.thumb_url + '">' +
                    '<ul>' +
                    '<li>' + artists.name + '<a href="artists.facebook_page_url" class="fa fa-facebook"></a>' + '</li>' +
                    '<li>' + artists.tracker_count + ' Trackers</li>' +
                    '</ul>'
                '</div>';
                document.getElementById('artists').innerHTML = output;
                loadArtistsData();
            }
            else {
                document.getElementById('artists').innerHTML = "Data cannot be fetched";
            }
        }
        xhr.send();
    }
}

//Load Artists data
function loadArtistsData() {
    var artists_D={};
    var out=null;
    artists_D=null;
    document.getElementById('events').innerHTML = out;
    //spliting api url
    var api2 = 'https://rest.bandsintown.com/artists/';
    var art2 = document.getElementById('search').value;
    var key2 = '/events?app_id="510"';
    var URL_EVENTS = api2 + art2 + key2;
    var xhr2;
    if(window.XMLHttpRequest){
        xhr2 = new XMLHttpRequest();
       }
       else{
           xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
       }
    xhr2.open('GET', URL_EVENTS, true);
    xhr2.onload = function () {
        if (this.status == 200) {
             artists_D = JSON.parse(this.responseText);
            var out = '';
            for (var i in artists_D) {
                out +=
                    '<div class="artists_data">' +
                    '<div class="grid-item">' + artists_D[i].venue.city + ' , ' + artists_D[i].venue.region + '</div>' +
                    '<div class="grid-item">' + artists_D[i].venue.name + '</div>' +
                    '</div>';
            }
            document.getElementById('events').innerHTML = out;
        }
    }
    xhr2.send();
}