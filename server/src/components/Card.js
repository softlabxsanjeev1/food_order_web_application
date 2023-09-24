import React, { useState , useRef, useEffect} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options);
    // let foodItem = props.item;
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    
   const handleAddToCart = async () =>{
    let food = []
     for (const item of data) {
        if (item.id === props.foodItem._id) {
            food = item;

            break;
        }
     }
     if (food !== []) {
        if(food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
            return
        }
        else if (food.size !== size){
            await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name,
                price: finalPrice, qty: qty, size: size
            })
            return
        } 
        return        
     }
       await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name,
           price: finalPrice, qty: qty, size: size
       })
   }
   let finalPrice = qty* parseInt(options[size]);

   useEffect(() => {
    setSize(priceRef.current.value)
   },[])

  return (
    <>
          <div>
              <div className="card mb-4" style={{ width: "20rem" }}>
                  <img className="card-img-top" src={props.foodItem.img} alt="Card" style={{height:"200px",objectFit:"fill"}} />
                  <div className="card-body">
                      <h5 className="card-title text-danger  mb-4 ms-4" style={{}}>{props.foodItem.name}</h5>
                      <div className='container w-100'>
                          <select className='me-3 py-1 px-2 mb-3 h-100 bg-success rounded'
                           onChange={(e) => setQty(e.target.value)}>
                              {Array.from(Array(6), (e, i) => {
                                  return (
                                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                                  )
                              })}
                          </select>
                          <select className='me-2 ms-4 px-4 h-100 p-1 bg-success rounded' ref={priceRef}
                              onChange={(e) => setSize(e.target.value)}>
                              {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                              }
                          </select><br/>
                          <div className='d-inline text-dark'>
                              <span className="fs-4">&#8377; </span>{finalPrice} /-
                          </div>
                          <hr/>
                          <button className='btn btn-success bg-danger' style={{textAlign:"center"}}
                          onClick={handleAddToCart}
                          >Add To Cart</button>
                      </div>
                  </div>
              </div>

          </div>
    </>
  )
}

export default Card