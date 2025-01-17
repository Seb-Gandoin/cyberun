
  import React, { useState } from "react";
  import { Layout, Drawer, Menu, Button } from "antd";
  import { JsonForms } from "@jsonforms/react";
  import { materialRenderers } from "@jsonforms/material-renderers";
  import schema1 from "./data/schema.json";
  import uischema1 from "./data/uiShema.json";
  import data1 from "./data/data.json";
  import schema2 from "./data/schema2.json";
  import uischema2 from "./data/uischema2.json";
  import data2 from "./data/data2.json";
  import "./App.css";
  
  const { Header, Content } = Layout;
  
  // Définition des types
  interface Form {
    key: string;
    label: string;
    schema: object;
    uischema: object;
    data: object;
  }
  
  interface FormSet {
    title: string;
    forms: Form[];
  }

  const formSets: FormSet[] = [
    {
      title: "Set 1",
      forms: [
        { key: "form1", label: "Formulaire 1", schema: schema1, uischema: uischema1, data: data1 },
        { key: "form2", label: "Formulaire 2", schema: schema2, uischema: uischema2, data: data2 }
      ]
    }
  ];
  
  const App: React.FC = () => {
    const defaultForm = formSets[0]?.forms[0] || { key: "", label: "", schema: {}, uischema: {}, data: {} };
    const [activeForm, setActiveForm] = useState<Form>(defaultForm);
    const [drawerVisible, setDrawerVisible] = useState(false);
  
    const handleMenuClick = (e: { key: string }) => {
      const selectedForm = formSets.flatMap(set => set.forms).find(form => form.key === e.key);
      if (selectedForm) {
        setActiveForm(selectedForm);
        setDrawerVisible(false);
      }
    };
  
    return (
      <Layout className="layout">
        <Drawer title="Dynamic Form Management" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
          {formSets.map(set => (
            <Menu key={set.title} mode="inline" className="menu" onClick={handleMenuClick}>
              <Menu.ItemGroup key={set.title} title={set.title}>
                {set.forms.map(form => (
                  <Menu.Item key={form.key}>{form.label}</Menu.Item>
                ))}
              </Menu.ItemGroup>
            </Menu>
          ))}
        </Drawer>
  
        <Layout>
          <Header className="header">
            <Button type="primary" className="button" onClick={() => setDrawerVisible(true)}>
              Ouvrir le menu
            </Button>
          </Header>
  
          <Content className="content">
            <JsonForms
              schema={activeForm.schema}
              uischema={activeForm.uischema}
              data={activeForm.data}
              renderers={materialRenderers}
            />
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default App;