import React, { Component } from 'react';

import Bookshelf from './Books/Bookshelf';

class ListShelves extends Component {
  render() {
    return(
      <div>
        {this.props.sections.map((section) => 
          <Bookshelf
            key={section}
            title={this.props.sectionNames[section]}
            books={this.props.books.filter(book => book.shelf === section)}
          />
        )
        }
      </div>
    );
  }
}

export default ListShelves;
