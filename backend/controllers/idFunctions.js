const postModel = require("../models/posts");

async function GET(req, res) {
  const { id } = req?.params;

  const convertedID = id.toString();
  const data = await postModel.findOne({ _id: convertedID });

  if (!data) {
    return res.status(400).json({ Alert: "No Data Found, ID invalid" });
  } else {
    return res.status(200).json(data);
  }
}

async function DELETE(req, res) {
  const { id } = req?.params;
  const convertedID = String(id);

  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const checkElig = await postModel.findOne({ _id: convertedID }); //check if ID exists

  if (!checkElig) {
    return res.status(409).json({ Alert: `ID ${id} invalid` });
  } else {
    await checkElig.deleteOne();
    return res.status(200).json({ Alert: `${id} Deleted!` });
  }
}

async function PUT(req, res) {
  const { id } = req?.params;
  const convertedID = String(id);

  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const checkElig = await postModel.findOne({ _id: convertedID }); //check if ID exists

  if (!checkElig) {
    return res.status(409).json({ Alert: `ID ${id} invalid` });
  } else {
    await checkElig.updateOne();
    return res.status(200).json({ Alert: `${id} Updated!` });
  }
}

module.exports = { GET, DELETE, PUT };
