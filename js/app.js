'use strict';

var allProds = [];

function Prod ( id, path, desc ) {
    this.id = id;
    this.path = path;
    this.desc = desc;
    this.clicks = 0;
    this.timesShown = 0;

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
    var sweep = new Prod( 'sweep', 'img/sweep-ed.jpg', 'A sweep' );
    var tauntaun = new Prod( 'tauntaun', 'img/tauntaun-ed.jpg', 'A tauntaun' );
    var unicorn = new Prod( 'unicorn', 'img/unicorn-ed.jpg', 'A unicorn' );
    var usb = new Prod( 'usb', 'img/usb-ed.jpg', 'A usb' );
    var waterCan = new Prod( 'water-can', 'img/water-can-ed.jpg', 'A water can' );
    var wineGlass = new Prod( 'wine-glass', 'img/wine-glass-ed.jpg', 'A wine glass' );
}