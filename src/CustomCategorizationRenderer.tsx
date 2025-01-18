import React, { useState } from "react";
import { Layout, Drawer, Menu, Button } from "antd";
import { JsonFormsDispatch, JsonFormsLayoutProps, withJsonFormsLayoutProps } from "@jsonforms/react";

const { Content } = Layout;

interface Category {
  label: string;
  elements: Array<any>;
}

interface CustomCategorizationRendererProps extends JsonFormsLayoutProps {
  uischema: {
    type: string;
    elements: Category[];
  };
}

const CustomCategorizationRenderer: React.FC<CustomCategorizationRendererProps> = ({
  uischema,
  schema,
  path,
  renderers,
}) => {
  const categories = uischema.elements || [];
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleMenuClick = (category: Category) => {
    setSelectedCategory(category);
    setFormDrawerVisible(true);
  };

  return (
    <Layout>
      <Button type="primary" onClick={() => setMenuDrawerVisible(true)} style={{ margin: "16px" }}>
        Ouvrir le menu
      </Button>

      <Drawer title="Catégories" placement="left" onClose={() => setMenuDrawerVisible(false)} open={menuDrawerVisible}>
        <Menu mode="vertical">
          {categories.map((category, index) => (
            <Menu.Item key={index} onClick={() => handleMenuClick(category)}>
              {category.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>

      <Drawer
        title={selectedCategory?.label}
        placement="right"
        width={600}
        onClose={() => setFormDrawerVisible(false)}
        open={formDrawerVisible}
      >
        {selectedCategory && selectedCategory.elements.map((control, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <JsonFormsDispatch uischema={control} schema={schema} path={path} renderers={renderers} />
          </div>
        ))}
      </Drawer>
    </Layout>
  );
};

export default withJsonFormsLayoutProps(CustomCategorizationRenderer);
