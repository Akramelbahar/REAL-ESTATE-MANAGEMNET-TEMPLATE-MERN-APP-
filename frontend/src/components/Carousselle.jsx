import React from 'react';

function Carousel({ items }) {
  const arrayDataItems1 = items.map((item, index) => (
    <div id={"item" + index.toString()} className="carousel-item  " key={index}>
      <img  src={item} className="w-auto center mx-auto rounded" alt={`carousel-item-${index}`} />
    </div>
  ));

  const arrayDataItems2 = items.map((item, index) => (
    <a href={"#item" + index.toString()} className="btn btn-xs" key={index}>
      {index.toString()}
    </a>
  ));

  return (
    <>
      <div className="carousel  m-4">
        {arrayDataItems1}
      </div>
      <div className="flex justify-center gap-2 py-2">
        {arrayDataItems2}
      </div>
    </>
  );
}

export default Carousel;
