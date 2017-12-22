import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import Book from './Books/Book';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.myTimer = null;

    this.changeShelf = this.changeShelf.bind(this);
    this.fetchBooksAndUpdate = this.fetchBooksAndUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputTyped = this.inputTyped.bind(this);
  }

  state = {
    books: [],
    searchQuery: '',
  }

  getFormInput = (e) => {
    const serializedForm = serializeForm(e.target, { hash: true });
    return serializedForm.searchQuery;
  }

  fetchBooksAndUpdate() {
    const books = [];
    BooksAPI.search(this.state.searchQuery).then((rawBooks) => {
      if (Array.isArray(rawBooks)) {
        rawBooks.map((rawBook) => {
          const rawBookCopy = rawBook;
          if (this.props.idToShelfMap.has(rawBookCopy.id)) {
            rawBookCopy.shelf = this.props.idToShelfMap.get(rawBookCopy.id);
          }
          books.push(rawBookCopy);
        });
      }
      this.setState({
        books,
      });
    });
    clearTimeout(this.myTimer);
  }

  changeShelf(bookToChange, newShelf) {
    this.props.changeShelf(bookToChange, newShelf);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchBooksAndUpdate(this.getFormInput(e));
  }

  inputTyped(e) {
    this.setState({
      searchQuery: e.target.value,
    });
    clearTimeout(this.myTimer);
    this.myTimer = setTimeout(this.fetchBooksAndUpdate.bind(null), 1500);
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
              <input
                type="text"
                name="searchQuery"
                placeholder="Search by title or author"
                onChange={this.inputTyped}
              />
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
