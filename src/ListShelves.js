import React, { Component } from 'react';

import Bookshelf from './Books/Bookshelf';

class ListShelves extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(bookId, newShelf) {
    this.props.changeShelf(bookId, newShelf);
  }

  render() {
    return (
      <div>
        {this.props.sections.map(section => (
          <Bookshelf
            key={section}
            title={this.props.sectionNames[section]}
            books={this.props.books.filter(book => book.shelf === section)}
            sectionNames={this.props.sectionNames}
            sections={this.props.sections}
            changeShelf={(bookId, newShelf) => this.changeShelf(bookId, newShelf)}
          />))}
      </div>
    );
  }
}

export default ListShelves;
