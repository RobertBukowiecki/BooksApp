const booksList = document.querySelector('.books-list');

function render(){
  for(let book in dataSource.books){
    const generatedHTML = '#template-book'(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    console.log(generatedDOM)
  }
}
