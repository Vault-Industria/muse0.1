/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { Row, Col, Card, Radio, Table, Typography } from "antd";
import axios from "axios";
const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Asset Name",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "Views",
    dataIndex: "function",
    key: "function",
    width: "20%",
  },

  {
    title: "Likes",
    key: "status",
    dataIndex: "status",
    width: "20%",
  },
];

// project table start
const API_URL = process.env.REACT_APP_API_ENDPOINT
function Engagements() {
  const wallet = useSelector((state) => state.userinfo.wallet);
  console.log("a wallet", wallet);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const address = useSelector((state) => state.userinfo.wallet);
  console.log("from owbner", address);

  async function getAssets() {
    if (wallet) {
      let id = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";

      await axios
      
        .post(`${API_URL}/nfts/getbyownernfts`, { id })
        .then((response) => {
          console.log("thid is res", response.data);
          setAssets(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getAssets();
  }, [address]);

  console.log("the assets", assets);
  const data = [];
  if (!loading) {
    assets.map((asset, index) => {
      data.push({
        key: index,
        name: (
          <>
            <div className="avatar-info">
              <Title level={5}>{asset.name}</Title>
              <p></p>
            </div>
          </>
        ),
        function: (
          <>
            <div className="author-info">
              <Title level={5}>{asset.views}</Title>
            </div>
          </>
        ),
        status: (
          <>
            <div className="author-info">
              <Title level={5}>{asset?asset.likes.length:"N/A"}</Title>
            </div>
          </>
        ),
      });
    });
  }

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transactions"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">CSV</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Engagements;
