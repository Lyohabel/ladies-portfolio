import React, {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// HashRouter
// <HashRouter basename={process.env.PUBCLI_URL} >

import Header from "./Components/Heder/Heder"
import Title from "./Components/Title/Title"
import Catalog from "./Components/Catalog/Catalog"
import Product from "./Components/Catalog/Product/Product"
//import SearchProduct from "./Components/Catalog/Product/SearchProduct"

export const AppContext = React.createContext()

function App() {
  const[dataStatus, setDataStatus] = useState(false)
  const[products, setProducts] = useState([])
  const[cartCount, setCartCount] = useState(0) 

  const getData = () => {
    fetch('https://fakestoreapi.com/products/')
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      localStorage.setItem('data', data)
      setProducts(JSON.parse(data))
      setDataStatus(true)      
    })           
  } 

  useEffect(() => {
    if (dataStatus === false) getData()   
  }, [dataStatus, products])

  return (
    <BrowserRouter >
      <AppContext.Provider value={{products, setProducts}}>                
        <div className="container">
          <Header cartCount={cartCount} />
        </div>
        <div className="container">
        <Switch>
          
          <Route exact path='/'>
            <Title/>
            <Catalog cartCount={cartCount} setCartCount={setCartCount} />
          </Route>

          <Route path='/product'>
            <Product setCartCount={setCartCount}/>
          </Route>
            
        </Switch>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
