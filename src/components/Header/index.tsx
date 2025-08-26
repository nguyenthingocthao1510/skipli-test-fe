import { Header } from "antd/es/layout/layout";
import Logo from "../../assets/images/logo192.png";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HeaderComponent = () => {
  return (
    <div>
      <Header className="bg-[#001529] text-white">
        <div className="flex justify-between items-center">
          <div>
            <img src={Logo} alt="logo" className="w-10 h-10" />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button
              className="bg-transparent border-none hover:!bg-transparent h-full"
              icon={
                <BellFilled
                  className="text-white hover:!text-yellow-300"
                  style={{ fontSize: "1rem" }}
                />
              }
            />
            <Button
              className="bg-white rounded-[100px] text-black hover:!bg-transparent hover:!text-white"
              icon={<UserOutlined style={{ fontSize: "1rem" }} />}
            />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default HeaderComponent;
