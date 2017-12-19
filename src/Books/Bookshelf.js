import React, { Component } from 'react';

import Book from './Book';

class Bookshelf extends Component {
  // setBookshelf(id, newShelf) {
  //   this.props.setBookshelf(id, newShelf);
  // }
  
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
                  setBookshelf={newBookshelf => this.props.setBookshelf(book.id, newBookshelf)}
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
