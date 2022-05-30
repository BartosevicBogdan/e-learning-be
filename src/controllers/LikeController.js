const {
  AddLikeDB,
  lecturesLikesDB,
  changeLikeDB,
} = require('../models/LikeModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function invertLike(req, res) {
  const { LectureID, UserID } = req.body;

  const DataToTransmit = {
    Count: 0,
    Clicked: false,
  };

  const dbResponseInJS = await lecturesLikesDB(LectureID);

  const count = dbResponseInJS.filter((el) => el.Clicked === 1);

  DataToTransmit.Count = count.length;
  const userClick = dbResponseInJS.find((el) => UserID === el.UserID); //find User

  if (!dbResponseInJS && !userClick) {
    const toLike = await AddLikeDB({ LectureID, UserID });

    DataToTransmit.Count = 1;
    DataToTransmit.Clicked = true;

    return toLike.affectedRows && successResponce(res, DataToTransmit);
  }

  if (dbResponseInJS && userClick) {
    DataToTransmit.Clicked = !userClick.Clicked;

    DataToTransmit.Count = DataToTransmit.Clicked
      ? ++DataToTransmit.Count
      : --DataToTransmit.Count;

    const dataToPass = {
      Cliked: !userClick.Clicked,
      UserID,
      LectureID,
    };

    const changeResponse = await changeLikeDB(dataToPass);
    return (
      changeResponse.affectedRows === 1 && successResponce(res, DataToTransmit)
    );
  } else {
    DataToTransmit.Count++;
    DataToTransmit.Clicked = true;

    const toLike = await AddLikeDB({ LectureID, UserID });
    return toLike.affectedRows === 1 && successResponce(res, DataToTransmit);
  }
}

module.exports = {
  invertLike,
};
