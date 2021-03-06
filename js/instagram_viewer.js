// Mishal Zaman 
// igViewer class

igViewer = new function () {
    var self = this,
        clientId = '5f1ea31bdbfc4fdb9a671c1748c66826',
        accessToken = '844434080.1677ed0.9d4e7502789544cca50a9c95d69e3472',
        images = [];


    this.init = function() {
        console.log( 'igViewer loaded ');
    };

    // Retrieve a list of media Ids by latitude / longitude
    this.getBYLatLong = function( lat, lng ) {     

        $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&distance=5000",
                data: {
                    access_token : accessToken
                },
                success: function( response ) {
                    if( response.data.length != 0) {
                        self.generateMedia( response );
                    } else {
                        setTimeout(function(){
                            $('#search-button').fadeIn();
                        }, 2000);
                    }
                }
            }
        );      
    };

    // Loop through each media id and get the most recent images
    this.generateMedia = function( mediaId ) {
        var maxCounter = mediaId.data.length;
        var counter = 0;

        // reset images array
        images = [];

        if( ! $.isEmptyObject( mediaId ) ) {
            $.each( mediaId.data, function( key, value ){   
                if( value.id ) {
                    $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "https://api.instagram.com/v1/locations/" + value.id + "/media/recent?",
                            data: {
                                access_token : accessToken
                            },
                            success: function( response ) {
                                if( response.data.length !== 0 ) {
                                    self.collectMedia( response.data );
                                }
                            },
                            complete: function() {
                                counter++;

                                if( counter == maxCounter ) {
                                    self.display();
                                }

                                console.log(images);
                            }
                        }
                    );  
                }
            });
        } 
    };

    this.collectMedia = function( media ) {
        $.each(media, function( key, value ){
            images.push(value);
        });
    };

    this.display = function() {
        $('#images').empty();

        var count = images.length - 1;

        $.each( images, function( key, value ){
            console.log(key);
            $image = $('<div class="image"><img/><p></p></div>');
            $image.find('img').attr('src', value.images.thumbnail.url);
            $image.find('p').append(
                value.user.username + '<br>' +
                value.user.full_name + '<br>' +
                value.location.name + '<br>' +
                value.likes.count + '<br>' 
            );
            $('#images').append( $image );

            if( key == count ) {
                $('#image-viewer').show();
                $('#search-button').hide();
            }
        });
    };
};
