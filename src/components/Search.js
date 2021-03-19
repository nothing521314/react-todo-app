function Search() {
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input type="text" 
              name="keyword" 
              className="form-control" 
              placeholder="Input Keyword..."
        />
        <span className="input-group-btn">
          <button type="button" className="btn btn-primary">
            <span className="fa fa-search mr-5"></span>Search
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;