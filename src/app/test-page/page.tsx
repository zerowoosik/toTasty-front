import { TestPage } from '@/views/test-page/TestPage';
import {
  GetDetailTestView,
  GetListTestView,
  PostTestView,
  PatchTestView,
  PutTestView,
  DeleteTestView,
} from '@/views/axios-api-test/index';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <TestPage />
      <h2>
        <b>------------axios get List test--------------</b>
      </h2>
      <GetListTestView />
      <h2>
        <b>------------axios get detail test--------------</b>
      </h2>
      <GetDetailTestView />
      <h2>
        <b>------------axios post test--------------</b>
      </h2>
      <PostTestView />
      <h2>
        <b>------------axios patch test--------------</b>
      </h2>
      <PatchTestView />
      <h2>
        <b>------------axios put test--------------</b>
      </h2>
      <PutTestView />
      <h2>
        <b>------------axios delete test--------------</b>
      </h2>
      <DeleteTestView />
    </div>
  );
}
