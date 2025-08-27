import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, Button, Modal, message } from "antd";
import { PlusOutlined, EditFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { cardApi } from "../../../services/CardService";
import { TCard } from "../../../helpers/types/card";
import { FieldConfig } from "../../../components/FormComponent/fieldConfig";
import { FORM_TYPE } from "../../../components/FormComponent/formType";
import { FormFields } from "../../../components/FormComponent";

import "./style.css";

type Props = {
  name?: string;
  label?: string;
};

export const ListComponent = ({ name, label }: Props) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: cards = [] } = useQuery<TCard[]>({
    queryKey: ["cards", boardId, name],
    queryFn: () =>
      cardApi.getAllCardsByStatus(boardId!, name!).then((r) => r.data),
    enabled: Boolean(boardId && name),
  });

  const mutation = useMutation({
    mutationFn: (values: TCard & { status: string; id?: string }) => {
      if (values.id) {
        return cardApi.updateCard(values, boardId!, values.id);
      }
      return cardApi.createCard(values, boardId!);
    },
    onSuccess: () => {
      messageApi.success(editingId ? "Card updated" : "Card created");
      queryClient.invalidateQueries({ queryKey: ["cards", boardId, name] });
      form.resetForm();
      setEditingId(null);
      setModalOpen(false);
    },
    onError: () => {
      messageApi.error(editingId ? "Update failed" : "Create failed");
    },
  });

  const form = useFormik<TCard>({
    initialValues: { name: "", description: "" },
    validationSchema: yup.object({
      name: yup.string().required("Card name is required"),
    }),
    onSubmit: () => {
      mutation.mutate({
        id: editingId || undefined,
        status: name!,
        name: form.values.name,
        description: form.values.description,
      });
    },
  });

  const fieldConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Card name",
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

  return (
    <div>
      {contextHolder}
      <Card className="bg-[#334155] shadow-md rounded-xl">
        <p className="text-white font-semibold mb-3 text-lg">{label}</p>

        <div className="grid gap-2">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="shadow-sm hover:shadow-md transition w-full cursor-pointer"
              bodyStyle={{ padding: "8px 12px" }}
              onClick={() =>
                navigate(`/card/${card.id}`, { state: { boardId } })
              }
            >
              <div className="flex justify-between items-center">
                <p className="m-0 font-medium text-gray-800 truncate">
                  {card.name}
                </p>
                <Button
                  size="small"
                  type="text"
                  icon={<EditFilled />}
                  className="hover:!bg-green-500 hover:!text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(card.id ?? null);
                    form.setValues({
                      name: card.name,
                      description: card.description,
                    });
                    setModalOpen(true);
                  }}
                />
              </div>
            </Card>
          ))}

          <Card
            onClick={() => {
              setEditingId(null);
              form.resetForm();
              setModalOpen(true);
            }}
            className="!h-10 cursor-pointer flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 border-dashed border-2 rounded-lg"
            bodyStyle={{ padding: "4px" }}
          >
            <PlusOutlined /> <span>Add a card</span>
          </Card>
        </div>
      </Card>

      <Modal
        title={editingId ? "Edit Card" : "Create Card"}
        open={modalOpen}
        okText={editingId ? "Update" : "Create"}
        onOk={form.submitForm}
        onCancel={() => {
          form.resetForm();
          setEditingId(null);
          setModalOpen(false);
        }}
      >
        <FormFields fields={fieldConfig} form={form} />
      </Modal>
    </div>
  );
};
