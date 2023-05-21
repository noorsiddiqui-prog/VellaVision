const Post = require("../Model/view");

//creting Api
const createApi = async (req, res) => {
  console.log(req.file, req.body, 16);
  try {
    const { title, description, postType, date, comment } = req.body;
    // const image = req.file.filename; // it will give only file name
    const image = req.file.path; // it will give whole file path and name
    if (!title || !description || !image) {
      return res.send({ code: 400, message: "Bad request" });
    }
    const form = await Post({ title, description, postType, date, image });
    await form.save();
    res.send(form);
  } catch (error) {
    console.log(error);
  }
};

const showApis = async (req, res) => {
  Post.find((err, used) => {
    if (err) {
      res.status(500).json("API fAILED");
    } else {
      res.status(200).json(used);
    }
  });
};
const showApi = async (req, res) => {
  Post.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Post with id " + req.params.id,
      });
    });
};

const DeleteApi = async (req, res) => {
  const id = req.params.id;
  Post.findByIdAndRemove(id, (err, used) => {
    if (err) {
      console.log("Api failed to delete");
    } else {
      res.status(200).send(used);
    }
  });
};

//get api to update
const editApi = async (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, used) => {
    if (err) {
      console.log("Api failed to get");
    } else {
      res.status(200).send(used);
    }
  });
};
// const updateApi = async (req, res) => {
//   // Validate Request
//   //   if (!req.body.content) {
//   //     return res.status(400).send({
//   //       message: "Post content can not be empty",
//   //     });
//   //   }

//   // Find Post and update it with the request body
//   Post.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title || "Untitled Post",
//       description: req.body.description,
//       postType: req.body.postType,
//       comment: req.body.comment,
//       image: req.body.image,
//     },
//     { new: true }
//   )
//     .then((note) => {
//       if (!note) {
//         return res.status(404).send({
//           message: "Post not found with id " + req.params.id,
//         });
//       }
//       res.send(note);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Post not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error updating Post with id " + req.params.id,
//       });
//     });
// };
const updateApi = async (req, res) => {
  const id = req.params.id;

  const body = req.body;

  console.log("body:", body);
  console.log("req:", req);

  const updates = {
    title: req.body.title || "Untitled Post",
    description: req.body.description,
    postType: req.body.postType,
    comment: req.body.comment,
    //   image: req.body.image,
  };

  if (req.file) {
    const image = req.file.filename;
    updates.image = image;
  }

  Post.findOneAndUpdate(
    id,
    {
      $set: updates,
    },
    {
      new: true,
    }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating Post with id " + req.params.id,
      });
    });
};

module.exports = {
  createApi,
  showApis,
  showApi,
  DeleteApi,
  editApi,
  updateApi,
};
