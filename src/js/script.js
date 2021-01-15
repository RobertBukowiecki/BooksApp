{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book'
    },
    wrapper: {
      bookList: '.books-list',
      filters: '.filters'
    },
    all: {
      books: '.book',
      booksImage: '.book__image'
    },
    form: {

    }
  }

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
  }
  const favoriteBooks = [];
  const filters = [];

  class BooksList {
    constructor() {
      this.initData();
      this.getElements();
      this.render();
      this.filterBooks();
      this.initActions();
      this.determineRatingBgc();
      console.log(this.filterBooks());
    }
    initData() {
      this.data = dataSource.books;
    }
    getElements() {
      this.bookList = document.querySelector(select.wrapper.bookList);
      this.formWrapper = document.querySelector(select.wrapper.filters);
    }
    render() {
      for (let book of dataSource.books) {
        const bookRating = book.rating;
        book.ratingBgc = this.determineRatingBgc(bookRating);
        book.ratingWidth = bookRating * 10;
        console.log(book.rating, book.ratingWidth, book.ratingBgc);

        const generatedHTML = templates.book(book);
        const container = this.bookList;
        const element = utils.createDOMFromHTML(generatedHTML);
        container.appendChild(element);
      }
    };
    filterBooks() {
      for (let book of dataSource.books) {
        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for (let filterName of filters) {
          if (!book.details[filterName]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          bookToBeHidden.classList.add('hidden');
        } else {
          bookToBeHidden.classList.remove('hidden');
        }
      }
    };
    initActions() {

      this.bookList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        console.log(event)

        const clickedBook = event.target.offsetParent;
        console.log(clickedBook);
        if (clickedBook.classList.contains('book__image')) {
          if (clickedBook.classList.contains('favorite')) {
            clickedBook.classList.remove('favorite');
            const bookAttribute = clickedBook.getAttribute('data-id');
            const bookIndex = favoriteBooks.indexOf(bookAttribute);
            favoriteBooks.splice(bookIndex, 1);
          }
          else {
            clickedBook.classList.add('favorite');
            const bookAttribute = clickedBook.getAttribute('data-id');
            favoriteBooks.push(bookAttribute);
            console.log(favoriteBooks);
          }
        }
      });
      this.formWrapper.addEventListener('click', function (event) {
        const clickedElement = event.target;
        console.log(filters);
        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
          if (clickedElement.checked == true) {
            filters.push(clickedElement.value);
            this.filterBooks();
          }
          else {
            const filterIndex = filters.indexOf(clickedElement.value);
            filters.splice(filterIndex, 1);
            this.filterBooks();
          }
        }
      });
    }
    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      }
      if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      }
      if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      }
      if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }
      return background;
    };
  }



  const app = new BooksList();

};
