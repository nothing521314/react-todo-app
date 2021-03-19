import Search from './Search';
import Sort from './Sort';

function Control() {
  return (
    <div className="row mt-15">
    {/* search */}
      <Search/>
     {/* Sort */}
      <Sort/>
    
    </div>
  );
}

export default Control;