import { Link } from "react-router";
import defaultImg from "../../assets/images/default_product.jpg"

const ProductItem = ({ product }) => {
    return (
        <Link to={`/shop/${product.id}`}>
        <div className="card bg-base-100 w-full md:w-96 shadow-sm">
        <figure className="px-10 pt-10">
            <img
            src={product.images.length > 0 ? product.images[0].image : defaultImg}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{product.name}</h2>
            <p className="text-xl font-bold text-red-700">${product.price}</p>
            <p>{product.description}</p>
            <div className="card-actions">
            <button className="btn btn-secondary">Buy Now</button>
            </div>
        </div>
        </div>
        </Link>
    );
};

export default ProductItem;