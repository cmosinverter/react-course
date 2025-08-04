import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions( {deliveryOptions, cartItem, loadCart} ) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                const updateDeliveyOption = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id
                    })
                    loadCart()
                }
                return (
                    <div key={deliveryOption.id} className="delivery-option"
                        onClick={updateDeliveyOption}>
                        <input type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`}
                            onChange={() => {}}/>
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {deliveryOption.priceCents === 0 ? 'FREE' : formatMoney(deliveryOption.priceCents)} Shipping
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}