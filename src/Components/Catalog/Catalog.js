import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from '../../App'
import {NavLink} from 'react-router-dom';
//import {useCookies} from 'react-cookie';
import add from "../../images/e-add.png"

function Catalog({setCartCount}) {
  const {products} = useContext(AppContext)

  if (!localStorage.getItem('cart')) localStorage.setItem('cart', ['xxx'])  
  const[cart, setCart] = useState(localStorage.getItem('cart').split(','))
  
  //setCartCount(cart.length) index.js:1 Warning: Cannot update a component (`App`) while rendering a different component (`Catalog`). To locate the bad setState() call inside `Catalog`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render

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
 
  const createList = () => {
    let htmlList = []
    htmlList = products.map((product, index) => {
      return (
        <li key={index} id={index}>
          <div>
            <NavLink to={"/product/" + index} className="image">
              <img src={product.image} alt="#"/>
            </NavLink> 
            <div className="description">
              <h3 className="prod-name">{product.title}</h3>
              <span className="prod-inf">{product.category}</span>
              <div className="price-and-button">
                <span className="prod-price">{product.price} $</span>
                <button onClick={addToCart} className="button-add">
                  <img src={add} alt="#"/>
                  </button>
              </div>
            </div>
          </div>
        </li>
      )
    })

    return htmlList.length > 0 ? htmlList : ''    
  }

  const[list, setList] = useState('')

  useEffect(() => {
    if (products && products.length > 0) {
      setList(createList())

      if (cart[0] !== 'xxx') setCartCount(cart.length)
    } 

  }, [products])   
  
  return (
    <section className="catalog">
      <div>
        <ul className="prods">
          {list}
        </ul>
      </div>
    </section>      
  );
}

export default Catalog;