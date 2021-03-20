import Search from './Search';
import Sort from './Sort';

function Control(props) {
  return (
    <div className="row mt-15">
    {/* search */}
      <Search onSearch = {props.onSearch}/>
     {/* Sort */}
      <Sort/>
    
    </div>
  );
}

export default Control;