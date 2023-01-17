import express from "express";
import { getProjectById, getProjectByUserId, getTasksByProject, postAddProject, postAddWorkers, 
// postAddSubtask,
postAddTask, patchUpdateProject,
// deleteTask
 } from "../controllers/projects-controllers.js";
import fileUpload from "../middleware/file-upload.js";
const projectRouter = express.Router();
// projectRouter.use(authRequest);
//routes with token protection
projectRouter.get("/:projectId", getProjectById);
projectRouter.get("/:userId", getProjectByUserId);
projectRouter.get("/:projectId", getTasksByProject);
projectRouter.post("/add-project", fileUpload.single('image'), postAddProject);
projectRouter.post("/add-task", postAddTask);
projectRouter.post("/add-workers", postAddWorkers);
projectRouter.patch("/:projectId", patchUpdateProject);
// projectRouter.patch("/:projectId/:tid", patchUpdateTask);
// projectRouter.patch("/:projectId/:tid", putUpdateSubtasks);
// projectRouter.delete("/:projectId", deleteProject);
// projectRouter.delete("/:projectId", deleteTask);
export default projectRouter;
//# sourceMappingURL=projects-routes.js.map