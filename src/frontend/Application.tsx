import { useRouter } from "router6-react";
import { CraqReactReduxProvider } from "craq-react-redux";
import { Context } from "craq";
import { ComponentType } from "react";
import { Route } from "router6";

const NoPage = () => <div>No page</div>;

const Application = ({ context }: { context: Context<any, any> }) => {
  const { currentRoute } = useRouter();

  const PageComponent =
    context.getComponent<ComponentType<{ route: Route }>>(
      currentRoute.config.page,
      "page"
    ) || NoPage;

  return (
    <CraqReactReduxProvider store={context.getStore()}>
      <PageComponent route={currentRoute} />
    </CraqReactReduxProvider>
  );
};

export default Application;
