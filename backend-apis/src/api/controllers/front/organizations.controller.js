const Organization = require("../../models/organization.model");
const User = require("../../models/user.model");
const OrganizationJoinInvite = require("../../models/organizationJoinInvite.model");
const OrganizationJoinRequest = require("../../models/organizationJoinRequest.model");
const UserOrganization = require("../../models/userOrganization.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { checkDuplicate } = require("../../../config/errors");
const OrganizationType = require("../../models/organizationType.model");
const mongoose = require("mongoose");
const { sendEmail } = require("./../../utils/emails");

// API to create Organization
exports.create = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    // organizationCode

    const organization = await Organization.create(payload);
    const organizationCode = randomize("Aa0", 6);
    organization.organizationCode = organizationCode;
    await organization.save();
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
    // if (createdBy) {
    //   filter.createdBy = ObjectId(createdBy);
    // }
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
          from: "organizationtypes", // users
          localField: "type", // createdBy
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
          city: 1,
          organizationTypeName: "$creator.name",
          status: "$creator.status",
        },
      },
    ]);
    return res.send({
      success: true,
      message: "Get particular Organization Detail Successfully",
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

exports.sendInvitationToUser = async (req, res, next) => {
  try {
    let { organizationId, userId } = req.body;
    console.log(organizationId, userId);
    const organization = await Organization.findOne({ _id: organizationId });
    if (!organization) {
      return res.json({ status: "Organization Not Exists!!" });
    }
    const organizationName = organization?.name;
    console.log("organizationName", organizationName);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.json({ status: "User Not Exists!!" });
    }
    const email = user.email;
    let payload = req.body;
    console.log("playload", payload);
    const organizationJoinInvite = await OrganizationJoinInvite.create(payload);
    console.log("organizationJoinInvite", organizationJoinInvite);
    const link = `${process.env.BASE_URL}/v1/front/organizations/invitation-to-join-organization/${organizationId}/${userId}`; // change
    console.log("link", link);
    sendEmail(
      email,
      "invitation",
      { email: email, organizationName: organizationName, url: link },
      "Joining Organization Invitation"
    );
    return res.send({
      status: true,
      message: "Invitation to join Organization.",
    });
  } catch (error) {
    return next(error);
  }
};

exports.processOrganizationJoinRequest = async (req, res, next) => {
  try {
    console.log("req.params", req.body);
    let { organizationId, userId, status } = req.body;
    status = parseInt(status);
    console.log(organizationId, userId, status);
    const checkOrganizationRequest = await OrganizationJoinInvite.find({
      organizationId: organizationId,
      userId: userId,
    });
    console.log("checkOrganizationRequest", checkOrganizationRequest);
    if (!checkOrganizationRequest) {
      return res.json({ status: false, message: "Invalid request" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.json({ status: false, message: "Invalid request" });
    }
    console.log("user", user);
    const email = user.email;
    const userName = user.name;
    console.log(email, userName);
    checkOrganizationRequest.status = status;

    const organization = await Organization.findOne({
      _id: organizationId,
    });
    console.log("organization", organization);
    if (!organization) {
      return res.json({ status: false, message: "Invalid request" });
    }
    const organizationName = organization.name;
    console.log("organizationName", organizationName);

    // Those Users which have been approved by Organizations will shift to User Organization Schema
    let payload = {
      organizationId: organizationId,
      userId: userId,
    };
    console.log("payload", payload);
    if (status === 1) {
      var userOrganization = await UserOrganization.create(payload);
      await userOrganization.save();
      console.log("userOrganization", userOrganization);
    }

    sendEmail(
      email,
      status === 1 ? "approved" : "rejected",
      { email: email, userName: userName, organizationName: organizationName },
      "Updated Processing Request"
    );
    if (status === 1) {
      return res.send({
        status: true,
        message: "Thanks for joining organization.",
      });
    } else {
      return res.send({
        status: true,
        message: " Not Approved.",
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.takeRequestsToJoinOrganization = async (req, res, next) => {
  try {
    console.log("req.params", req.params);
    let { status } = req.params;
    console.log("status", status);
    status = parseInt(status);
    const takeUserRequests = await OrganizationJoinRequest.find({
      status: status,
    });
    console.log("takeUserRequests", takeUserRequests);
    return res.send({
      success: true,
      message: "Get all User Requests to join organization",
      takeUserRequests,
    });
  } catch (error) {
    return next(error);
  }
};

exports.processUserJoinRequest = async (req, res, next) => {
  try {
    let { status, id } = req.body;
    status = parseInt(status);
    console.log(status);
    console.log("request Id", id);
    const organizationJoinRequest = await OrganizationJoinRequest.findOne({
      _id: id,
    });
    if (!organizationJoinRequest) {
      return res.json({ status: false, message: "Invalid request" });
    }
    const organizationsId = organizationJoinRequest.organizationId;

    const organization = await Organization.findOne({
      _id: organizationsId,
    });
    console.log("organization", organization);
    if (!organization) {
      return res.json({ status: false, message: "Invalid request" });
    }

    const organizationName = organization?.name;
    console.log("organizationName", organizationName);
    console.log("organizationId", organizationsId);
    const userId = organizationJoinRequest.userId;
    console.log("userId", userId);

    // Those Users which have been approved by Organizations will shift to User Organization Schema
    let payload = {
      organizationId: organizationsId,
      userId: userId,
    };
    console.log("payload", payload);
    var userOrganization = await UserOrganization.create(payload);
    console.log("userOrganization", userOrganization);
    await userOrganization.save();
    //
    console.log("organizationJoinRequest", organizationJoinRequest);
    const usersId = organizationJoinRequest.userId;
    console.log("usersId", usersId);
    const user = await User.findOne({ _id: usersId });
    if (!user) {
      return res.json({ status: false, message: "Invalid request" });
    }
    const email = user.email;
    const userName = user.name;
    console.log(email, userName);
    const processUserRequest = await OrganizationJoinRequest.findByIdAndUpdate(
      id,
      { status: status },
      function (err, processUser) {
        if (err) {
          return res.json({ status: false, message: "Invalid request" });
        } else {
          console.log("Updated request : ", processUser);
        }
      }
    );
    console.log("processUserRequest", processUserRequest);
    sendEmail(
      email,
      "approvedUserRequest",
      { email: email, organizationName: organizationName },
      "Updated Processing Request"
    );

    return res.send({
      status: true,
      processUserRequest,
      message: "User Request to join organization accepted",
    });
  } catch (error) {
    return next(error);
  }
};
