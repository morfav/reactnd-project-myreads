import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(bookToChange, newShelf) {
    this.props.changeShelf(bookToChange, newShelf);
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

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(Object).isRequired,
  changeShelf: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(String).isRequired,
  sectionNames: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Bookshelf;
