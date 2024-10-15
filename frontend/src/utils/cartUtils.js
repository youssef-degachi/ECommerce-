
export const addDecimal = (num) => {
  return (Math.round(num*100) /100).toFixed(2)
};

export const updateCart = (state) =>  {
    // Calculate items price

    state.itemsPrice =addDecimal( state.cartItems.reduce((acc,item) => acc + item.price * item.qty , 0))

    // Calculate shipping price (if order over $150 then free , else $7 shipping)
    // state.shippingPrice =addDecimal( (state.itemsPrice >150 ? state.shippingPrice=0 :state.shippingPrice=7), 0)
    state.shippingPrice =addDecimal( (state.itemsPrice >150 ?0 :7))
    

    // Calculate tax price(5% tax add to itemsPrice)
    state.taxPrice =addDecimal(Number ((0.05 * state.itemsPrice)))

    // Calculate total price
    state.totalPrice = addDecimal(Number( state.itemsPrice )+ Number( state.shippingPrice) +Number( state.taxPrice));

    //Save state in local storage
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}
