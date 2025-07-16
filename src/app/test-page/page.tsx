import { TestPage } from '@/views/TestPage/TestPage';
import { TanstackView } from '@/views/TanstackTest/Tanstack';
import { PostTestView } from '@/views/AxiosApiTest/PostTest';
import { PatchTestView } from '@/views/AxiosApiTest/PatchTest';
import { PutTestView } from '@/views/AxiosApiTest/PutTest';
import { DeleteTestView } from '@/views/AxiosApiTest/DeleteTest';

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
