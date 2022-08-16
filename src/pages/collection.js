import { Col, Row,Card} from 'antd';
import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Meta } = Card;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function Collection(){

    const idz = useParams();
    const id = idz.id

    const [height, setHeight] = useState(0);
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const [error, setError] = useState(null);
    const [nftData, setNFTData] = useState([]);

  
    const onImgLoad = ({ target: img }) => {
      let currentHeight = height;
      if (currentHeight < img.offsetHeight) {
        setHeight(img.offsetHeight);
      }
    };
  
    async function getCollections() {
      await axios
        .post(`${API_ENDPOINT}/collection/collectionid`, { id })
        .then((res) => {
          console.log("res", res.data[0].nft);
          setNfts(res.data);
          let nfts = res.data[0].nft;
          axios
            .post(`${API_ENDPOINT}/collection/nftincollection`, { nfts })
            .then((res) => {
              console.log("the nft info res", res.data);
              setNFTData(res.data);
             
            })
            
            .catch((err) => {
              console.log("the nft info err", err);
            });
        }).then(() => {
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }

    useEffect(() => {
   
        getCollections();
      }, []);
      console.log("these", nfts);
      console.log("these", nftData);


return(
  <>
   
    <Row>
      <Col span={8}>
      <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
      </Col>
      <Col span={8}>
      <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
      </Col>
      <Col span={8}>
      <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
      </Col>
    </Row>

  </>
)
};

export default Collection;