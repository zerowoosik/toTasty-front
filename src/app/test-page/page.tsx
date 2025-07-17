import { TestPage } from '@/views/test-page/TestPage';
import { TanstackView } from '@/views/tanstack-test/Tanstack';
import { PostTestView } from '@/views/axios-api-test/PostTest';
import { PatchTestView } from '@/views/axios-api-test/PatchTest';
import { PutTestView } from '@/views/axios-api-test/PutTest';
import { DeleteTestView } from '@/views/axios-api-test/DeleteTest';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <TestPage />
      <h2>
        <b>------------tanstack, axios get test--------------</b>
      </h2>
      <TanstackView />
      <h2>
        <b>------------tanstack, axios post test--------------</b>
      </h2>
      <PostTestView />
      <h2>
        <b>------------tanstack, axios patch test--------------</b>
      </h2>
      <PatchTestView />
      <h2>
        <b>------------tanstack, axios put test--------------</b>
      </h2>
      <PutTestView />
      <h2>
        <b>------------tanstack, axios delete test--------------</b>
      </h2>
      <DeleteTestView />
    </div>
  );
}
