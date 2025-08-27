import {
  Button,
  Card,
  Layout,
  message,
  Modal,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import HeaderComponent from "../../components/Header";
import Sider from "antd/es/layout/Sider";
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import FooterComponent from "../../components/Footer";
import { boardApi, useGetBoards } from "../../services/BoardService";
import { Board } from "../../helpers/types/board";
import { data, useNavigate } from "react-router";
import { useState, ChangeEvent } from "react";
import { FieldConfig } from "../../components/FormComponent/fieldConfig";
import * as yup from "yup";
import { useFormik } from "formik";
import { FORM_TYPE } from "../../components/FormComponent/formType";
import { FormFields } from "../../components/FormComponent";

const Homepage = () => {
  const { Title } = Typography;
  const { data: boards, mutate, isLoading } = useGetBoards();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [overlayId, setOverlayId] = useState<string | null>(null);

  const schema = yup.object({
    name: yup.string().required("Board name is required"),
  });

  const form = useFormik<Board>({
    initialValues: { name: "", description: "" },
    validationSchema: schema,
    onSubmit: () => {
      const payload = form.values;
      const req = editingId
        ? boardApi.updateBoard({ ...payload, id: editingId })
        : boardApi.createBoard(payload);

      req
        .then(() => {
          setIsOpen(false);
          messageApi.success(editingId ? "Board updated" : "Board created");
          form.resetForm();
          setEditingId(null);
          mutate();
        })
        .catch((err) => {
          console.error("Save error", err);
          messageApi.error(editingId ? "Update failed" : "Create failed");
        });
    },
  });

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Board name",
      type: FORM_TYPE.TEXT,
      required: true,
      placeholder: "Enter name",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        form.setFieldValue("name", e.target.value),
    },
    {
      name: "description",
      label: "Description",
      type: FORM_TYPE.TEXT,
      placeholder: "Enter description",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        form.setFieldValue("description", e.target.value),
    },
  ];

  const handleEdit = (board: Board) => {
    form.setValues({
      name: board.name || "",
      description: board.description || "",
      id: board.id,
    });
    setEditingId(board.id || null);
    setIsOpen(true);
  };

  const handleDelete = (boardId: string) => {
    boardApi
      .deleteBoard(boardId)
      .then(() => {
        messageApi.success("Board deleted");
        mutate();
      })
      .catch((err) => {
        console.error("Delete error", err);
        messageApi.error("Delete failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2F3840]">
      {contextHolder}
      <HeaderComponent />

      <Layout className="flex-1">
        <Sider className="bg-[#162032] text-white" width={250}>
          <div className="px-4 pt-1">
            <Button
              icon={<BarChartOutlined className="text-blue-500" />}
              className="bg-[#2F3840] text-white w-full flex justify-start my-4"
            >
              Boards
            </Button>
            <div className="flex items-center gap-2 text-gray-300 px-2 py-2">
              <TeamOutlined />
              <p>All members</p>
            </div>
          </div>
        </Sider>

        <Content className="px-6 pt-4 bg-[#162032]">
          <Title
            level={5}
            className="!text-white !font-normal pb-3 flex items-start"
          >
            YOUR WORKSPACES
          </Title>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading ? (
              <Spin className="flex items-center justify-center" />
            ) : (
              boards?.map((b: Board) => (
                <Card key={b.id} className="relative group">
                  <div
                    className={`text-black transition ${
                      overlayId === b.id ? "blur-sm" : "group-hover:blur-sm"
                    }`}
                  >
                    {b.name}
                  </div>

                  <div
                    className={`absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center gap-4 transition ${
                      overlayId === b.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/board/${b.id}`)}
                    />
                    <Button
                      className="hover:!bg-green-500 hover:!text-white hover:!border-none"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(b)}
                    />
                    <Popconfirm
                      title="Delete board"
                      description={
                        <p>
                          Are you sure to delete{" "}
                          <span className="font-bold">{b.name}</span>?
                        </p>
                      }
                      onConfirm={() => handleDelete(b.id ?? "")}
                      onCancel={() => setOverlayId(null)}
                      onVisibleChange={(v) =>
                        setOverlayId(v ? b.id ?? null : null)
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        className="hover:!bg-red-500 hover:!text-white hover:!border-none"
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </div>
                </Card>
              ))
            )}

            <Card
              onClick={() => setIsOpen(true)}
              className="cursor-pointer flex items-center justify-center shadow-md rounded-xl transition hover:!bg-blue-500 hover:!text-white"
            >
              <PlusOutlined className="mr-2" /> Create board
            </Card>
          </div>
        </Content>
      </Layout>

      <FooterComponent />

      <Modal
        title={editingId ? "Edit Board" : "Create Board"}
        open={isOpen}
        onOk={() => form.handleSubmit()}
        onCancel={() => setIsOpen(false)}
      >
        <FormFields fields={fields} form={form} />
      </Modal>
    </div>
  );
};

export default Homepage;
