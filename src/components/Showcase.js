import {
  Typography,
  Avatar,
  Button,
  Card,
  List,
  message,
  Modal,
  Tooltip,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getSellers } from "../utils";
import {
  PlusOutlined,
  PhoneOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import Meta from "antd/lib/card/Meta";

const { Title } = Typography;
const AddToCartButton = ({ itemId, authed }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    if (!authed) {
      message.error("Please login first");
      return;
    }
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};
const Showcase = ({ authed }) => {
  const [productData, setProductData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setLoadingRest(true);
    getSellers()
      .then((data) => {
        setSellerData(data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      setListLoading(true); // Initially show loading
      getMenus(curRest)
        .then((data) => {
          setProductData(data);
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => {
          setLoading(false);
          setListLoading(false); // Use a shorter time frame for the loading indicator
        });
    }
  }, [curRest]);

  return (
    <>
      <List
        loading={loadingRest}
        dataSource={sellerData}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        renderItem={(item, index) => {
          return (
            <List.Item
              key={index}
              value={item.id}
              onClick={() => {
                setIsModalVisible(true);
                setCurRest(item.id);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <Card
                style={{ overflow: "hidden" }}
                hoverable
                cover={
                  <Image
                    id={item.name}
                    preview={false}
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      height: 220,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "green" }}
                      icon={<MedicineBoxOutlined />}
                    />
                  }
                  title={item.name}
                  description={
                    <div>
                      <div>
                        <PhoneOutlined style={{ marginRight: 10 }} />
                        {item.phone}
                      </div>
                      <div style={{ height: 20, overflow: "hidden" }}>
                        <HomeOutlined style={{ marginRight: 10 }} />
                        {item.address}
                      </div>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          );
        }}
      />
      {/* =========== Product List =========== */}
      {curRest && (
        <Modal
          loading={loading}
          destroyOnClose={true}
          title={
            <Title
              style={{
                fontFamily: "Helvetica Neue, sans-serif",
                marginTop: "1rem",
                marginLeft: "20px",
                textAlign: "center",
              }}
              level={1}
            >
              Product List
            </Title>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
        >
          {listLoading ? (
            <Spin
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            />
          ) : (
            <List
              style={{ marginTop: 20 }}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              dataSource={productData}
              renderItem={(item, index) => (
                <List.Item key={"key" + index}>
                  <Card
                    title={item.name}
                    extra={<AddToCartButton authed={authed} itemId={item.id} />}
                    key={"card" + index}
                    hoverable={true}
                    cover={
                      <Image
                        key={item.name}
                        src={item.image_url}
                        alt={item.name}
                        style={{
                          border: "1px solid #f0f0f0",
                          height: 220,
                          width: "100%",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                      />
                    }
                  >
                    <Meta
                      description={item.description}
                      title={`Price: ${item.price}`}
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Showcase;
