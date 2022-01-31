const createJob = async (req, res) => {
  res.send("create job");
};
const deleteJob = async (req, res) => {
  res.send("delete job");
};
const getAllJob = async (req, res) => {
  res.send("all job");
};
const updateJob = async (req, res) => {
  res.send("update job");
};
const showStats = async (req, res) => {
  res.send("show stats of job");
};

export { createJob, deleteJob, getAllJob, updateJob, showStats };
