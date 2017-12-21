import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bookshelf from './Books/Bookshelf';

class ListShelves extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(bookToChange, newShelf) {
    this.props.changeShelf(bookToChange, newShelf);
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
            changeShelf={(bookToChange, newShelf) => this.changeShelf(bookToChange, newShelf)}
          />))}
      </div>
    );
  }
}

ListShelves.propTypes = {
  books: PropTypes.arrayOf(Object).isRequired,
  changeShelf: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(String).isRequired,
  sectionNames: PropTypes.instanceOf(Object).isRequired,
};

export default ListShelves;
