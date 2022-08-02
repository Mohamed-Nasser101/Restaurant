import {debounce} from "../helpers/helpers";

interface Props {
  onTitleChanged: (text: string) => void;
  onManagerChanged: (text: string) => void;
}

const Search = ({onTitleChanged, onManagerChanged}: Props) => {
  const titleChangeDebounced = debounce(onTitleChanged, 1000);
  const managerChangeDebounced = debounce(onManagerChanged, 1000);
  return (
    <form className="form-inline row col-8">
      <input onInput={e => titleChangeDebounced(e.currentTarget.value)}
             type="text"
             className="form-control mb-2 mr-sm-2"
             placeholder="Search Title"/>

      <input onInput={e => managerChangeDebounced(e.currentTarget.value)}
             type="text"
             className="form-control mb-2 mr-sm-2"
             placeholder="Search Manager"/>
      {/*<button type="submit" className="btn btn-primary mb-2">Submit</button>*/}
    </form>
  );
}

export default Search;