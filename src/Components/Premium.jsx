import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';

const Premium = () => {

     const handleBuyClick =async(type)=>{
        try{
            const order = await axios.post(BASE_URL+ "/payment/create",{
                membershipType:type,
            },{withCredentials:true});

           const {keyId, amount, currency,orderId, notes} = order.data
            const options = {
                key:keyId, // Replace with your Razorpay key_id
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency,
                name : 'TechMate',
                description : 'Connect to other Developers',
                order_id : orderId, // This is the order_id created in the backend
               
                prefill: {
                  name: notes.firstName+ " "+ notes.lastName,
                  email: notes.email,
                  contact: '6305013115'
                },
                theme: {
                  color: '#F37254'
                },
              };


            const rzp = new Razorpay(options);
            rzp.open()

        }catch(err){
            console.log(err);
        }

     }
  return (
     <div className='m-10'>
        <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                <h1 className='font-bold text-3xl'>Silver Membership</h1>
                <ul>
                    <li>- Chat with other people</li>
                    <li>- 100 Connection Requests Per Day</li>
                    <li>- Blue Tick</li>
                    <li>- 3 Months</li>
                </ul>
                <button onClick={()=>handleBuyClick("Silver")} className='btn btn-secondary'>Buy Silver</button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                <h1 className='font-bold text-3xl'>Gold Membership</h1>
                <ul>
                    <li>- Chat with other people</li>
                    <li>- 100 Connection Requests Per Day</li>
                    <li>- Blue Tick</li>
                    <li>- 6 Months</li>
                </ul>
                <button onClick={()=>handleBuyClick("Gold")} className="btn btn-warning">Buy Gold</button>
            </div>
         </div>
     </div>
  );
};

export default Premium