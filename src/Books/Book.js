import React, { Component } from 'react';

import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  // changeShelf(newShelf) {
  //   this.props.setBookshelf(newShelf);
  // }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})` }}>
            <BookshelfChanger shelf={this.props.shelf} sections={this.props.sections} sectionNames={this.props.sectionNames} changeShelf={newShelf => this.props.setBookshelf(newShelf)} />
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(", ")}</div>
      </div>
    );
  }
}

export default Book;
