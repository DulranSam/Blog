const express = require("express");
const router = express.Router();
const postModel = require("../models/posts");

router
  .route("/")
  .get(async (req, res) => {
    const postsData = await postModel.find();
    res.json(postsData).status(200);
  })
  .post(async (req, res) => {
    const { title, description, link, photo } = req?.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ Alert: "Post requires title AND description " });

    const checkElig = await postModel.findOne({
      $or: [{ link: link }, { title: title }],
    }); //if either is already present cannot make post

    if (!checkElig) {
      const newPost = new postModel({
        title,
        description,
        link,
        image: photo,
      });

      await newPost.save();

      return res.status(201).json({ Alert: `Post ${title} created` });
    } else {
      return res
        .status(409)
        .json({ Alert: `Post ${title} or ${link} already added` });
    }
  });

router.route("/:id").delete(async (req, res) => {
  const { id } = req?.params;
  const convertedID = String(id);

  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const checkElig = await postModel.findOne({ _id: convertedID }); //check if ID exists

  if (!checkElig) {
    return res.status(409).json({ Alert: `ID ${id} invalid` });
  } else {
    await checkElig.deleteOne(); //deletes id
    return res.status(200).json({ Alert: `${id} Deleted!` });
  }
});

module.exports = router;
