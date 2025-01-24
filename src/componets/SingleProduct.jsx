
function SingleProduct({productData,handleClick}) {
  return (
    <>
        <article className="single-product p-2 w-full md:w-1/2 lg:w-1/4">
            <div className="flex flex-col shadow-md rounded-md h-full">
                <div className="product-img w-full">
                    <img src={productData.image} alt="" className="w-full h-[250px] object-contain"/>
                </div>
                <div className="info p-4 flex flex-col justify-between h-full">
                    <h2 className="text-lg">{productData.title}</h2>
                    <div>
                        <h4 className="my-4 font-bold text-2xl">$ {productData.price}</h4>
                        <button className="bg-blue-400 rounded-lg px-2 py-1 font-bold text-white cursor-pointer hover:bg-blue-600 transition-all" onClick={()=>handleClick(productData.id)}>More Info</button>
                    </div>
                </div>
            </div>
        </article>
    </>
  )
}

export default SingleProduct