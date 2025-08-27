import React, { useEffect, useState, useMemo } from "react";
import { Layout, Button, Spin, Card, Typography } from "antd";
import {
  EllipsisOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import { useGetAllCards } from "../../services/CardService";
import { ListComponent } from "./ListComponent";

const { Sider, Content } = Layout;
const { Title } = Typography;

export const BoardPage: React.FC = () => {
  const { boardId } = useParams();
  const { data: cards } = useGetAllCards(boardId ?? "");
  const [userMap, setUserMap] = useState<Record<string, string>>({});

  const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  const memberIds = useMemo(() => {
    const all = cards?.flatMap((card) => card.list_member) ?? [];
    return Array.from(
      new Set(all.filter((id): id is string => typeof id === "string"))
    );
  }, [cards]);

  useEffect(() => {
    if (!memberIds.length) return;

    axios
      .post(`${API_URL}/users/get-by-id`, { uids: memberIds }, { headers })
      .then((res) => {
        const map = Object.fromEntries(
          res.data.users.map((u: any) => [u.uid, u.displayName])
        );
        setUserMap(map);
      })
      .catch((err) => console.error("Failed to load users", err));
  }, [memberIds]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />

      <Layout className="flex-1">
        <Sider className="bg-[#162032] text-white" width={250}>
          <div className="px-4 py-4">
            <div className="flex w-full justify-between items-center mb-4">
              <p className="font-medium">Your boards</p>
              <Button
                icon={<EllipsisOutlined />}
                className="bg-transparent text-white border-none hover:!bg-transparent hover:!text-white"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-300 px-2 py-2">
                <TeamOutlined />
                <p>All Members</p>
              </div>

              <div className="space-y-2 mt-2">
                {memberIds.map((uid) => (
                  <div key={uid} className="px-2">
                    {userMap[uid] ? (
                      <div className="flex items-center gap-2 text-white">
                        <UserOutlined
                          className="bg-white text-black rounded-full p-1"
                          style={{ fontSize: "1rem" }}
                        />
                        <p>{userMap[uid]}</p>
                      </div>
                    ) : (
                      <Spin size="small" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sider>

        <Content className="bg-white">
          <div className="w-full bg-cyan-500">
            <Title level={4} className="!text-white font-medium py-2 px-4">
              My Trello Board
            </Title>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <ListComponent name="to-do" label="To do" />
              <ListComponent name="doing" label="Doing" />
              <ListComponent name="done" label="Done" />

              <Card
                hoverable
                className="flex items-center justify-center gap-2 text-gray-500 cursor-pointer !h-32"
                onClick={() => console.log("Add new list")}
              >
                <div className="flex justify-center items-center">
                  <PlusOutlined className="text-lg pr-2" />
                  <p className="m-0">Add another list</p>
                </div>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>

      <FooterComponent />
    </div>
  );
};
