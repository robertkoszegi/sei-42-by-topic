// When using JSX, React must be in scope
import React from 'react';

function CategoryList(props) {
  return (
      <div>
        <ul className='CategoryList'>
          <li>Sandwiches</li>
          <li>Desserts</li>
        </ul>
      </div>
  );
}

export default CategoryList;