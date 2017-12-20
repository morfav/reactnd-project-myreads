import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

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
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const idToShelfMap = new Map();
      books.map(book => idToShelfMap.set(book.id, book.shelf));
      this.setState({
        books,
        idToShelfMap,
      });
    });
  }

  changeShelf(id, newShelf) {
    const bookToUpdate = this.state.books.find(book => book.id === id);
    bookToUpdate.shelf = newShelf;
    const { idToShelfMap } = this.state;
    idToShelfMap.set(id, newShelf);
    this.setState({
      books: [...this.state.books.filter(book => book.id !== id), bookToUpdate],
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
                  changeShelf={(id, newShelf) => this.changeShelf(id, newShelf)}
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

export default BooksApp;
