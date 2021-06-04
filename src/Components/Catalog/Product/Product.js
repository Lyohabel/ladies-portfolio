import React, {useContext, useState} from 'react'
import {AppContext} from '../../../App'
import {NavLink} from 'react-router-dom'
import add from "../../../images/e-add.png"

function Product({setCartCount}) {
  const {products} = useContext(AppContext)

  if (!localStorage.getItem('cart')) localStorage.setItem('cart', ['xxx'])  
  const[cart, setCart] = useState(localStorage.getItem('cart').split(','))  
  
  const addToCart = (event) => {    
    let id = event.target.closest('li').id
    let cartNew = cart   
    cartNew.push(id)
    if (cart[0] === 'xxx') {
      cartNew.shift()
    } 
    setCart(cartNew)    
    localStorage.setItem('cart', cart)
    setCartCount(cart.length)
  }

  const href = window.location.href.split('/');
  const prodInd = +href[href.length-1];
  const product = products[prodInd]  
  
    return (    
        <section className="product">
          <li id={product.id}>
          <div className="image2">
            <img src={product.image} alt="#"/>
          </div>                  
          <div className="description2">
            <h3 className="prod-name">{product.title}</h3>
            <span className="prod-inf">{product.category}</span>
            <div className="price-and-button">
              <span className="prod-price">{product.price} $</span>
              <button onClick={addToCart} className="button-add">
                  <img src={add} alt="#"/>
                  </button>             
            </div>
          </div>
        </li>
        <NavLink to="/" className="back">
            <h2>Back to Catalog</h2>
          </NavLink>        
      </section>  
    )
  }
  
  export default Product;