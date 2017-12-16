import React, { Component } from 'react';

// import * as BooksAPI from './BooksAPI'
import './App.css';
import ListShelves from './ListShelves';
import SearchBar from './SearchBar';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        <SearchBar />
        <div className="list-books">
          <div className="list-books-title">
            <h1>
              {this.props.appName}
            </h1>
          </div>
          <ListShelves />
        </div>
      </div>
    );
  }
}

export default BooksApp;
