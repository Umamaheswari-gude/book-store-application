import BookList from "./components/bookList";
import "./bookStore.css";
import { useBooks } from "./utils/api";

function Application() {
  const books = useBooks();

  return (
    <div className="head">
      <div className="main-content">
        <BookList books={books} />
      </div>
    </div>
  );
}

export default Application;
