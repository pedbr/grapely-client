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
  getBatchById: (batchId: string) => `/container/${batchId}`,
  getContainerBatches: (containerId: string) =>
    `/batch/container/${containerId}`,
  addBatch: '/batch/add',
  editBatch: (batchId: string) => `/batch/edit/${batchId}`,
  deleteBatch: (batchId: string) => `/batch/delete/${batchId}`,

  //--------------TASK ROUTES-------------//
  getTasks: '/task',
  getWineryTasks: (wineryId: string) => `/task/winery/${wineryId}`,
  getContainerTasks: (containerId: string) => `/task/container/${containerId}`,
  getBatchTasks: (batchId: string) => `/task/batch/${batchId}`,
  addTask: '/task/add',
  editTask: (taskId: string) => `/task/edit/${taskId}`,
  deleteTask: (taskId: string) => `/task/delete/${taskId}`,

  //--------------NOTE ROUTES-------------//
  getWineryNotes: (wineryId: string) => `/note/winery/${wineryId}`,
  getContainerNotes: (containerId: string) => `/note/container/${containerId}`,
  getBatchNotes: (batchId: string) => `/note/batch/${batchId}`,
  getTaskNotes: (taskId: string) => `/note/task/${taskId}`,
  addNote: '/note/add',
  editNote: (noteId: string) => `/note/edit/${noteId}`,
  deleteNote: (noteId: string) => `/note/delete/${noteId}`,
}
