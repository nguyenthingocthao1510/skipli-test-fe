import { Button, Card, Input } from "antd";
import React from "react";
import { useGetCardDetail } from "../../services/CardService";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  AlignLeftOutlined,
  CloseOutlined,
  EyeOutlined,
  GithubOutlined,
  InboxOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export const TaskPage = () => {
  const location = useLocation();
  const { boardId } = location.state || {};
  const { cardId } = useParams();
  const { data: card } = useGetCardDetail(boardId, cardId || "");
  const navigate = useNavigate();

  return (
    <div className="bg-[#162032] p-6 min-h-screen text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{card?.name}</h2>
          <p className="text-gray-400">
            in list{" "}
            {card?.status === "to-do"
              ? "To do"
              : card?.status === "doing"
              ? "Doing"
              : card?.status === "done"
              ? "Done"
              : ""}
          </p>
        </div>
        <Button
          icon={<CloseOutlined />}
          className="bg-transparent border-none text-white hover:bg-gray-700 rounded-full"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section */}
        <div className="flex-1 space-y-6">
          {/* Members & Notifications */}
          <Card className="bg-[#1f2933] border-none rounded-lg">
            <div className="flex justify-between text-white">
              <div className="space-y-2 ">
                <p className="font-semibold">Members</p>
                <div className="flex items-center gap-2">
                  <Button
                    icon={<UserOutlined />}
                    className="bg-white text-black rounded-full"
                  />
                  <Button
                    icon={<PlusOutlined />}
                    className="bg-transparent text-white border border-white rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Notification</p>
                <div className="cursor-pointer flex items-center gap-1 bg-[#2f3840] px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  <EyeOutlined />
                  <span>Watch</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="bg-[#1f2933] border-none rounded-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <AlignLeftOutlined />
              <span className="font-semibold">Description</span>
            </div>
            <TextArea
              placeholder="Add a more detailed description"
              className="bg-white text-white border-none rounded-md"
              autoSize={{ minRows: 3 }}
            />
          </Card>

          {/* Activity */}
          <div className="bg-[#1f2933] border-none rounded-lg p-6 flex justify-between">
            <div className="flex items-center gap-2">
              <UnorderedListOutlined />
              <span className="font-semibold">Activity</span>
            </div>
            <Button className="bg-[#2f3840] text-white border-white hover:bg-gray-700">
              Show details
            </Button>
          </div>

          {/* Comment */}
          <div className="bg-[#1f2933] border-none rounded-lg flex items-center gap-2 p-6">
            <Button
              icon={<UserOutlined />}
              className="bg-white text-black rounded-full"
            />
            <TextArea
              placeholder="Write a comment"
              className="bg-white text-white border-none rounded-md"
              autoSize={{ minRows: 2 }}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="w-full lg:w-64 flex flex-col gap-6">
          <Card className="bg-[#1f2933] border-none rounded-lg space-y-2">
            <p className="font-semibold pb-3 text-white">Add to card</p>
            <Button
              icon={<UserOutlined />}
              className="bg-[#2f3840] text-white w-full justify-start hover:bg-gray-700"
            >
              Member
            </Button>
          </Card>

          {/* Power-Ups */}
          <Card className="bg-[#1f2933] border-none rounded-lg space-y-2">
            <p className="font-semibold pb-3 text-white">Power-Ups</p>
            <Button
              icon={<GithubOutlined />}
              className="bg-[#2f3840] text-white w-full justify-start hover:bg-gray-700"
            >
              GitHub
            </Button>

            <div className="flex flex-col gap-2 mt-2">
              {[
                "Attach Branch",
                "Attach Commit",
                "Attach Issue",
                "Attach Pull Request",
              ].map((text) => (
                <Button
                  key={text}
                  className="bg-[#2f3840] text-white w-full justify-start hover:bg-gray-700"
                >
                  {text}
                </Button>
              ))}
            </div>
          </Card>
          <Card className="bg-[#1f2933] border-none">
            <Button
              icon={<InboxOutlined />}
              className="bg-[#2f3840] text-white w-full justify-start hover:bg-gray-700"
            >
              Archive
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
