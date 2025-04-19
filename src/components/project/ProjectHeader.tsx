
import { ProjectCreateDialog } from "./ProjectCreateDialog";

export const ProjectHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ProjectCreateDialog />
    </div>
  );
};
