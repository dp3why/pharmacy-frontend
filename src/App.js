import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  Layout,
  Menu,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MyCart from "./components/MyCart";
import Showcase from "./components/Showcase";
import { logout } from "./utils";
import { UserOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
function App() {
  const [authed, setAuthed] = useState();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const SERVER_ORIGIN = process.env.REACT_APP_SERVER_ORIGIN;

    const checkURL = `${SERVER_ORIGIN}/user/me`;
    const loginToken = localStorage.getItem("login_token");
    if (loginToken === "true") {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
    try {
      const res = await fetch(checkURL, {
        method: "GET", // Method is optional if you're making a simple GET request
        credentials: "include", // Include cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserInfo(data);
        setAuthed(true);
      }
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthed(false);
      localStorage.removeItem("login_token");
    } catch (err) {
      console.error(err);
    }
  };

  const menu = userInfo ? (
    <Menu>
      <Menu.Item key={1}>Hi, {userInfo.first_name}! </Menu.Item>

      <Menu.Item key={2} style={{ marginBottom: "10px" }}>
        {userInfo.email}
      </Menu.Item>

      <Menu.Item key={3} onClick={handleLogout}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button shape="round" style={{ width: "5rem" }}>
            Log out
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  );

  return (
    <Layout style={{}}>
      <div
        className="hero-background"
        style={{
          backgroundImage: `url("/images/bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 620,
          width: "100%",
        }}
      >
        <Header
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Title
            level={1}
            style={{
              lineHeight: "inherit",
              marginBottom: 0,
              marginLeft: "10px",
              scale: "1.1",
              // textShadow: "1px 2px 1px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/logo.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
              &nbsp;MedicalBridge
            </div>
          </Title>
          <div>
            {authed ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <MyCart authed={authed} />

                  <Dropdown overlay={menu}>
                    <Avatar
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#177038",
                        marginLeft: "10px",
                      }}
                      icon={<UserOutlined style={{ fontSize: 24 }} />}
                      size="large"
                    ></Avatar>
                  </Dropdown>
                </div>
              </>
            ) : (
              <>
                <LoginForm onSuccess={() => setAuthed(true)} />
                <SignupForm />
              </>
            )}
          </div>
        </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "50px",
            justifyContent: "center",
            alignItems: "start",
            height: "55vh",
            // width: "90%",
            maxWidth: "60%",
            minWidth: "300px",
          }}
        >
          <Title
            level={1}
            style={{
              fontFamily: "Helvetica, sans-serif",
              color: "white",

              fontSize: "3rem",
              fontWeight: 800,
              textShadow: "2px 2px 2px rgba(50, 50, 50, 0.3)",
              fontVariantCaps: "all-small-caps",
            }}
          >
            Healthcare Innovations
            <div>Unveiled</div>
          </Title>
          <Title
            level={3}
            style={{
              fontFamily: "Helvetica, sans-serif",
              color: "rgb(210, 230, 230)",
              marginTop: -10,
              fontSize: "30px",
              maxWidth: "700px",
              textShadow: "2px 2px 3px rgba(50, 50, 50, 0.3)",
            }}
          >
            Discover the Insights of Life Science: Explore, Compare, and Make
            Informed Decisions.
          </Title>
        </div>
      </div>
      <Content
        style={{
          padding: "50px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        <Showcase authed={authed} />
      </Content>
      {/* ===== part 1 ==== */}
      <div
        style={{
          backgroundImage: `url("/images/banner.jpg")`,
          backgroundSize: "cover",
          width: "100%",
          height: "600px",
          display: "flex",
          paddingLeft: "4rem",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Title
          style={{
            marginTop: "auto",
            marginBottom: "8rem",
            color: "rgb(210, 230, 230)",
            fontSize: "2.7rem",
            fontWeight: 800,
            textShadow: "2px 2px 3px rgba(50, 50, 50, 0.3)",
          }}
          level={1}
        >
          LIFE SCIENCE GATEWAY
        </Title>
      </div>
      {/* ==== part 2 ==== */}
      <Row
        width="100%"
        style={{
          padding: "5rem",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Col
          style={{
            maxWidth: "28rem",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "rgb(120, 180, 170)",
            }}
          >
            Revolutionizing Healthcare Partnerships
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "gray",
              maxWidth: "25rem",
            }}
          >
            Step into an ecosystem designed to bridge the gap between healthcare
            innovators and the market. Our platform not only showcases the
            latest in vaccines and pharmaceuticals but also offers manufacturers
            and industry professionals a direct line to the audiences that
            matter most. Gain insights, foster connections, and drive your
            products' success with targeted visibility. Collaborate, innovate,
            and lead the healthcare industry forward with us.
          </p>
        </Col>
        <Col>
          <Image
            src="/images/h.png"
            alt="medical"
            preview={false}
            style={{
              height: 400,
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>

      {/* ==== part 3 ==== */}
      <Row
        width="100%"
        style={{
          padding: "5rem",
          paddingTop: "1rem",
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Col
          style={{
            maxWidth: "28rem",
            marginLeft: "2rem",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "rgb(120, 180, 170)",
            }}
          >
            Accelerating Success in Life Sciences
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "gray",
            }}
          >
            Enter a realm where life science innovations are not just showcased
            but propelled into the spotlight. Our platform provides a unique
            space for scientists, researchers, and companies to illuminate their
            contributions to the field. By offering a platform that emphasizes
            discovery, engagement, and knowledge sharing, we enable life science
            pioneers to accelerate their journey from concept to real-world
            impact. Together, we're actively shaping the future of life
            sciences, ensuring that innovations reach beyond the lab.
          </p>
        </Col>
        <Col>
          <Image
            src="/images/tt.png"
            alt="medical"
            preview={false}
            style={{
              height: 400,
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
      <Footer
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "gray" }}>MedicalBridge@2024</h2>{" "}
        <p style={{ color: "gray" }}>dp3why@gmail.com</p>
      </Footer>
    </Layout>
  );
}

export default App;
