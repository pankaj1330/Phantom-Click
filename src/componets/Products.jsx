import {useState, useEffect} from "react"
import SingleProduct from "./SingleProduct";
import starsvg from '../assets/star.svg'
import { v4 as uuidv4 } from 'uuid';

function Products() {
    const [products,setProducts] = useState([]);
    const [modelProduct,setModelProduct] = useState(null);
    const [filterItems,setFilterItems] = useState([]);
    const [searchKey,setSearchKey] = useState("");
    const [priceFilter,setPriceFilter] = useState(null);

    const [categories,setCategories] = useState([]);
    const [selectedCategories,setSelectedCategories] = useState([]);
    
    useEffect(()=>{
        async function getData(){
            try{
                const resp = await fetch('https://fakestoreapi.com/products');
                const data = await resp.json();
                
                setProducts(data);
                setFilterItems(data);

                let allCategories = data.map(item => item.category);
                let uniqueCategories = [...new Set(allCategories)];

                setCategories(()=>{
                    return uniqueCategories.map(category => {
                        return {
                            id : uuidv4(),
                            category : category
                        }
                    })
                })

            }
            catch(err){
                setProducts([]);
            }
            return;
        }
        
        getData();
    },[]);

    function addModelProduct(id){

        const product = products.find(product => {
            return product.id === id;
        })
        
        setModelProduct(product);
        return;        
    }


    function searchItem(e){
        setSearchKey(e.target.value);
        let value = e.target.value.trim().toLowerCase();
        
        if(value.length === 0){
            setFilterItems(products);
        }
        else{
            const filtereditems = products.filter(product => {
                return product.title.toLowerCase().includes(value);
            })
            
            setFilterItems(filtereditems);
        }
        return;
    }

    function priceFilteritem(e){
        let value = e.target.value;
        console.log(value);
        setPriceFilter(value);

        if(value === null){
            return;
        }
        else if(value === 'lth'){
            setFilterItems(previtems => {
                return previtems.sort((a,b)=>a.price - b.price);
            })
        }
        else if(value === 'htl'){
            setFilterItems(previtems => {
                return previtems.sort((a,b)=>b.price - a.price);
            })
        }
    }

    function filterCategory(e){
        let checked = e.target.checked;
        let value = e.target.value;

        setSelectedCategories((prev) => {
            const updatedCategories = checked
                ? [...prev, value] 
                : prev.filter((item) => item !== value); 
    
            const filteredProducts = products.filter((product) =>
                updatedCategories.includes(product.category)
            );
    
            
            if(filteredProducts.length === 0){
                setFilterItems(products);
            }
            else{
                setFilterItems(filteredProducts);
            }
            return updatedCategories;
        });
        
        return;
    }

  return (
    <>
        <section className="products-section my-5">
            <div className="lg:container mx-auto px-5">
                <div className="flex flex-row justify-between items-center p-2 mb-5">
                    <h2 className="text-2xl font-bold">Products</h2>
                </div>

                <div className="full-products flex md:flex-row flex-col gap-2 justify-between">
                    <div className="filters px-2 basis-full md:basis-[200px] shrink-0 grow-0">
                        <div>
                            <form>
                                <div className="mb-4">
                                    <input type="search" name="search" id="search" value={searchKey} onChange={searchItem} placeholder="Search Items" className="border-1 rounded-sm p-1 w-full" />
                                </div>
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg">Categories</h3>

                                    {
                                        categories.map((category,i) => {
                                            return <div key={i}>
                                                <input type="checkbox" name={category.id} id={category.id} checked={selectedCategories.find(cati => cati.id === category.id)} value={category.category}  onChange={filterCategory}/>
                                                <label htmlFor={category.id}>{category.category}</label> <br />
                                            </div>
                                        })
                                    }
                                    
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Sort by</h3>
                                    <input type="radio" name="pricefilter" id="htl" checked={priceFilter === 'htl'} value="htl" onChange={priceFilteritem}/>
                                    <label htmlFor="htl">Price - high to low</label> <br />
                                    <input type="radio" name="pricefilter" id="lth" checked={priceFilter === 'lth'} value="lth" onChange={priceFilteritem}/> 
                                    <label htmlFor="lth">Price - low to high</label> <br />

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="products flex flex-row flex-wrap justify-start items-stretch space-y-4 w-full">
                        {
                            filterItems.length === 0 ? 
                                <p className="text-center my-4 w-full">loading products...</p> : 
                                filterItems.map(product => {
                                    return <SingleProduct key={product.id} productData={product} handleClick={addModelProduct}/>
                                })
                        }
                    </div>
                </div>


                {
                    modelProduct && 
                        <div className="model fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center" style={{backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
                            <div className="model-content rounded-lg p-4 shadow-xl bg-white max-w-[400px]">
                                <h1 className="text-lg font-bold">{modelProduct.title}</h1>
                                <p className="my-2 text-sm">{modelProduct.description}</p>
                                <span className="font-semibold">Category : </span>
                                <span className="p-1 px-2 rounded-2xl bg-orange-400 text-white text-xs">{modelProduct.category}</span>
                                <p><span className="font-semibold">Rating : </span> {modelProduct.rating.rate} <img src={starsvg} alt="" className="inline" width={14}/></p>
                                <p><span className="font-semibold">Reviews : </span> {modelProduct.rating.count}</p>
                                <p className="font-bold mt-2 text-3xl">$ {modelProduct.price}</p>
                                <button className="bg-blue-600 text-white p-1 px-3 rounded-md mt-4 cursor-pointer" onClick={()=>{setModelProduct(null)}}>Close</button>
                            </div>
                        </div>
                }

            </div>
        </section>
    </>
  )
}

export default Products