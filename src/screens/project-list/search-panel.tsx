import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../types/project";

interface SearchPanelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => (
  <Form layout="inline" style={{ marginBottom: "2rem" }}>
    <Form.Item>
      <Input
        type="text"
        placeholder="项目名"
        value={param.name}
        onChange={(evt) => setParam({ ...param, name: evt.target.value })}
      />
    </Form.Item>
    <Form.Item>
      <UserSelect
        defaultOptionName={"负责人"}
        value={param.personId}
        onChange={(value) => setParam({ ...param, personId: value })}
      />
    </Form.Item>
  </Form>
);
