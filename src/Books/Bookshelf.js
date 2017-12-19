import React, { Component } from 'react';

import Book from './Book';

class Bookshelf extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(bookId, newShelf) {
    this.props.changeShelf(bookId, newShelf);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  {...book}
                  sections={this.props.sections}
                  sectionNames={this.props.sectionNames}
                  changeShelf={newShelf => this.changeShelf(book.id, newShelf)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
