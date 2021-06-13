import { CreateProfileBreadCrumb } from "../../components/Breadcrumbs";
import DefaultAppBar from "../../components/DefaultAppBar";

export default function CreateProfileView() {
  return (
    <div>
      {DefaultAppBar("Bob", CreateProfileBreadCrumb())}
    </div>
  );
}