// When using JSX, React must be in scope
import React from 'react';

function CategoryList(props) {
  return (
      <div>
        <ul className='CategoryList'>
          {/* For each c in categories, eg., "Sandwiches" or "Desserts" */}
          {/* - this map will render <li>"Sandwiches"</li> or */}
          {/* - this map will render <li>"Desserts"</li>*/}
          {props.categories.map(c => <li>{c}</li>)}
        </ul>
      </div>
  );
}

export default CategoryList;