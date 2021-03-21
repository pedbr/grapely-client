export default {
  //--------------AUTH ROUTES-------------//
  signUp: '/signup',
  login: '/login',

  //--------------USER ROUTES-------------//
  getUser: '/user',
  editUser: '/user/edit',
  getUserWineries: '/user/wineries',

  //--------------WINERY ROUTES-------------//
  getWineries: '/winery',
  addWinery: '/winery/add',
  getWineryById: (wineryId: string) => `/winery/${wineryId}`,
  editWinery: (wineryId: string) => `/winery/edit/${wineryId}`,
  deleteWinery: (wineryId: string) => `/winery/delete/${wineryId}`,

  //--------------CONTAINER ROUTES-------------//
  getContainers: '/container',
  getContainerById: (containerId: string) => `/container/${containerId}`,
  getWineryContainers: (wineryId: string) => `/container/winery/${wineryId}`,
  addContainer: '/container/add',
  editContainer: (containerId: string) => `/container/edit/${containerId}`,
  deleteContainer: (containerId: string) => `/container/delete/${containerId}`,

  //--------------BATCH ROUTES-------------//
  getBatches: '/batch',
  getBatchById: (batchId: string) => `/batch/${batchId}`,
  getContainerBatches: (containerId: string) =>
    `/batch/container/${containerId}`,
  addBatch: '/batch/add',
  editBatch: (batchId: string) => `/batch/edit/${batchId}`,
  deleteBatch: (batchId: string) => `/batch/delete/${batchId}`,

  //--------------TASK ROUTES-------------//
  getTasks: '/task',
  getTaskById: (taskId: string) => `/task/${taskId}`,
  getParentTasks: (parentId: string) => `/task/parent/${parentId}`,
  addTask: '/task/add',
  editTask: (taskId: string) => `/task/edit/${taskId}`,
  deleteTask: (taskId: string) => `/task/delete/${taskId}`,

  //--------------NOTE ROUTES-------------//
  getNoteById: (noteId: string) => `/note/${noteId}`,
  getParentNotes: (parentId: string) => `/note/parent/${parentId}`,
  addNote: '/note/add',
  editNote: (noteId: string) => `/note/edit/${noteId}`,
  deleteNote: (noteId: string) => `/note/delete/${noteId}`,
}
