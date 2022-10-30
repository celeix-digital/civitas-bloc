const Grant = require("../../models/grants.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const Category = require("../../models/grantCategories.model");
var randomize = require("randomatic");
const { checkDuplicate } = require("../../../config/errors");
const mongoose = require("mongoose");
// API to create a Grant
exports.create = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const rfaNo = randomize("Aa0", 10);
    payload = { ...payload, rfaNo };
    const grants = await Grant.create(payload);
    return res.send({
      success: true,
      message: "Grant created successfully",
      grants,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant");
    else return next(error);
  }
};

// API to edit a Grant
exports.edit = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const grant = await Grant.findByIdAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { new: true }
    );
    return res.send({
      success: true,
      message: "Grant Application updated successfully",
      grant,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant");
    else return next(error);
  }
};

// API to get grants list
exports.list = async (req, res, next) => {
  try {
    let { all, page, limit } = req.query;

    const filter = {};
    let { name, rfaNo, startDate, organizationId, categories } = req.query;
    console.log("actual startDate", startDate);
    if (name) {
      name = name.trim();
      filter.name = {
        $regex: name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
        $options: "i",
      };
    }
    if (rfaNo) {
      filter.rfaNo = rfaNo;
    }
    if (startDate) {
      filter.startDate = new Date(startDate);
      console.log("filter.startDate", filter.startDate);
    }
    if (organizationId) {
      filter.organizationId = ObjectId(organizationId);
    }
    if (categories) {
      filter.categories = ObjectId(categories);
    }

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    if (!all)
      limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    const total = await Grant.countDocuments({ filter });

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];

    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        image: 1,
        status: 1,
        createdAt: 1,
        description: 1,
      },
    });

    const grants = await Grant.aggregate(pipeline);

    return res.send({
      success: true,
      message: "Grant fetched successfully",
      data: {
        grants,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) <= 0 ? 1 : Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  let { id } = req.params;
  try {
    const grantDetail = await Grant.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "organziations",
          localField: "organizationId",
          foreignField: "_id",
          as: "grant",
        },
      },
      {
        $unwind: {
          path: "$grant",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "grantcategories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: {
          path: "$categories",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return res.send({
      success: true,
      message: "Get Particular Grant Details Successfully",
      grantDetail,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
// // API to list active grant categories list

exports.listActiveCategories = async (req, res, next) => {
  try {
    const activeTypes = await Category.find({ status: true });
    return res.send({
      success: true,
      message: "Active Categories listed successfully",
      activeTypes,
    });
  } catch (error) {
    return next(error);
  }
};
