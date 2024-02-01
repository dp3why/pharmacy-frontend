import { Button, Drawer, List, message, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

const MyCart = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    setLoading(true);
    getCart()
      .then((data) => {
        setCartData(data);
        // console.log(data);
      })
      .catch((err) => {
        message.error("You may need to relogin before adding your cart");
        localStorage.removeItem("login_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible]);

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
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text
              strong={true}
              style={{ fontSize: 16 }}
            >{`Total price: $${cartData?.total_price}`}</Text>
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
                title={<h3>{item.menu_item_name}</h3>}
                description={`$${parseFloat(item.price).toFixed(2)}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;
