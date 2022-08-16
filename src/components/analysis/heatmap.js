import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const Heatmap = () => {
  const [eData, setData] = useState([]);
  const [error,setError] = useState();
  const [loading,setLoading] = useState(true);
  const [noData,setNoData] = useState(false);
// const address = useSelector(state => state.userinfo.wallet);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    let address ="0x45E21f4666E2306D3aaf6620A59DcC25e19eB568"
    await axios.post(`${API_URL}/nfts/getbyowneraddress`,address )
      .then((response) => {
        console.log('thid is res', response.data);
        if(response.data.length > 0){
          setData(response.data);
          setLoading(false);

        }else{
          setNoData(true);
          setLoading(false);
        }
        setData(response.data);
      }).catch((error) => {
        console.log(error);
        setError(error);
      });
        
    
  
  };
let viewsArray = [];
let likesArray = [];
let data = [];
if(eData){
  eData.map(item => {
    viewsArray.push({
      asset: item.titles,
      value: item.views,
      type: "views",
    }

    )
  });
  eData.map(item => {
    likesArray.push({
      asset: item.titles,
      value: item.likes.length,
      type: "likes",
    }

    )
  });

  data = viewsArray.concat(likesArray);


}




  
  const config = {
    data,
    isStack: true,
    xField: 'asset',
    yField: 'value',
    seriesField: 'type',
    label: {
   
      position: 'middle',
      // 'top', 'bottom', 'middle'
     
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  if(loading){
    return <div>Loading...</div>
  }else if(noData){
    return <div>Connect Wallet</div>
  }else{
    return <Column {...config} />;
  }

  return <Column {...config} />;
}
export default Heatmap;