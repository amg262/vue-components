//  The 'Model' is responsible for managing the data of the application.
//  You can define your models in the 'data' section of each Vue component
//  or define them separately if they might be used by multiple components.

//  Models are usually prototypes (similar to classes if you are familiar with those)

function LibraryItem() {

    // list of all possible statuses (enum)
    const STATUSES = {
        CHECKED_IN: 'IN',
        CHECKED_OUT: 'OUT'
    }

    // keeps track of checked in or out
    // this._status = 'in';
    this._status = STATUSES.CHECKED_IN;

    // methods
    this.checkIn = function () {
        this._status = STATUSES.CHECKED_IN;
    }

    // too many literals with "in" and "out" because a typo somewehre else could error
    // IDE cant help you figure that out if you dont know status
    this.checkOut = function () {
        this._status = STATUSES.CHECKED_OUT;
    }

    this.isAvailable = function () {
        return this._status === STATUSES.CHECKED_IN; //  === means value and data type is the same - this javascript equals
        // exact operator instread of == which checks value is same
        // 0 == '0' is true | 0
        // NaN == NaN is false
        //  6/0 ==NaN is false
    }
}

// Book is out function
function Book(title, pages) {

    // call the parent (LibraryItem) constructor function
    //  shares the Book's "this" with the LibraryItem function/constructor
    LibraryItem.call(this);

    this.title = title || '';
    this.title = pages || 0; // will allow anything except null/undefined - coalesced operator
}

// Book is out function
// Prototype for book
// sets the parent/prototype
Book.prototype = Object.create(LibraryItem.prototype);
//  reset the constructor
Book.prototype.constructor = Book;

//  or ES6 syntactic sugar (these are not really classes in the traditional sense)

//  the extends is doing the same as above 2 lines
class Movie extends LibraryItem {
    title;
    runtime;

    constructor(title, runtime) {
        //  call the parent constructor
        //  super calls the Library.call(this)
        super();
        this.title = title ?? ''; //  will allow anything except null / undefined
        this.runtime = runtime || 90;
    }
}

// Want to share ability to checkIn and checkOut between books and movies - use case
let tyler = {name: 'Tyler', age: 12};
LibraryItem.call(tyler);
//
let li = new LibraryItem();
let book = new Book('Learn Vue', 234);
let movie = new Movie('Italian Job', 123);


// modify all objects taht have this prototype anywehre in its chain
LibraryItem.prototype.price = 23;


// This would allows us to add functionality to jQuery without modifying jQuery
// or having to create a new library that extends jQuery
// $.prototype.peekaboo = function () {
//     this.hide();
//     this.show();
// }


console.log(li, book, movie, tyler);
//  console.log(li)
//  console.log(book)
//  console.log(movie)
