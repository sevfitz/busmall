'use strict';

console.log(Chart);

// TODO: use the description

var allProds = [];
var selections = [];

function Prod ( id, path, desc ) {
    this.id = id;
    this.path = '<img id="' + id + '" src="' + path + '">';
    this.desc = desc;
    this.clicks = 0;
    this.shows = 0;

    allProds.push( this );
}

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
    var dragon = new Prod( 'dragon', 'img/dragon-ed.jpg', 'A dragon' );
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
    choice1: document.getElementsByClassName( 'choice' )[0],
    choice2: document.getElementsByClassName( 'choice' )[1],
    choice3: document.getElementsByClassName( 'choice' )[2],

    imageWrapper: document.getElementsByClassName( 'image-wrapper' )[0],
    clicks: 0,

    randomIndex: function ( arr ) {
        return Math.floor(Math.random() * arr.length );
    },

    // A method of the counter object that creates an array of the images clicked and adds the image clicked if it isn't already in the array
    getIndices: function( arr ) {
        console.log('The three images shown in the last impression were: ' + selections); 
        var lastThree = [ selections[0] , selections[1] , selections[2] ];

        selections = [];
        while ( selections.length < 3 ) {
            var imageChoice = this.randomIndex( arr );

            if ( imageChoice === lastThree[0] || imageChoice === lastThree[1] || imageChoice === lastThree[2] ) {
                imageChoice = this.randomIndex( arr );
            } else if ( selections.indexOf( imageChoice ) === -1 ) {
                selections.push( imageChoice );
                allProds[imageChoice].shows += 1;              
            }
        }
        
        // console.log('The three images shown in this impression were: ' + selections);               
        return selections;        
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

        // this.choice1.id = img1.id;
        // this.choice2.id = img2.id;
        // this.choice3.id = img3.id;
        
        this.choice1.innerHTML = img1.path;
        this.choice2.innerHTML = img2.path;
        this.choice3.innerHTML = img3.path;

        this.choice1.desc = img1.desc;
        this.choice2.desc = img2.desc;
        this.choice3.desc = img3.desc;
    },
    
    clickCount: function ( targetId ) {
        this.clicks +=1;                                // Count the number of total clicks that have occurred
        
        for ( var i = 0; i < allProds.length; i++ ) {
            var product = allProds[i];

            if ( product.id === targetId ) {
                product.clicks += 1 ;
                console.log(targetId, 'has received', product.clicks, 'clicks so far');
            }
            // percentClicked = 
        }


        if ( this.clicks > 25 ) {
            this.showResults();
        }
    },

    showResults: function () {
        this.imageWrapper.removeEventListener( 'click', clickHandler );
        console.log(allProds[0].shows);
        console.table( allProds );

        var sectionEl = document.getElementsByTagName('section')[0];
            sectionEl.innerHTML = '';

        for ( var j = 0; j < allProds.length; j ++ ) {
            var text = 'Number of times ' + allProds[j].id + ' was shown: ' + allProds[j].clicks + '. Percentage of times it was clicked when shown: ' + (100 * ( allProds[j].clicks / allProds[j].shows)) + '%.';
            console.log(text);
            
            var listEl = document.createElement('ul');
            var liEl = document.createElement('li');
            liEl.innerHTML = text;

            listEl.appendChild(liEl);
            sectionEl.appendChild(listEl);


            // sectionEl.appendChild('ul');
            // var ulEl = document.getElementsByTagName('ul');
            // ulEl.appendChild('li');
            // var liEl = document.getElementsByTagName('li');
            // liEl.innerText(text);

            // // Helper function to create cells by row
            // function render ( cellType, content, rowToAddChildTo ) {
            //     var cell = document.createElement( cellType );
            //     cell.innerText = content;
            //     rowToAddChildTo.appendChild( cell );

        }

    }
};

counter.imageWrapper.addEventListener( 'click', clickHandler );

function clickHandler() {
    if ( event.target.id ) {
        counter.clickCount( event.target.id );
        counter.displayOptions();
    }
}


makeProds();
counter.displayOptions();

