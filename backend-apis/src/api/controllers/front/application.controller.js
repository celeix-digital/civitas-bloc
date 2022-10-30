const GrantApplication = require("../../models/grantApplication.model");
const GrantApplicationResource = require("../../models/grantApplicationResource.model");
var randomize = require("randomatic");
const { checkDuplicate } = require("../../../config/errors");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
// API to create a Grant Application
exports.create = async (req, res, next) => {
  try {
    let payload = req.body;
    const grantApplication = await GrantApplication.create(payload);
    if (req.files) {
      let resources = [];
      for (const key in req.files) {
        let currrentFile = req.files[key];
        let mimeType = currrentFile.mimetype;
        let type = 0;
        if (mimeType.includes("image")) {
          type = 1;
        } else if (mimeType.includes("pdf")) {
          type = 2;
        }
        if (type) {
          let resource = {
            type,
            grantApplicationId: grantApplication._id,
            status: 0,
            file: currrentFile.filename,
          };
          resources.push(resource);
          console.log("resources", resources);
        }
        if (resources.length)
          await GrantApplicationResource.insertMany(resources);
      }
    }
    const applicationNumber = randomize("Aa0", 10);
    grantApplication.applicationNumber = applicationNumber;
    await grantApplication.save();
    return res.send({
      success: true,
      message: "Grant Application created successfully",
      grantApplication,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant");
    else return next(error);
  }
};

// API to edit Grant Application
exports.edit = async (req, res, next) => {
  try {
    let payload = req.body;
    if (!payload._id) {
      return res.send({
        success: false,
        message: "",
      });
    }
    if (req.files)
      for (const key in req.files) {
        const applicationLogo = req.files[key][0];
        payload[`${key}`] = applicationLogo.filename;
      }
    const grantApplication = await GrantApplication.findByIdAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { new: true }
    );
    return res.send({
      success: true,
      message: "Grant Application updated successfully",
      grantApplication,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// API to get Grant Application
exports.list = async (req, res, next) => {
  try {
    let { all, page, limit } = req.query;

    const filter = {};
    let { grantId, applicantId, organizationId, status } = req.query;
    if (grantId) {
      console.log("zain");
      filter.grantId = ObjectId(grantId);
    }
    if (applicantId) {
      filter.applicantId = ObjectId(applicantId);
    }
    if (organizationId) {
      filter.organizationId = ObjectId(organizationId);
    }
    if (status) {
      filter.status = parseInt(status);
    }
    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    if (!all)
      limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    const total = await GrantApplication.countDocuments({ filter });

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];

    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }

    pipeline.push(
      {
        $lookup: {
          from: "grantapplicationresources",
          localField: "_id",
          foreignField: "grantApplicationId",
          as: "resources",
        },
      },
      {
        $unwind: {
          path: "$resources",
          preserveNullAndEmptyArrays: true,
        },
      }
    );

    const grants = await GrantApplication.aggregate(pipeline);

    return res.send({
      success: true,
      message: "Grant Application fetched successfully",
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

// API to get particular Grant Application Detail
exports.get = async (req, res, next) => {
  let { id } = req.params;
  try {
    const grantApplicationDetail = await GrantApplication.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "grants",
          localField: "grantId",
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
          from: "users",
          localField: "applicantId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "organziations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $unwind: {
          path: "$organization",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return res.send({
      success: true,
      message: "Get Grant Application Successfully",
      grantApplicationDetail,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// API to get Grant Application Resources
exports.listApplicationResources = async (req, res, next) => {
  let { id } = req.params;
  console.log("grantApplicationId", id);
  try {
    let applicationResources = await GrantApplicationResource.aggregate([
      {
        $match: {
          grantApplicationId: mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          file: 1,
          type: 1,
          status: 1,
        },
      },
    ]);
    return res.send({
      success: true,
      message: "Application Resources fetched Successfully",
      applicationResources,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
