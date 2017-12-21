import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import Book from './Books/Book';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    books: [],
  }

  changeShelf(bookToChange, newShelf) {
    this.props.changeShelf(bookToChange, newShelf);
  }

  handleSubmit(e) {
    e.preventDefault();
    const serializedForm = serializeForm(e.target, { hash: true });
    const books = [];
    BooksAPI.search(serializedForm.searchQuery).then((rawBooks) => {
      rawBooks.map((rawBook) => {
        const rawBookCopy = rawBook;
        if (this.props.idToShelfMap.has(rawBookCopy.id)) {
          rawBookCopy.shelf = this.props.idToShelfMap.get(rawBookCopy.id);
        }
        books.push(rawBookCopy);
      });
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="search-books">
        <form
          onSubmit={this.handleSubmit}
          className="search-books"
        >
          <div className="search-books-bar">
            <Link
              href="/"
              to="/"
              className="close-search"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input type="text" name="searchQuery" placeholder="Search by title or author" />
            </div>
          </div>
        </form>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  {...book}
                  sections={this.props.sections}
                  sectionNames={this.props.sectionNames}
                  changeShelf={newShelf => this.changeShelf(book, newShelf)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  idToShelfMap: PropTypes.instanceOf(Map).isRequired,
  sections: PropTypes.arrayOf(String).isRequired,
  sectionNames: PropTypes.instanceOf(Object).isRequired,
};

export default SearchBar;
