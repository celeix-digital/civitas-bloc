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
    console.log("payload grants", payload);
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const rfaNo = randomize("Aa0", 10);
    payload = { ...payload, rfaNo };
    const grants = await Grant.create(payload);

    // grants.draftPublish = true; // draft publish

    await grants.save();
    console.log("grantscreated", grants);
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
    let { name, rfaNo, startDate, endDate, organizationId, categories } =
      req.query;
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

    // if (endDate) {
    //   filter.endDate = new Date(endDate);
    //   console.log("filter.endDate", filter.endDate);
    // }
    if (organizationId) {
      filter.organizationId = ObjectId(organizationId);
    }
    if (categories) {
      filter.categories = ObjectId(categories);
    }

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    console.log("page", page);

    if (!all)
      limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;
    console.log("limit", limit);

    const total = await Grant.countDocuments({ filter });
    console.log("total", total);
    console.log("Math.ceil", Math.ceil(total / limit));
    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];
    console.log("pipeline", pipeline);
    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }
    // pipeline.push({
    //   $project: {
    //     _id: 1,
    //     name: 1,
    //     image: 1,
    //     startDate:1,
    //     endDate:1,
    //     status: 1,
    //     createdAt: 1,
    //   },
    // });
    const grants = await Grant.aggregate(pipeline);
    console.log("grants", grants);
    var currentDate = new Date();
    const length = Object.keys(grants).length;
    console.log("length", length);
    for (let i = 0; i < Object.keys(grants).length; i++) {
      if (
        grants[i]?.startDate <= currentDate &&
        grants[i]?.endDate >= currentDate
      ) {

        console.log(i);
        const obj = { grantStatus: "InProgress" };
        grants.splice(i + 1, 0, obj);
      }
      if (
        grants[i]?.startDate <= currentDate &&
        grants[i]?.endDate <= currentDate
      ) {
        console.log(i);
        const obj = { grantStatus: "Pending" };
        grants.splice(i + 1, 0, obj);
      }
      if (
        grants[i]?.startDate >= currentDate &&
        grants[i]?.endDate >= currentDate
      ) {
        console.log(i);
        const obj = { grantStatus: "Closed" };
        grants.splice(i + 1, 0, obj);
      }
    }
    console.log("grants", grants);
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

// API - Get Particular Grant Details
exports.get = async (req, res, next) => {
  try {
    let { id } = req.params;
    console.log("id", id);
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
      {
        $project: {
          grantCustomFields: 1,
          draftPublish: 1,
          name: 1,
          executiveSummary: 1,
          eligibilityCriteria: 1,
          submissionDeadline: 1,
          questionsDeadline: 1,
          startDate: 1,
          durationTotal: 1,
          maxBudget: 1,
          endDate: 1,
          image: 1,
          rfaNo: 1,
          grantName: "$grant.name",
          websiteAboutOrganization: "$grant.websiteAboutOrganization",
          serviceProvided: "$grant.serviceProvided",
          walletAddress: "$grant.walletAddress",
          logo: "$grant.logo",
          categoryName: "$categories.name",
          categoryDescription: "$categories.description",
          categoryImage: "$categories.image",
          // mongoose function
          grantStatus: {
            $function: {
              body: function (startDate, endDate) {
                var currentDate = new Date();
                if (startDate <= currentDate && endDate >= currentDate) {
                  return `InProgress`;
                }
                if (startDate <= currentDate && endDate <= currentDate) {
                  return `Pending`;
                }
                if (startDate >= currentDate && endDate >= currentDate) {
                  return `Closed`;
                }
              },
              args: ["$startDate", "$endDate"],
              lang: "js",
            },
          },
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
// API to fetch the Draft Grants schema.
exports.getDraftGrants = async (req, res, next) => {
  const fetchDraftGrants = await Grant.find({ published: false });
  console.log("fetchDraftGrants", fetchDraftGrants);
  return res.send({
    success: true,
    message: "Get Draft Grants Successfully",
    fetchDraftGrants,
  });
};
// API to fetch the publish Draft schema.
exports.publishDraft = async (req, res, next) => {
  let { id } = req.params;
  console.log("id", id);
  const publishDrafts = await Grant.findByIdAndUpdate(
    id,
    { published: true },
    function (err, publishDraft) {
      if (err) {
        return res.json({ status: false, message: "Invalid request" });
      } else {
        console.log("Updated drafts : ", publishDraft);
      }
    }
  );
  console.log("publishDrafts", publishDrafts);
  return res.send({
    success: true,
    message: "publish drafts Successfully",
    publishDrafts,
  });
};
