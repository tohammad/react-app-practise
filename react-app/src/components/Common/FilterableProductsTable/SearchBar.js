import React from 'react';
const SearchBar = React.memo(() => {
  console.log('SearchBar')
    return (
        <form>
          <input type="text" placeholder="Search..." />
        </form>
      );
});
export default SearchBar;