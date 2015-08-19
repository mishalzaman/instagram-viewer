igViewer = new function () {
    var self = this,
        clientId = '5f1ea31bdbfc4fdb9a671c1748c66826',
        accessToken = '844434080.1677ed0.9d4e7502789544cca50a9c95d69e3472';

    this.init = function() {
        console.log( 'igViewer loaded ');
    };

    // Retrieve a list of media Ids by latitude / longitude
    this.getBYLatLong = function( lat, lng ) {

        console.log(lat + ' ' + lng);
        
        $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&distance=5000",
                data: {
                    access_token : accessToken
                },
                success: function( response ) {
                    console.log('received media Ids');
                    console.log(response);
                    // self.generateMedia( response );
                }
            }
        );      
    };

    // Loop through each media id and get the most recent images
    this.generateMedia = function( mediaId ) {

        if( ! $.isEmptyObject( mediaId ) ) {
            $.each( mediaId.data, function( key, value ){               
                if( value.id ) {
                    $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "http://api.instagram.com/v1/locations/" + value.id + "/media/recent",
                            data: {
                                client_id : clientId
                            },
                            success: function( response ) {
                                console.log(response);
                                self.collectMedia( response );
                            }
                        }
                    );  
                }
            });
        } 
    };

    this.collectMedia = function( media ) {
        var images = [];

        $.each( media.data, function( key, value ){
            // console.log(value.images.standard_resolution.url);
            images.push(value.images.standard_resolution.url);
        });

        images = self.shuffle( images );
        console.log(images);

        self.displayImages( images );
    };

    this.shuffle = function( images ) {
        for(var j, x, i = images.length; i; j = Math.floor(Math.random() * i), x = images[--i], images[i] = images[j], images[j] = x);
        return images;
    };

    this.displayImages = function( images ) {
        if( images.length ) {
            $.each(images, function( key, value ){
                $('#images').append('<img src="' + value + '"/>');
            });
        }

        $('#images').show();
    };
};