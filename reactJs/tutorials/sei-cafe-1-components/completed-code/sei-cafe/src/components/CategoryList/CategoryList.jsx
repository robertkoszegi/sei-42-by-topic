// When using JSX, React must be in scope
import React from 'react';

function CategoryList(props) {
  return (
      <div className='component'>
        CategoryList<br />
        <li>Sandwiches</li>
        <li>Dessert</li>
      </div>
  );
}

export default CategoryList;