import { useState, Fragment } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const updateQuantity = async() => {

        if (isUpdating) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });
            await loadCart();
        };

        setIsUpdating(isUpdating ? false : true);
    };

    const getQuantityInput = (event) => {
        setQuantity(event.target.value);
    };

    const quantityInputKeyPressed = (event) => {
        if (event.key === 'Enter') {
            updateQuantity();
        }
        if (event.key === 'Escape') {
            setIsUpdating(false);
            setQuantity(cartItem.quantity);
        }
    };

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    return (
        <Fragment>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdating ? (
                            <input className="update-quantity-input" type="text" value={quantity}
                                onChange={getQuantityInput}
                                onKeyDown={quantityInputKeyPressed}
                                />
                        ) : (
                            <span className="quantity-label">{cartItem.quantity}</span>
                        )}
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </Fragment>
    );
}