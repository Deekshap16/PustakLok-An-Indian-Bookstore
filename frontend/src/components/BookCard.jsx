import { Link } from 'react-router-dom';
import BookImage from './BookImage';

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/books/${book._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-[3/4] bg-bookstore-beige overflow-hidden relative">
        <BookImage
          src={book.image || book.imageUrl}
          alt={book.title}
          title={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-bookstore-dark mb-2 line-clamp-2 h-14">
          {book.title}
        </h3>
        <p className="text-bookstore-brown text-sm mb-2">by {book.author}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-bookstore-dark">
            ₹{book.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-bookstore-dark ml-1">
              {book.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-bookstore-brown">
          <span>{book.genre || book.category}</span>
          <span>{book.language}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;



