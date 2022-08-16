import React,{useEffect,useState} from 'react';
import { Line } from '@ant-design/charts';
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
function Lines(){
  const dispatch = useDispatch();
  const [assets,setAssets] = useState([]);
  const [loading,setLoading] = useState(true);

   const address = useSelector(state => state.userinfo.wallet)
   console.log("from owbner",address);
  
  async function getAssets(){
     if(address){

     await axios.post(`${API_URL}/nfts/transactions`, {address})
      .then((response)=> {
          console.log('thid is res',response.data);
       
        
          setAssets(response.data);
          setLoading(false);
      })
      .catch((error)=> {
          console.log(error);
      })

     }
  }
 

  useEffect(()=>{
     getAssets();
    },[address]);
//getAssets();

const removeItem = (a,b)=>a.filter(x=>x.to !== b)
let txns = null;
let newArray =null

if(!loading){	
  txns = assets.transfers


newArray = removeItem(txns,contractAddress)

}

   
  const data = newArray

  const config = {
    data,
    height: 400,
    xField: 'blockNum',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  if(loading){
    return (
      <div>
      Loading...
      </div>
    );
  }else{
    return (
 
        <Line {...config} />
     
    );
  }
 
};
export default Lines;