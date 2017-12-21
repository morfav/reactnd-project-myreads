import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  constructor(props) {
    super(props);

    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(newShelf) {
    this.props.changeShelf(newShelf);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})` }}>
            <BookshelfChanger
              shelf={this.props.shelf}
              sections={this.props.sections}
              sectionNames={this.props.sectionNames}
              changeShelf={newShelf => this.changeShelf(newShelf)}
            />
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  authors: PropTypes.instanceOf(Object),
  changeShelf: PropTypes.func.isRequired,
  imageLinks: PropTypes.instanceOf(Object),
  sections: PropTypes.arrayOf(String).isRequired,
  sectionNames: PropTypes.instanceOf(Object).isRequired,
  shelf: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Book.defaultProps = {
  authors: [],
  imageLinks: { thumbnail: '' },
  shelf: 'none',
};

export default Book;
