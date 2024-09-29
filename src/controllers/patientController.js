import patientService from "../services/patientService";

let postBookAppoinment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppoinment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "ERROR",
    });
  }
};

let postVerifyBookAppoinment = async (req, res) => {
  try {
    let infor = await patientService.postVerifyBookAppoinment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "ERROR",
    });
  }
};
module.exports = {
  postBookAppoinment: postBookAppoinment,
  postVerifyBookAppoinment: postVerifyBookAppoinment,
};
