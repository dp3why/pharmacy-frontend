import {
  Button,
  Col,
  Drawer,
  Image,
  List,
  message,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

const MyCart = ({ authed }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    if (cartVisible && !authed) {
      console.log("Not logged in");
    }

    setLoading(true);

    getCart()
      .then((data) => {
        console.log(data);
        setCartData(data);
        setTotalPrice(data.total_price);
      })
      .catch((err) => {
        console.error(err.message);
        // message.error("You may need to relogin before adding your cart");
        // localStorage.removeItem("login_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible, authed]);

  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        message.success("Successfully checkout");
        setCartVisible(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  const onCloseDrawer = () => {
    setCartVisible(false);
  };

  const onOpenDrawer = () => {
    setCartVisible(true);
  };

  return (
    <>
      <Tooltip title="check my cart">
        <Button
          type="primary"
          size="large"
          shape="circle"
          onClick={onOpenDrawer}
        >
          <ShoppingCartOutlined style={{ fontSize: 24 }} />
        </Button>
      </Tooltip>
      <Drawer
        title="My Shopping Cart"
        onClose={onCloseDrawer}
        open={cartVisible}
        width={520}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <div>
              <Button
                onClick={onCloseDrawer}
                shape="round"
                type="default"
                size="large"
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                onClick={onCheckOut}
                shape="round"
                type="primary"
                size="large"
                loading={checking}
                disabled={loading || cartData?.order_items?.length === 0}
              >
                Checkout
              </Button>
            </div>
            <Text strong={true} style={{ fontSize: 16, marginRight: 30 }}>
              {totalPrice > 0 && `Total price: $${totalPrice}`}
            </Text>
          </div>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.order_items}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Row
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Col>
                      <h3 style={{ maxWidth: 320 }}>{item.menu_item_name}</h3>
                      <Row
                        style={{
                          color: "gray",
                        }}
                      >
                        <p style={{ maxWidth: 350 }}>
                          {`Price: $${parseFloat(item.price)}`}
                        </p>
                        <p style={{ marginLeft: 30 }}>
                          Quantity: {item.quantity}
                        </p>
                      </Row>
                    </Col>
                    <Col>
                      <Image src={item.menu_item_image_url} width={100} />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;
