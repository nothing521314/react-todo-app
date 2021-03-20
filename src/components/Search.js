import React, { useState } from 'react';

function Search(props) {
  const [inputValue, setInputValue] = useState({
    keyword: ""
  })

  const handleOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputValue({...inputValue, [name]: value});
  }
  
  const search = (event) => {
    event.preventDefault();
    props.onSearch(inputValue)
  }

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input type="text" 
              name="keyword" 
              className="form-control" 
              placeholder="Input Keyword..."
              onChange={handleOnChange}
              value={inputValue.keyword}
        />
        <span className="input-group-btn">
          <button className="btn btn-primary" onClick={search}>
            <span className="fa fa-search mr-5"></span>Search
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;