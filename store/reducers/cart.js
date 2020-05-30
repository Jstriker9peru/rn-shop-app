import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );

                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: updatedOrNewCartItem,
                    },
                    totalAmount: state.totalAmount + prodPrice,
                };
            } else {
                updatedOrNewCartItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem,
                },
                totalAmount: state.totalAmount + prodPrice,
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const {
                quantity,
                productPrice,
                productTitle,
                sum,
            } = selectedCartItem;
            const currentQty = quantity;

            let updatedCartItems;
            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    quantity - 1,
                    productPrice,
                    productTitle,
                    sum - productPrice
                );

                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) {
                return state;
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.productId].sum
            delete updatedItems[action.productId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state;
};

export default cartReducer;
