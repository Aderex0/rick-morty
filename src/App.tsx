import BasicLayout from "./component_lib/layout/BasicLayout";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import ListCharacters from "./features/ListCharacters";
import { Routes, Route } from "react-router-dom";
import DisplayCharacter from "./features/DisplayCharacter";

import LIST_CHARACTERS from "./api/queries/listCharacters";

const App = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery(LIST_CHARACTERS, { variables: { page } });

  return (
    <BasicLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ListCharacters
              characters={data?.characters}
              error={error}
              loading={loading}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route path="/character/:id" element={<DisplayCharacter lastPage={data?.characters?.info?.count} />} />
      </Routes>
    </BasicLayout>
  );
};

export default App;
