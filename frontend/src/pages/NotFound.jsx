import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bookstore-beige px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-bookstore-brown mb-4">404</h1>
        <h2 className="text-4xl font-bold text-bookstore-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-bookstore-brown mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;



