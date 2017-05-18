'use strict';

// TODO: use the description, click on figures, use img.source for links

var allProds = [];
var imagesToDisplay = [];
// var allUsers = [];

function Prod ( id, path, desc ) {
    this.id = id;
    this.path = '<img id="' + id + '" src="' + path + '"><figcaption id="' + id + '">' + desc + '</figcaption>';
    this.desc = desc;
    this.votes = 0;
    this.shows = 0;

    allProds.push( this );
}

// function User ( userVotes ) {
//     this.userVotes = userVotes;
    
//     allUsers.push( this );

    

// }

function makeProds () {
    var bag = new Prod( 'bag', 'img/bag-ed.jpg', 'A Bag' );
    var banana = new Prod( 'banana', 'img/banana-ed.jpg', 'A Banana Slicer' );
    var bathroom = new Prod( 'bathroom', 'img/bathroom-ed.jpg', 'A bathroom' );
    var boots = new Prod( 'boots', 'img/boots-ed.jpg', 'A boots' );
    var breakfast = new Prod( 'breakfast', 'img/breakfast-ed.jpg', 'A breakfast' );
    var bubblegum = new Prod( 'bubblegum', 'img/bubblegum-ed.jpg', 'A bubblegum' );
    var chair = new Prod( 'chair', 'img/chair-ed.jpg', 'A chair' );
    var cthulhu = new Prod( 'cthulhu', 'img/cthulhu-ed.jpg', 'A cthulhu' );
    var dogDuck = new Prod( 'dog-duck', 'img/dog-duck-ed.jpg', 'A Dog Duck' );
    var dragon = new Prod( 'dragon', 'img/dragon-ed.png', 'A dragon' );
    var pen = new Prod( 'pen', 'img/pen-ed.jpg', 'A pen' );
    var petSweep = new Prod( 'pet-sweep', 'img/pet-sweep-ed.jpg', 'A pet sweep' );
    var scissors = new Prod( 'scissors', 'img/scissors-ed.jpg', 'A scissors' );
    var shark = new Prod( 'shark', 'img/shark-ed.jpg', 'A shark' );
    var sweep = new Prod( 'sweep', 'img/sweep-ed.png', 'A sweep' );
    var tauntaun = new Prod( 'tauntaun', 'img/tauntaun-ed.jpg', 'A tauntaun' );
    var unicorn = new Prod( 'unicorn', 'img/unicorn-ed.jpg', 'A unicorn' );
    var usb = new Prod( 'usb', 'img/usb-ed.gif', 'A usb' );
    var waterCan = new Prod( 'water-can', 'img/water-can-ed.jpg', 'A water can' );
    var wineGlass = new Prod( 'wine-glass', 'img/wine-glass-ed.jpg', 'A wine glass' );
}

var counter = {
    image1El: document.getElementsByClassName( 'image' )[0],
    image2El: document.getElementsByClassName( 'image' )[1],
    image3El: document.getElementsByClassName( 'image' )[2],

    sectionEl: document.getElementsByTagName('section')[1],
    bannerEl: document.getElementsByClassName('restartBanner')[0],

    imageWrapperEl: document.getElementsByClassName( 'image-wrapper' )[0],
	restartVotingButtonBanner: document.getElementsByTagName( 'section' )[0],
    resetTotalsButton: document.getElementsByTagName( 'button' )[1],
    votes: 0,


    getRandomImage: function ( arr ) {
        return Math.floor(Math.random() * arr.length );
    },

    // A method of the counter object that creates an array of the images 
    // clicked and adds the image clicked if it isn't already in the array
    getIndices: function( arr ) {
        var lastThreeImages = imagesToDisplay;

        imagesToDisplay = [];
        while ( imagesToDisplay.length < 3 ) {
            var imageChoice = this.getRandomImage( arr );

            if ( lastThreeImages.indexOf( imageChoice ) !== -1 ) {
                imageChoice = this.getRandomImage( arr );
            } else if ( imagesToDisplay.indexOf( imageChoice ) === -1 ) {
	        imagesToDisplay.push( imageChoice );
                allProds[imageChoice].shows += 1;              
            }
        }
        return imagesToDisplay;        
    },

    // Get three random choices and display them on the document
    displayOptions: function () {
        var randomChoice = this.getIndices( allProds );
        
        var display1 = randomChoice[0];
        var display2 = randomChoice[1];
        var display3 = randomChoice[2];

        var img1 = allProds[display1];
        var img2 = allProds[display2];
        var img3 = allProds[display3];

        // this.image1El.id = img1.id;
        // this.image2El.id = img2.id;
        // this.image3El.id = img3.id;
        
        this.image1El.innerHTML = img1.path;
        this.image2El.innerHTML = img2.path;
        this.image3El.innerHTML = img3.path;

        this.image1El.desc = img1.desc;
        this.image2El.desc = img2.desc;
        this.image3El.desc = img3.desc;
    },

    clickCount: function ( targetId ) {
        this.votes +=1;                         // Count the number of total votes that have occurred
        
        for ( var i = 0; i < allProds.length; i++ ) {
            var product = allProds[i];

            if ( product.id === targetId ) {
                product.votes += 1 ;
            }
        }

        if ( this.votes > 3 ) {
            this.showResults();
        }
    },

    showResults: function () {
        // Replace the image section with a banner and button when voting is done
        counter.sectionEl.style = 'display: none';
        counter.bannerEl.style = 'display: block';

        // Make arrays to hold all the data, for use in chart
        var prodLabels = [];                     // will push imgLabels into this
        var voteTotals = [];                     // will push raw votes into this

        for ( var j = 0; j < allProds.length; j ++ ) {
            var imgLabel = allProds[j].id;
            prodLabels.push( imgLabel );
            var imgVotes = allProds[j].votes;
            voteTotals.push( imgVotes );
            
            // user.userVotes.push( imgVotes );
            // var percClickd = (100 * ( allProds[j].votes / allProds[j].shows));

        }

        var savedTotals = JSON.parse( localStorage.getItem( 'voteTotals' ) ) || [];
        if ( savedTotals.length > 0 ) {
            for ( var i = 0; i < voteTotals.length; i ++ ) {
            voteTotals[i] += savedTotals[i];
            }
        }

        // Add the data to local storage
        localStorage.setItem( 'voteTotals', JSON.stringify( voteTotals ) );

        // Make a chart of the results

        var canvasEl = document.getElementsByTagName( 'canvas' );
        
        this.votingResults = new Chart ( canvasEl, {
            type: 'bar',
            data: {
                labels: prodLabels,    
                datasets: [
                    {
                        label: 'Number of Votes',
                        data: voteTotals
                    }
                    
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }           
};              

counter.imageWrapperEl.addEventListener( 'click', clickHandler );

function clickHandler() {
    if ( event.target.id ) {
        counter.clickCount( event.target.id );
        counter.displayOptions();
    }
}

counter.restartVotingButtonBanner.addEventListener( 'click', restartVotingHandler );

function restartVotingHandler() {        
    counter.sectionEl.style = 'display: block';
    counter.bannerEl.style = 'display: none';
    counter.votingResults.destroy();
    counter.votes = 0;
    allProds.forEach( function( product ) {
        product.votes = 0;
    });
    counter.displayOptions();
}

counter.resetTotalsButton.addEventListener( 'click', resetTotalsHandler );

function resetTotalsHandler() {
    localStorage.clear();
    restartVotingHandler();
}

makeProds();
counter.displayOptions();

