import React, { useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


const Home = () => {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem,setFoodItem] = useState([]);
    const [search, setSearch] = useState('')

    const loadData = async ()=>{
        let response = await fetch("http://localhost:8000/api/foodData",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0],response[1])
    }
    useEffect(()=>{
        loadData()
    },[])

    return (
        <>
           <div><Navbar /></div> 
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" style={{ maxHeight: "430px" }}>
                    <div className="carousel-caption " style={{ zIndex: "2", marginBottom: "100px" }}>
                        <div className="d-flex" style={{justifyContent:"center"}}>
                            <input className="form-control me-2 p-3" type="search" placeholder="Search" aria-label="Search"
                            value={search} onChange={(e) => setSearch(e.target.value)}
                             />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300×100?burger" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700?momos" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="rice" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700?sea" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="momos" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
            {
                foodCat !== [] ?
                foodCat.map((data) => {
                    return (
                        <div className='row mb-3'>
                        <div key={data._id} className='fs-3 m-3'>
                        {data.CategoryName}
                        </div>
                        <hr/>
                        {
                            foodItem !== []
                            ?
                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                            .map(filterItems => {
                                return (
                                    <div key={filterItems._id} className='col mb-3'>
                                    <Card foodItem= {filterItems}                                     
                                          options={filterItems.options[0]}                                  
                                     />
                                    </div>
                                )
                            }) : <div> No Data is Found</div>
                        }
                        

                        </div>                        
                    )
                })
                : ""
            }
            </div>                      
            
            <Footer />
        </>
    )
}

export default Home