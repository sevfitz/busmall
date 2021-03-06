'use strict';

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
    var bag = new Prod( 'bag', 'img/bag-ed.jpg', 'Star Wars Rolling Bag' );
    var banana = new Prod( 'banana', 'img/banana-ed.jpg', 'Banana Slicer' );
    var bathroom = new Prod( 'bathroom', 'img/bathroom-ed.jpg', 'Toilet Paper/iPad Holder' );
    var boots = new Prod( 'boots', 'img/boots-ed.jpg', 'Boots Missing Toes' );
    var breakfast = new Prod( 'breakfast', 'img/breakfast-ed.jpg', 'Breakfast Maker' );
    var bubblegum = new Prod( 'bubblegum', 'img/bubblegum-ed.jpg', 'Meatball Bubblegum' );
    var chair = new Prod( 'chair', 'img/chair-ed.jpg', 'Convex Chair' );
    var cthulhu = new Prod( 'cthulhu', 'img/cthulhu-ed.jpg', 'Cthulhu Toy' );
    var dogDuck = new Prod( 'dog-duck', 'img/dog-duck-ed.jpg', 'Duck-Bill Dog Muzzle' );
    var dragon = new Prod( 'dragon', 'img/dragon-ed.png', 'Dragon Meat' );
    var pen = new Prod( 'pen', 'img/pen-ed.jpg', 'Plastic Utensil Pen Caps' );
    var petSweep = new Prod( 'pet-sweep', 'img/pet-sweep-ed.jpg', 'Pet Sweep' );
    var scissors = new Prod( 'scissors', 'img/scissors-ed.jpg', 'Pizza Scissors' );
    var shark = new Prod( 'shark', 'img/shark-ed.jpg', 'Shark Sleeping Bag' );
    var sweep = new Prod( 'sweep', 'img/sweep-ed.png', 'Baby Sweep' );
    var tauntaun = new Prod( 'tauntaun', 'img/tauntaun-ed.jpg', 'Tauntaun Sleeping Bag' );
    var unicorn = new Prod( 'unicorn', 'img/unicorn-ed.jpg', 'Unicorn Meat' );
    var usb = new Prod( 'usb', 'img/usb-ed.gif', 'Green Tentacle USB' );
    var waterCan = new Prod( 'water-can', 'img/water-can-ed.jpg', 'Backwards Watering Can' );
    var wineGlass = new Prod( 'wine-glass', 'img/wine-glass-ed.jpg', 'Egg-Cup Wine Glass' );
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

    // Get three random images and display them on the document
    displayOptions: function () {
        var randomImage = this.getIndices( allProds );
        
        var display1 = randomImage[0];
        var display2 = randomImage[1];
        var display3 = randomImage[2];

        var img1 = allProds[display1];
        var img2 = allProds[display2];
        var img3 = allProds[display3];
        
        this.image1El.innerHTML = img1.path;
        this.image2El.innerHTML = img2.path;
        this.image3El.innerHTML = img3.path;
    },

    clickCount: function ( targetId ) {
        this.votes +=1;                         // Count the number of total votes that have occurred
        
        for ( var i = 0; i < allProds.length; i++ ) {
            var product = allProds[i];

            if ( product.id === targetId ) {
                product.votes += 1 ;
            }
        }

        if ( this.votes > 24 ) {
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
        var percTotals = [];                     // will push percent times clicked

        for ( var j = 0; j < allProds.length; j ++ ) {
            var imgLabel = allProds[j].id;
            prodLabels.push( imgLabel );
            var imgVotes = allProds[j].votes;
            voteTotals.push( imgVotes );

            var percClickd = (100 * ( voteTotals[j] / this.votes ));
            percTotals.push( percClickd );
        }

        var savedTotals = JSON.parse( localStorage.getItem( 'voteTotals' ) ) || [];
        var savedPercs = JSON.parse( localStorage.getItem( 'percTotals' ) ) || [];
        
        if ( savedTotals.length > 0 ) {
            for ( var i = 0; i < voteTotals.length; i ++ ) {
            voteTotals[i] += savedTotals[i];
            }
        }

        if ( savedPercs.length > 0 ) {
            for ( var k = 0; k < voteTotals.length; k ++ ) {
            percTotals[k] += savedPercs[k];
            }
        }

        // Add the data to local storage
        localStorage.setItem( 'voteTotals', JSON.stringify( voteTotals ) );
        localStorage.setItem( 'percTotals', JSON.stringify( percTotals ) );

        // Make a chart of the results

        var canvasTotalsEl = document.getElementsByClassName( 'totals-chart' );
        
        this.votingResults = new Chart ( canvasTotalsEl, {
            type: 'bar',
            data: {
                labels: prodLabels,    
                datasets: [
                    {
                        label: 'Number of Votes',
                        data: voteTotals,
                        backgroundColor: [
                            '#4c0a00', '#ff5940', '#f2beb6', '#7f2200', '#99614d', '#a65800', '#4c3213', '#ffc480', '#998773', '#f2a200', '#8c7000', '#fffbbf', '#475900', '#a3bf30', '#3de600', '#53664d', '#269926', '#86b386', '#00330e', '#3df29d', '#40fff2', '#269991', '#bffffb', '#1a5766', '#3399cc'   
                        ]
                    }
                    
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });

        // Make a Pie chart of the Percentages

        var canvasPieEl = document.getElementsByClassName( 'pie-chart' )[0];
        
        this.percResults = new Chart ( canvasPieEl, {
            type: 'pie',
            data: {
                labels: prodLabels,    
                datasets: [
                    {
                        label: '% of Times Clicked When Shown',
                        data: percTotals,
                        backgroundColor: [
                            '#4c0a00', '#ff5940', '#f2beb6', '#7f2200', '#99614d', '#a65800', '#4c3213', '#ffc480', '#998773', '#f2a200', '#8c7000', '#fffbbf', '#475900', '#a3bf30', '#3de600', '#53664d', '#269926', '#86b386', '#00330e', '#3df29d', '#40fff2', '#269991', '#bffffb', '#1a5766', '#3399cc'   
                        ]
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
    counter.percResults.destroy();
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

