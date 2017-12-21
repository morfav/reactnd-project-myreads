import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import './App.css';
import ListShelves from './ListShelves';
import SearchBar from './SearchBar';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  state = {
    books: [],
    idToShelfMap: new Map(),
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const { idToShelfMap } = this.state;
      books.map(book => idToShelfMap.set(book.id, book.shelf));
      this.setState({
        books,
        idToShelfMap,
      });
    });
  }

  changeShelf(bookToChange, newShelf) {
    const bookCopy = bookToChange;
    bookCopy.shelf = newShelf;
    const { idToShelfMap } = this.state;
    idToShelfMap.set(bookCopy.id, newShelf);
    this.setState({
      books: [...this.state.books.filter(book => book.id !== bookCopy.id), bookCopy],
      idToShelfMap,
    });
  }

  render() {
    const sectionNames = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read',
    };
    const sections = ['currentlyReading', 'wantToRead', 'read'];
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <div>
              <SearchBar
                sections={sections}
                sectionNames={sectionNames}
                idToShelfMap={this.state.idToShelfMap}
                changeShelf={(bookToChange, newShelf) => this.changeShelf(bookToChange, newShelf)}
              />
            </div>
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>
                    {this.props.appName}
                  </h1>
                </div>
                <ListShelves
                  sections={sections}
                  sectionNames={sectionNames}
                  books={this.state.books}
                  changeShelf={(bookToChange, newShelf) => this.changeShelf(bookToChange, newShelf)}
                />
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  href="/search"
                >
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

BooksApp.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default BooksApp;
