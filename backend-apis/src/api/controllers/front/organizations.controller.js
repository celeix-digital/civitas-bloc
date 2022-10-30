const Organization = require("../../models/organization.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { checkDuplicate } = require("../../../config/errors");
const OrganizationType = require("../../models/organizationType.model");
const mongoose = require("mongoose");

// API to create Organization
exports.create = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }

    const organization = await Organization.create(payload);
    return res.send({
      success: true,
      message: "Organization created successfully",
      organization,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Organization");
    else return next(error);
  }
};

// API to edit Organization
exports.edit = async (req, res, next) => {
  try {
    let payload = req.body;
    if (!payload._id) {
      return res.send({
        success: false,
        message: "Organization id required",
      });
    }
    if (req.files)
      for (const key in req.files) {
        const logo = req.files[key][0];
        payload[`${key}`] = logo.filename;
      }
    const organization = await Organization.findByIdAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { new: true }
    );
    return res.send({
      success: true,
      message: "Organization updated successfully",
      organization,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// API to get Organization list
exports.list = async (req, res, next) => {
  try {
    let { all, page, limit } = req.query;

    const filter = {};
    let { name, walletAddress, type, createdBy, zip } = req.query;

    if (name) {
      name = name.trim();
      filter.name = {
        $regex: name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
        $options: "i",
      };
    }
    if (walletAddress) {
      filter.walletAddress = walletAddress;
    }
    if (type) {
      filter.type = ObjectId(type);
    }
    if (createdBy) {
      filter.createdBy = ObjectId(createdBy);
    }
    if (zip) {
      filter.zip = zip;
    }

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    if (!all)
      limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    const total = await Organization.countDocuments({ filter });

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];

    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }

    const organization = await Organization.aggregate(pipeline);

    return res.send({
      success: true,
      message: "Organizations fetched successfully",
      data: {
        organization,
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

// API to get particular Organization detail
exports.get = async (req, res, next) => {
  let { id } = req.params;

  try {
    let organizationDetail = await Organization.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          type: 1,
          logo: 1,
          websiteAboutOrganization: 1,
          serviceProvided: 1,
          walletAddress: 1,
          createdBy: 1,
          city: 1,
          userName: "$creator.name",
        },
      },
    ]);
    return res.send({
      success: true,
      message: "Get Organization Detail Successfully",
      organizationDetail,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// API to list Active Organization Type

exports.listOrganizationTypes = async (req, res, next) => {
  try {
    const activeTypes = await OrganizationType.find({ status: true });
    return res.send({
      success: true,
      message: "Active Organization Type listed successfully",
      activeTypes,
    });
  } catch (error) {
    return next(error);
  }
};
