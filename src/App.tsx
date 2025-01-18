import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import schema1 from "./data/schema.json";
import uischema1 from "./data/uiShema.json";
import data1 from "./data/data.json";
import schema2 from "./data/schema2.json";
import uischema2 from "./data/uischema2.json";
import data2 from "./data/data2.json";
import schema3 from "./data/schema3.json";
import uischema3 from "./data/uischema3.json";
import data3 from "./data/data3.json";
import schema4 from "./data/schema4.json";
import uischema4 from "./data/uischema4.json";
import data4 from "./data/data4.json";
import schema5 from "./data/schema5.json";
import uischema5 from "./data/uischema5.json";
import data5 from "./data/data5.json";
import "./App.css";

const { Header, Content } = Layout;

interface Category {
  label: string;
  elements: any[];
}

interface FormSet {
  title: string;
  categories: Category[];
}

const formSets: FormSet[] = [
  {
    title: "Set 1",
    categories: [
      {
        label: "Catégorie 1",
        elements: [
          { key: "form1", label: "Formulaire 1", schema: schema1, uischema: uischema1, data: data1 },
          { key: "form2", label: "Formulaire 2", schema: schema2, uischema: uischema2, data: data2 }
        ]
      },
      {
        label: "Catégorie 2",
        elements: [
          { key: "form3", label: "Formulaire 3", schema: schema3, uischema: uischema3, data: data3 }
        ]
      }
    ]
  },
  {
    title: "Set 2",
    categories: [
      {
        label: "Catégorie A",
        elements: [
          { key: "form4", label: "Formulaire 4", schema: schema4, uischema: uischema4, data: data4 }
        ]
      },
      {
        label: "Catégorie B",
        elements: [
          { key: "form5", label: "Formulaire 5", schema: schema5, uischema: uischema5, data: data5 }
        ]
      }
    ]
  }
];

const App: React.FC = () => {
  const defaultForm = formSets[0]?.categories[0]?.elements[0] || { key: "", label: "", schema: {}, uischema: {}, data: {} };
  const [activeForm, setActiveForm] = useState(defaultForm);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleMenuClick = (category: Category) => {
    setSelectedCategory(category);
    setFormDrawerVisible(true);
  };

  const handleFormClick = (form: any) => {
    setActiveForm(form);
    setDrawerVisible(false);
    setFormDrawerVisible(false);
  };

  return (
    <Layout className="layout">
      <Drawer title="Catégories" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {formSets.map(set => (
          <div key={set.title}>
            <h3>{set.title}</h3>
            {set.categories.map((category, index) => (
              <Button key={index} block onClick={() => handleMenuClick(category)}>
                {category.label}
              </Button>
            ))}
          </div>
        ))}
      </Drawer>

      <Drawer
        title={selectedCategory?.label}
        placement="right"
        width={600}
        onClose={() => setFormDrawerVisible(false)}
        open={formDrawerVisible}
      >
        {selectedCategory && selectedCategory.elements.map((form, index) => (
          <Button key={index} block onClick={() => handleFormClick(form)}>
            {form.label}
          </Button>
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
