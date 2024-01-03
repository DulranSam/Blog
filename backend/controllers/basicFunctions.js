const postModel = require("../models/posts");

async function GET(req, res) {
  const postsData = await postModel.find();
  res.json(postsData).status(200);
}

async function POST(req, res) {
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
}

module.exports = { GET, POST };
