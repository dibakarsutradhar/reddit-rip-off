import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const EditPost = ({}) => {
  return <div>hello</div>;
};

export default withUrqlClient(createUrqlClient)(EditPost);
