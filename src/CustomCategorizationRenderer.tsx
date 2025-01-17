
import { Layout, Tabs } from 'antd';
import { JsonFormsDispatch, JsonFormsLayoutProps, withJsonFormsLayoutProps } from '@jsonforms/react';

const { TabPane } = Tabs;

// Définir les types pour les catégories dans uischema
interface Category {
  label: string;
  elements: Array<any>; // Les éléments peuvent être des sous-uischema ou des contrôles
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
  const categorization = uischema; // Extraction des catégories depuis uischema
  const categories = categorization.elements || [];

  return (
    <Layout>
      <Tabs>
        {categories.map((category, index) => (
          <TabPane tab={category.label} key={index}>
            {category.elements.map((control, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                {/* JsonFormsDispatch s'occupe de rendre les champs selon leur définition */}
                <JsonFormsDispatch
                  uischema={control}
                  schema={schema}
                  path={path}
                  renderers={renderers}
                />
              </div>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </Layout>
  );
};

// Exporter le composant avec le HOC `withJsonFormsLayoutProps`
export default withJsonFormsLayoutProps(CustomCategorizationRenderer);
