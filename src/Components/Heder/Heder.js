import React, {useContext, useState} from 'react'
import {AppContext} from '../../App'
import {NavLink} from 'react-router-dom'
import logo from "../../images/logo.png"
function Header({cartCount}) {
  const {products} = useContext(AppContext)
  
  const[prodLinks, setProdLinks] = useState('')  

  const deleteLink = () => {
    setProdLinks('')   
 }

   const search = (event) => {
    if (event.key === 'Enter') {
      let searchAll = []
      let searchItem = event.target.value
      products.forEach((element, index) => {
        let title = element.title
        if (title.toLowerCase().indexOf(searchItem) !== -1) {
          let searchProd = {title: element.title, index: index}
          searchAll.push(searchProd)        
        }
      })
      let prodLinks1 = ''
      prodLinks1 = searchAll.map((product, index) => {
        return (
          <li key={index} className="link">
            <NavLink to={"/product/" + product.index} onClick={deleteLink}>
              {product.title}
            </NavLink>
          </li>
        )
      })
    setProdLinks(prodLinks1); 
    }// <NavLink to={"/search/" + product.index} onClick={deleteLink}> - то же самое
  }

  return (    
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="#"/>
        </a>
      </div>
      <div className="search">
        <input onKeyPress={search} name="search" placeholder="Search" />
        <ul>
            {prodLinks}
        </ul>       
      </div>
      <div className="cart">
        <button className="button-cart">{cartCount}</button>
      </div>      
    </header>    
  )
}

export default Header;
