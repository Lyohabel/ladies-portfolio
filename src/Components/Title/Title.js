import React, {useContext} from 'react'
import {AppContext} from '../../App'

function Title() {
  const {products, setProducts} = useContext(AppContext)  

  const sort = () => {
    let sortProducts = [...products]

    if (sortProducts[0].id < sortProducts[1].id) {   
      sortProducts.sort((a, b) => a.price > b.price ? 1 : -1)
    } else {
      sortProducts.sort((a, b) => a.id > b.id ? 1 : -1)
      }

    setProducts(sortProducts)
  }  
  
  // SLIDER appendChild :
        
  const sliderNextPrev = (dir) => {
    const slider = document.querySelector('.catalog .prods')
    let slides = slider.children

    if (dir === 'next' && (+slider.firstElementChild.id < (slides.length - 1))) {
      slider.appendChild(slider.firstElementChild);
    } else if (dir === 'prev' && (+slider.firstElementChild.id > 0)) {
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      } 
  }

  // SLIDER scrollWidth (another method):

  // const slider = document.querySelector('.catalog .prods');  
  // let sliderList = null;
  // if (slider) {
  //   sliderList = slider.querySelectorAll('li');
  // }

  // let i2 = 0;
        
  // const sliderNextPrev = (dir) => {
  //   if (!slider || !sliderList) return;
  //   const slidesNumder = sliderList.length;
  //   const slideFirst = sliderList[0];
  //   const slideSecond = sliderList[1];
  //   let firstWidth = slideSecond.clientWidth
  //   const firstStyles = window.getComputedStyle(slideSecond);
  //   const firstMl = parseInt(firstStyles.marginLeft);
  //   const firstMr = parseInt(firstStyles.marginRight);
  //   firstWidth += firstMl+firstMr;   
    
  //   if (dir === 'next') {
  //     if (i2 < (slidesNumder - 1)) {
  //       i2 += 1;          
  //       }
  //     } else {
  //       if (i2 > 0) {
  //         i2 -= 1;            
  //       }
  //   };

  //   slideFirst.style.marginLeft = `-${i2 * firstWidth}px`;     
  // }

  return (      
      <section className="title">
        <h1>Catalog</h1>
        <button onClick={sort} className="button-sort"></button>
        <div className="slider-buttons">          
          <button onClick={() => { sliderNextPrev('prev') }} className="button-slider-prev"></button>
          <button onClick={() => { sliderNextPrev('next') }} className="button-slider-next"></button>
        </div>
      </section>           
  );
}

export default Title;
